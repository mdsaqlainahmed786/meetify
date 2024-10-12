"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { availabilitySchema } from "../../../../lib/userValidator";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { timeSlots } from "../data";
import { updateAvailability } from "../../../../actions/availability";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import useFetch from "../../../../hooks/use-fetch";
import { toast } from "react-hot-toast";

function AvailabilityForm({ initialData }) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(availabilitySchema),
    defaultValues: { ...initialData },
  });

  const {
    loading,
    error,
    fn: fnupdateAvailability,
  } = useFetch(updateAvailability);

  const onSubmit = async (data) => {
    try {
      await fnupdateAvailability(data);
      toast.success("Availability updated successfully", {
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
    } catch (err) {
      toast.error("Failed to update availability.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {[
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ].map((day) => {
        const isAvailable = watch(`${day}.isAvailable`);

        return (
          <>
            <div
              key={day}
              className={`flex justify-start items-center mx-auto max-w-[80vw] text-white space-x-4 mb-4 md:max-w-[55vw] lg:max-w-[100vw] ${
                errors[day]?.endTime ? "" : ""
              }`}
            >
              <Controller
                name={`${day}.isAvailable`}
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      setValue(`${day}.isAvailable`, checked);
                      if (!checked) {
                        setValue(`${day}.startTime`, "09:00");
                        setValue(`${day}.endTime`, "17:00");
                      }
                    }}
                  />
                )}
              />
              <span className="w-24">
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </span>
              {isAvailable && (
                <>
                  <Controller
                    name={`${day}.startTime`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        className=""
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Start Time" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1F1F1F] text-white">
                          {timeSlots.map((time) => (
                            <SelectItem className="" key={time} value={time}>
                              <p className="">{time}</p>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <span>to</span>

                  <Controller
                    name={`${day}.endTime`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="End Time" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1F1F1F] text-white">
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </>
              )}
            </div>
            {errors[day]?.endTime && (
              <div className="flex justify-center lg:justify-start">
                <span className="text-red-500 text-center text-sm ml-2">
                  {errors[day].endTime.message}
                </span>
              </div>
            )}
          </>
        );
      })}
      <div className="flex flex-col justify-start items-center w-full lg:max-w-[100vw] lg:items-start">
        <div className="flex items-center justify-start max-w-[80vw] space-x-4 md:max-w-[55vw] lg:max-w-[100vw]">
          <span className="w-48 text-white">
            Minimum gap before booking (minutes):
          </span>

          <Input
            type="number"
            {...register("timeGap", {
              valueAsNumber: true,
            })}
            className="w-32 text-white"
          />
        </div>

        {/* Add this div to ensure consistent space for the error message */}
        <div className="h-5 flex justify-center lg:justify-start">
          {errors.timeGap && (
            <span className="text-red-500 text-sm">
              {`${errors.timeGap.message} this is time gape`}
            </span>
          )}
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm">{`${error?.message}`}</div>
      )}
      <div className="flex justify-center items-center lg:justify-start lg:max-w-[100vw]">
        <Button
          className="bg-purple-600 hover:bg-purple-800"
          type="submit"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Availability"}
        </Button>
      </div>
    </form>
  );
}

export default AvailabilityForm;
