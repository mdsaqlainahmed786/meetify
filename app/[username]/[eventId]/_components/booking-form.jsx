"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { bookingSchema } from "../../../../lib/userValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
const BookingForm = ({ event, availability }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { error },
    setValue,
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });
  const onSubmit = async (data) => {
    console.log(data);
  };
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
  const availableDays = availability.map((day) => new Date(day.date));
  console.log("availability days", availability);
  const timeSlots = selectedDate
    ? availability.find(
        (day) => day.date === format(selectedDate, "yyyy-MM-dd")
      )?.slots || []
    : [];
  console.log("timeSlots", timeSlots);
  return (
    <div className="bg-white px-5">
      <div className="flex flex-col space-x-0 md:flex-row md:space-x-6">
        <div className="py-8">
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
                backgroundColor: "lightblue",
                borderRadius: 100,
              },
            }}
          />
        </div>
        <div className="w-full h-full py-10 md:overflow-scroll no-scrollbar">
          {selectedDate && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">
                Available Time slots
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {timeSlots.length === 0
                  ? ""
                  : timeSlots.map((slot) => {
                      return (
                        <Button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          variant={
                            selectedTime === slot ? "default" : "outline"
                          }
                        >
                          {slot}
                        </Button>
                      );
                    })}
              </div>
            </div>
          )}
        </div>
      </div>
      {selectedTime && (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
          <Button>Schedule Event</Button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
