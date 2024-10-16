"use server";
import { db } from "../lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { google } from "googleapis";
import { Ratelimit } from "@unkey/ratelimit";
const limiter = new Ratelimit({
  namespace: "createBooking",
  limit: 3,
  duration: "24h",
  rootKey: process.env.UNKEY_ROOT_KEY,
});
export async function createBooking(bookingData) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  console.log("User ID for rate limiting:", user.clerkUserId);
  const ratelimit = await limiter.limit(user.clerkUserId);

  if (!ratelimit.success) {
    console.log("Rate limit exceeded");
    return { success: false, message: "Rate limit exceeded" };
  }
  try {
    const event = await db.event.findUnique({
      where: {
        id: bookingData.eventId,
      },
      include: {
        user: true,
      },
    });
    if (!event) {
      throw new Error("Event not found");
    }

    const { data } = await clerkClient.users.getUserOauthAccessToken(
      event.user.clerkUserId,
      "oauth_google",
    );
    const token = data[0]?.token;
    if (!token) {
      throw new Error("User has not connected their Google account");
    }
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: token });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const meetLinkResponse = await calendar.events.insert({
      calendarId: "primary",
      conferenceDataVersion: 1,
      requestBody: {
        summary: `${bookingData.name} - ${event.title}`,
        description: bookingData.description,
        start: {
          dateTime: bookingData.startTime,
        },
        end: {
          dateTime: bookingData.endTime,
        },
        attendees: [{ email: bookingData.email }, { email: event.user.email }],
        conferenceData: {
          createRequest: { requestId: `${event.id}-${Date.now()}` },
        },
      },
    });
    const meetLink = meetLinkResponse.data.hangoutLink;
    const googleEventId = meetLinkResponse.data.id;

    const booking = await db.booking.create({
      data: {
        eventId: event.id,
        userId: event.userId,
        name: bookingData.name,
        email: bookingData.email,
        startTime: bookingData.startTime,
        endTime: bookingData.endTime,
        additionalInfo: bookingData.additionalInfo,
        meetLink,
        googleEventId,
      },
    });

    return { success: true, booking, meetLink };
  } catch (err) {
    console.log(err);
    return { success: false, error: err.message };
  }
}
