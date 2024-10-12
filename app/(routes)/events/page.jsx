import { Suspense } from "react";
import { getUserEvents } from "../../../actions/events";
import EventCard from "../../../components/EventCard";
export default function EventsPage() {
  return (
    <>
      <div className="w-full space-y-5 lg:w-[80%] lg:p-5">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400 text-center pt-5 lg:text-6xl lg:text-left">
          Events
        </h1>
        <Suspense
          fallback={
            <div className="text-white text-center lg:text-start">
              Loading Events...
            </div>
          }
        >
          <Events />
        </Suspense>
      </div>
    </>
  );
}

async function Events() {
  const { events, username } = await getUserEvents();
  // if (events.length === 0) {
  //   return <p>You have not created any events yet.</p>;
  // }
  //  console.log("events",events, "username", username)
  return (
    <>
      {events.length === 0 && (
        <p className="text-white text-start">
          You have not created any events yet.
        </p>
      )}
      {/* <p>You have not created any events yet.</p> */}
      <div className="pb-11 grid gap-8 grid-cols-1 lg:grid-cols-2 mx-auto max-w-[90vw]">
        {events.map((event) => (
          <EventCard key={event.id} event={event} username={username} />
        ))}
      </div>
    </>
  );
}
