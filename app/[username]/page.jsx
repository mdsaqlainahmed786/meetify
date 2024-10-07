import React from "react";
import { getUserUsername } from "../../actions/users";
import { notFound } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import EventCard from "../../components/EventCard";
export async function generateMetadata({ params }) {
  const user = await getUserUsername(params.username);
  if (!user) {
      return {
        title:"User not found"
      }
  }
  return{
    title:`${user.name}'s profile | Meetify`,
    description:`Book an event with ${user.name}. View available public events and schedule a call with ${user.name}`
  }
}
  const UserPage = async ({ params }) => {
    const user = await getUserUsername(params.username);
    console.log("username", params.username);
    if (!user) {
      notFound();
    }
    return (
      <div className="w-full mx-auto max-w-[80vw] flex flex-col pt-10">
        <div className="flex flex-col items-center mb-8">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src={user.imageUrl} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
          <p className="text-gray-600 text-center">
            Welcome to my scheduling page. Please select an event below to book
            a call with me
          </p>
        </div>
        {user.events.length === 0 ? (
          <p className="text-center text-gray-600">No public events</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {user.events.map((event) => {
              return (
                <EventCard
                  key={event.id}
                  event={event}
                  username={params.username}
                  isPublic
                />
              );
            })}
          </div>
        )}
      </div>
    );
  };

export default UserPage;
