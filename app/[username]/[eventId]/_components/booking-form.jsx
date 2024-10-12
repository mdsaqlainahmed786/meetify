"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { bookingSchema } from "../../../../lib/userValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { createBooking } from "../../../../actions/bookings";
import { Textarea } from "../../../../components/ui/textarea";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import useFetch from "../../../../hooks/use-fetch";
const BookingForm = ({ event, availability }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [message, setMessage] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { error },
    setValue,
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });
  useEffect(() => {
    if (selectedDate) {
      setValue("date", format(selectedDate, "yyyy-MM-dd"));
    }
  }, [selectedDate]);
  useEffect(() => {
    if (selectedTime) {
      setValue("time", selectedTime);
    }
  }, [selectedTime]);
  const { loading, data, fn: fnCreateBooking } = useFetch(createBooking);

  const onSubmit = async (data) => {
    try {
      if (!selectedDate || !selectedTime) {
        console.error("Please select a date and time");
        return;
      }
      const startTime = new Date(
        `${format(selectedDate, "yyyy-MM-dd")}T${selectedTime}`
      );
      const endTime = new Date(startTime.getTime() + event.duration * 60000);
      //console.log("EVENT ID", event.id);
      const bookingData = {
        eventId: event.id,
        name: data.name,
        email: data.email,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        additonalInfo: data.additionalInfo,
      };

      const response = await fnCreateBooking(bookingData);
      console.log("response", response);
      if (response.success) {
        setMessage("Booking successful!");
      } else {
        setMessage("Booking failed");
      }
    } catch (e) {
      console.log("Error", e);
    }
    // console.log("form data submitted:", data);
    // await fetchAvailability(data);
  };
  const availableDays = availability.map((day) => new Date(day.date));
  // console.log("availability days", availability);
  const timeSlots = selectedDate
    ? availability.find(
        (day) => day.date === format(selectedDate, "yyyy-MM-dd")
      )?.slots || []
    : [];
  if (data) {
    return (
      <div className="text-center p-10 bg-[#1F1F1F] text-white border-2 border-purple-600">
        <h2 className="text-2xl font-bold mb-4">{data.meetLink ? "Booking Successful":"Booking Unsuccessful"}</h2>
        {data.meetLink ? (
          <p>
            Join the meeting:{" "}
            <a
              href={data.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-500 hover:underline"
            >
              {data.meetLink}
            </a>
          </p>
        ) : (
          <p>
            Oops!, something went wrong or may be you exceeded the Bookings
            limit only 3 per day{" "}
          </p>
        )}
      </div>
    );
  }

  //console.log("timeSlots", timeSlots);
  return (
    <div className="border-2 border-purple-600 bg-[#1F1F1F] rounded-md text-white px-5">
      <div className="flex flex-col space-x-0 md:flex-row md:space-x-6">
        <div className="flex justify-center py-8">
          <DayPicker
            mode="single"
            className=""
            selected={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date);
              setSelectedTime(null);
            }}
            disabled={[{ before: new Date() }]}
            modifiers={{
              avaialble: availableDays,
            }}
            modifiersStyles={{
              avaialble: {
                backgroundColor: "purple",
                borderRadius: 100,
              },
            }}
          />
        </div>
        <div className="w-full h-full py-10">
          {selectedDate && (
            <div className="mb-4 ">
              <h3 className="text-lg text-center pb-3 font-semibold mb-2">
                Available Time slots
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {timeSlots.length === 0 ? (
                  <p className="flex justify-center text-center">
                    No available slots
                  </p>
                ) : (
                  timeSlots.map((slot) => {
                    return (
                      <Button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`${
                          selectedTime === slot
                            ? "bg-purple-600 hover:bg-purple-600"
                            : "border-2 border-purple-600 hover:bg-purple-800"
                        }`}
                        variant={selectedTime === slot ? "default" : ""}
                      >
                        {slot}
                      </Button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {selectedTime && (
        <form className="space-y-4 pb-5" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-lg text-center pb-3 font-semibold ">
            Enter Details of meeting
          </h3>
          {/* <div className="pb-10"> */}
          <div className="">
            <Input {...register("name")} placeholder=" your Name" />
            {error?.name && (
              <p className="text-red-500 text-sm">{error.name.message}</p>
            )}
          </div>
          <div>
            <Input {...register("email")} placeholder=" your Email" />
            {error?.email && (
              <p className="text-red-500 text-sm">{error.email.message}</p>
            )}
          </div>
          <div>
            <Textarea
              {...register("additionalInfo")}
              placeholder="Additional Information"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-800"
          >
            {loading ? "Scheduling..." : "Schedule Event"}
          </Button>
          {/* </div> */}
        </form>
      )}
    </div>
  );
};

export default BookingForm;
