import { getEventDetails } from "../../../actions/events";
import { notFound } from "next/navigation";
export async function generateMetadata({ params }) {
  const event = await getEventDetails(params.username, params.eventId);
  if (!event) {
      return {
        title:"Event not found"
      }
  }
  return{
    title:`Book ${event.title} with ${event.user.name} | Meetify`,
    description:`Schedule a ${event.duration}-minute ${event.title} event with ${event.user.name}.`
  }
}
  const EventPage = async ({ params }) => {
    const event = await getEventDetails(params.username, params.eventId);
    if (!event) {
      notFound();
    }
    return (
    <>
      <div className="flex flex-col justify-center lg:flex-row px-4 py-8">
          Event Page
        {/* <EventDetails/>
        <Suspense fallback={<div>Loading...</div>}>
        <BookingForm/>
        </Suspense> */}
      </div>
    </>
    );
  };

export default EventPage;
