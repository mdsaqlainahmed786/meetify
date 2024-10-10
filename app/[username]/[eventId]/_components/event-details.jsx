import { Calendar, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";

export default function EventDetails({ event }) {
  const { user } = event;
  console.log("username", user.name);
  return (
    <div className="p-10 mt-3 lg:w-1/3 bg-[#1F1F1F] text-white border-2 border-purple-600 rounded-md">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <div className="flex items-center mb-4">
        <Avatar className="w-12 h-12 mr-4">
          <AvatarImage src={user.imageUrl} alt={user.name.replace(/null/g, "")} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>

        </div>
      </div>
      <div className="flex items-center mb-2">
        <Clock className="mr-2" />
        <span>{event.duration} minutes</span>
      </div>
      <div className="flex items-center mb-4">
        <Calendar className="mr-2" />
        <span>Google Meet</span>
      </div>
      <p className="text-gray-300">&quot;{event.description}&quot;</p>
    </div>
  );
}