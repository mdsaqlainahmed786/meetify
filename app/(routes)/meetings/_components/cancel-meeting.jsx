"use client";

import React from "react";
import { Button } from "../../../../components/ui/button";
import { cancelMeeting } from "../../../../actions/meetings";
import useFetch from "../../../../hooks/use-fetch";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const CancelMeetingBtn = ({ meetingId }) => {
  const router = useRouter();
  const { loading, data, fn: fnCancelMeeting } = useFetch(cancelMeeting);
  const handleCancelMeeting = async () => {
    await fnCancelMeeting(meetingId);
    router.push("/meetings");
    toast.success("Meeting was canceled", {
      style: {
        border: "1px solid black",
        padding: "16px",
        backgroundColor: "#1F1F1F",
        color: "white",
        marginTop: "75px",
      },
      iconTheme: {
        primary: "purple",
        secondary: "white",
      },
    });
  };
  return (
    <>
      <Button
        onClick={handleCancelMeeting}
        disabled={loading}
        className="border-2 border-purple-600 "
      >
        {loading ? "Cancelling..." : "Cancel Meeting"}
      </Button>
    </>
  );
};

export default CancelMeetingBtn;
