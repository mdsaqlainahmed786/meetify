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
import Image from "next/image";
import NotFound from "../../../assests/notfound.png";

const MeetingList = ({ meetings, type }) => {
  if (meetings.length === 0) {
    return (
      <div className="flex justify-center items-center w-full">
        <p className="text-white">You have no {type} meetings yet.</p>
      </div>
    );
  }
  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-[90vw]">
      {meetings.map((meet, index) => {
        return (
          <Card
            className="bg-[#1F1F1F] border-2 w-[18rem] border-purple-600 flex flex-col justify-between"
            key={index}
          >
            <div className="flex-grow">
              <CardHeader className="text-white">
                <CardTitle className="text-3xl">{meet.event.title}</CardTitle>
                <CardDescription>with {meet.name}</CardDescription>
                <CardDescription className="text-white">
                  &quot;{meet.event.description}&quot;
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-2 text-white">
                  <CiCalendar className="mr-2 h-4 w-4 text-white" />
                  <span>{format(new Date(meet.startTime), "MMMM d, yyyy")}</span>
                </div>
                <div className="flex items-center mb-2 text-white">
                  <CiClock1 className="mr-2 h-4 w-4 text-white" />
                  <span>
                    {format(new Date(meet.startTime), "h:mm a")} -{" "}
                    {format(new Date(meet.endTime), "h:mm a")}
                  </span>
                </div>
                {meet.meetLink && (
                  <div className="flex items-center">
                    <CiVideoOn className="mr-2 h-4 w-4 text-white" />
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
            </div>
            {type === "upcoming" && (
              <CardFooter className="flex justify-between mt-auto">
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
