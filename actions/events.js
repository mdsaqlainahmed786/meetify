"use server";
import { eventSchema } from "../lib/userValidator";
import { db } from "../lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  startOfDay,
  addDays,
  format,
  parseISO,
  isBefore,
  addMinutes,
} from "date-fns";
export async function createEvent(data) {
  const { userId } = auth();
  if (!userId) throw new Error("User not found");

  const validatedSchema = eventSchema.parse(data);
  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  //console.log("BullShit.....", validatedSchema);
  if (!user) throw new Error("User not found");
  const event = await db.event.create({
    data: {
      ...validatedSchema,
      userId: user.id,
    },
  });
  // console.log("event", event);
  return event;
}

export async function getUserEvents() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const events = await db.event.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { bookings: true },
      },
    },
  });
  return { events, username: user.username };
}

export async function deleteEvent(eventId) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const event = await db.event.findUnique({
    where: { id: eventId },
  });

  if (!event || event.userId !== user.id) {
    throw new Error("Event not found or unauthorized");
  }

  await db.event.delete({
    where: { id: eventId },
  });

  return { success: true };
}

export async function getEventDetails(username, eventId) {
  const event = await db.event.findFirst({
    where: {
      id: eventId,
      user: {
        username,
      },
    },
    include: {
      user: {
        select: {
          name: true,
          username: true,
          name: true,
          imageUrl: true,
        },
      },
    },
  });
  return event;
}

export async function getEventAvailability(eventId) {
  const event = await db.event.findUnique({
    where: { id: eventId },
    include: {
      user: {
        include: {
          availability: {
            select: {
              days: true,
              timeGap: true,
            },
          },
          bookings: {
            select: {
              startTime: true,
              endTime: true,
            },
          },
        },
      },
    },
  });
  // console.log("Event:", event);
  // console.log("User availability:", event?.user?.availability);
  if (!event || !event.user.availability) {
    return [];
  }

  const { availability, bookings } = event.user;
  const startDate = startOfDay(new Date());
  const endDate = addDays(startDate, 30); // Get availability for the next 30 days

  const availableDates = [];

  for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
    // console.log("Current date:", date);
    const dayOfWeek = format(date, "EEEE").toUpperCase();
    // console.log("Day of week:", dayOfWeek);
    const dayAvailability = availability?.days?.find(
      (d) => d.day === dayOfWeek,
    );
    //  console.log("Day of availability:", dayAvailability);
    if (dayAvailability) {
      const dateStr = format(date, "yyyy-MM-dd");
      //  console.log("Date string:", dateStr);
      const slots = generateAvailableTimeSlots(
        dayAvailability.startTime,
        dayAvailability.endTime,
        event.duration,
        bookings,
        dateStr,
        availability.timeGap,
      );
      const startTimes = slots.filter((_, index) => index % 2 === 0);
      availableDates.push({
        date: dateStr,
        slots,
        startTimes,
      });
    }
  }

  return availableDates;
}

function generateAvailableTimeSlots(
  startTime,
  endTime,
  duration,
  bookings,
  dateStr,
  timeGap = 0,
) {
  const slots = [];
  let currentTime = parseISO(
    `${dateStr}T${startTime.toISOString().slice(11, 16)}`,
  );
  const slotEndTime = parseISO(
    `${dateStr}T${endTime.toISOString().slice(11, 16)}`,
  );

  // If the date is today, start from the next available slot after the current time
  const now = new Date();
  if (format(now, "yyyy-MM-dd") === dateStr) {
    currentTime = isBefore(currentTime, now)
      ? addMinutes(now, timeGap)
      : currentTime;
  }

  while (currentTime < slotEndTime) {
    const slotEnd = new Date(currentTime.getTime() + duration * 60000);

    const isSlotAvailable = !bookings.some((booking) => {
      const bookingStart = booking.startTime;
      const bookingEnd = booking.endTime;
      return (
        (currentTime >= bookingStart && currentTime < bookingEnd) ||
        (slotEnd > bookingStart && slotEnd <= bookingEnd) ||
        (currentTime <= bookingStart && slotEnd >= bookingEnd)
      );
    });

    if (isSlotAvailable) {
      slots.push(format(currentTime, "HH:mm"));
    }

    currentTime = slotEnd;
    // console.log("Current time:", currentTime);
    // console.log("Slot end time:", slotEndTime);
    // console.log("Is slot available:", isSlotAvailable);
  }

  return slots;
}
