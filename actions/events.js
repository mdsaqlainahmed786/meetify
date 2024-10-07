"use server";
import { eventSchema } from "../lib/userValidator";
import { db } from "../lib/prisma";
import { auth } from "@clerk/nextjs/server";
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
  return {events, username: user.username};
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

export async function getEventDetails(username,eventId) {
  const event = await db.event.findFirst({
    where: {
      id: eventId,
      user: {
        username,
      },
    },
    include:{
      user:{
        select:{
          username:true,
          name:true,
          imageUrl:true
        }
      }
    }
  })
  return event
}