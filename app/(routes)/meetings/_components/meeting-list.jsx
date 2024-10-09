import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import CancelMeetingBtn from "./cancel-meeting";
import { CiVideoOn } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { format } from "date-fns";
import { CiClock1 } from "react-icons/ci";
import { Button } from "../../../../components/ui/button";
const MeetingList = ({ meetings, type }) => {
  // console.log("meetings", meetings);
  if (meetings.length === 0) {
    return <p>You have no {type} meetings yet.</p>;
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {meetings.map((meet, index) => {
        return (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{meet.event.title}</CardTitle>
              <CardDescription>with {meet.name}</CardDescription>
              <CardDescription>
                &quot;{meet.event.description}&quot;
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                <CiCalendar className="mr-2 h-4 w-4" />
                <span>{format(new Date(meet.startTime), "MMMM d, yyyy")}</span>
              </div>
              <div className="flex items-center mb-2">
                <CiClock1 className="mr-2 h-4 w-4" />
                <span>
                  {format(new Date(meet.startTime), "h:mm a")} -{" "}
                  {format(new Date(meet.endTime), "h:mm a")}
                </span>
              </div>
              {meet.meetLink && (
                <div className="flex items-center">
                  <CiVideoOn className="mr-2 h-4 w-4" />
                  <a
                    href={meet.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-500 hover:underline"
                  >
                    Join Meeting
                  </a>
                </div>
              )}
            </CardContent>
            {type === "upcoming" && (
              <CardFooter className="flex justify-between">
                <CancelMeetingBtn meetingId={meet.id} />
              </CardFooter>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default MeetingList;
