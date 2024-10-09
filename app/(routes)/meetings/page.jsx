import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { getUserMeetings } from "../../../actions/meetings";
import MeetingsList from "./_components/meeting-list";
import { Suspense } from "react";

export default function Meetings() {
  return (
    <div className="w-full space-y-5 lg:w-[80%] lg:p-5">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400 text-center pt-5 lg:text-6xl lg:text-left">
        Meetings
      </h1>
      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <Suspense fallback={<div>Loading Upcoming meetings.......</div>}>
            <UpcomingMeetings />
          </Suspense>
        </TabsContent>
        <TabsContent value="past">
          <Suspense fallback={<div>Loading Past meetings.......</div>}>
            <PastMeetings />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}

async function UpcomingMeetings() {
  const meetings = await getUserMeetings("upcoming");
  return <MeetingsList meetings={meetings} type={"upcoming"} />;
}
async function PastMeetings() {
  const meetings = await getUserMeetings("past");
  return <MeetingsList meetings={meetings} type={"past"} />;
}
