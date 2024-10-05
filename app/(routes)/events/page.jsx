import { Suspense } from "react";
import { getUserEvents } from "../../../actions/events";
import EventCard from "../../../components/EventCard";
export default function EventsPage(){
  return(
    <Suspense fallback={<div>Loading...</div>}>
      <Events />
    </Suspense>
  )
}

async function Events () {
   const {events, username} = await getUserEvents()
   if(events.length === 0){
      return <p>You have&apos;t created any events yet.</p>
    }
  //  console.log("events",events, "username", username)
  return (
    <div className="w-full space-y-5 lg:w-[80%] lg:p-5">
    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 text-center pt-5 lg:text-6xl lg:text-left">
      Events
      </h1>
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
    {events.map((event) => (
      <EventCard key={event.id} event={event} username={username} />
    ))}
      </div>
    </div>
  );
}
