"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import useFetch from "../hooks/use-fetch";
import { deleteEvent } from "../actions/events";
import { MdOutlineDelete } from "react-icons/md";
import { GoLink } from "react-icons/go";
import { Button } from "../components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const EventCard = ({ event, username, isPublic = false }) => {
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();
  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/${username}/${event.id}`,
      );
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };
  const { loading, error, fn: fnDeleteEvent } = useFetch(deleteEvent);
  const onDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this event?")) {
      await fnDeleteEvent(event.id);
    }
    if (!loading && !error) router.push("/events");
  };
  const handleCardClick = (e) => {
    if (e.target.tagName !== "BUTTON" || e.target.tagName !== "SVG") {
      window?.open(
        `${window?.location.origin}/${username}/${event.id}`,
        "_blank",
      );
    }
  };
  return (
    <Card
      onClick={handleCardClick}
      className="cursor-pointer bg-[#1F1F1F] border-2 border-purple-600"
    >
      <CardHeader>
        <CardTitle className="text-white">{event.title}</CardTitle>
        <CardDescription className="">
          {event.duration} mins | {event.isPrivate ? "private" : "Public"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <span className="text-white">{event.description}</span>
          <span className="text-sm text-neutral-300">
            {event._count.bookings} Bookings
          </span>
        </div>
      </CardContent>
      {!isPublic && (
        <CardFooter className="flex gap-2">
          {/* <Link href="/"> */}
          <Button
            onClick={handleCopy}
            className="border-2 bg-purple-600 hover:bg-purple-800 border-purple-600 "
          >
            <GoLink className="text-lg mr-2" />
            <span>{isCopied ? "Copied!" : "Copy Link"}</span>
          </Button>
          {/* </Link> */}
          {/* <Link href="/"> */}
          <Button
            className="border-2 border-purple-600"
            onClick={onDelete}
            disabled={loading}
          >
            <MdOutlineDelete className="text-lg mr-2" />
            <span>{loading ? "Deleting" : "Delete"}</span>
          </Button>
          {/* </Link> */}
        </CardFooter>
      )}
    </Card>
  );
};

export default EventCard;
