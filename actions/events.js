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
  console.log("BullShit.....", validatedSchema);
  if (!user) throw new Error("User not found");
  const event = await db.event.create({
    data: {
      ...validatedSchema,
      userId: user.id,
    },
  });
  console.log("event", event);
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
