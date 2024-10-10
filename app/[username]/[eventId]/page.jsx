// app/[username]/[eventId]/page.jsx
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getEventDetails } from "../../../actions/events";
import { getEventAvailability } from "../../../actions/events";
import EventDetails from "./_components/event-details";
import BookingForm from "./_components/booking-form";

export async function generateMetadata({ params }) {
  const event = await getEventDetails(params.username, params.eventId);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: `Book ${event.title} with ${event.user.name} | Meetify`,
    description: `Schedule a ${event.duration}-minute ${event.title} event with ${event.user.name}.`,
  };
}

export default async function EventBookingPage({ params }) {
  const event = await getEventDetails(params.username, params.eventId);
  const availability = await getEventAvailability(params.eventId);
//   console.log("username:", params.username);
//     console.log("eventId:", params.eventId);
//     console.log("event", event);
//   console.log("availability", availability);
  if (!event) {
    notFound();
  }

  return (
    <div className="flex flex-col space-y-3 mx-auto w-full max-w-[90vw] justify-center lg:flex-row px-4 py-8 lg:space-y-3">
      <EventDetails event={event} />
      <Suspense fallback={<div>Loading booking form...</div>}>
        <BookingForm event={event} availability={availability} />
      </Suspense>
    </div>
  );
}