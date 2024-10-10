"use client"

import React from "react";
import { Button } from "../../../../components/ui/button";
import { cancelMeeting } from "../../../../actions/meetings";
import  useFetch  from "../../../../hooks/use-fetch";
const CancelMeetingBtn = ({ meetingId }) => {
  const { loading, data, fn: fnCancelMeeting } = useFetch(cancelMeeting);
  const handleCancelMeeting = async () => {
    await fnCancelMeeting(meetingId);
  };
  return (
    <>
      <Button onClick={handleCancelMeeting} className="border-2 border-purple-600 ">
       {loading ? "Cancelling..." : "Cancel Meeting"}
      </Button>
    </>
  );
};

export default CancelMeetingBtn;
