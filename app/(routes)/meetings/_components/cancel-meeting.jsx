"use client";

import React from "react";
import { Button } from "../../../../components/ui/button";
import { cancelMeeting } from "../../../../actions/meetings";
import useFetch from "../../../../hooks/use-fetch";
import { useRouter } from "next/navigation";
const CancelMeetingBtn = ({ meetingId }) => {
  const router = useRouter();
  const { loading, data, fn: fnCancelMeeting } = useFetch(cancelMeeting);
  const handleCancelMeeting = async () => {
    await fnCancelMeeting(meetingId);
    router.push("/meetings");
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
