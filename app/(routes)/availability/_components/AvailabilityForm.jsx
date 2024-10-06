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
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";

const AvailabilityForm = ({ initialData }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(availabilitySchema),
    defaultValues: { ...initialData },
  });
  return (
    <form>
      {[
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ].map((day) => {
        const isAvailable = watch(`${day}.isAvailable`);
        return (
          <div key={day} className="flex items-center space-x-4 mb-4">
            <Controller
              name={`${day}.isAvailable`}
              control={control}
              render={({ field }) => {
                return (
                  <Checkbox
                    checked={field.value}
                    onCheckChange={(checked) => {
                      setValue(`${day}.isAvailable`, checked);
                      if (!checked) {
                        setValue(`${day}.startTime`, "09:00");
                        setValue(`${day}.endTime`, "17:00");
                      }
                    }}
                    onCheckedChange={(checked) => {
                      setValue(`${day}.isAvailable`, checked);
                      if (!checked) {
                        setValue(`${day}.startTime`, "09:00");
                        setValue(`${day}.endTime`, "17:00");
                      }
                    }}
                  />
                );
              }}
            />
            <span className="w-24">{day.charAt(0) + day.slice(1)}</span>
            {isAvailable && (
              <>
                <Controller
                  name={`${day}.startTime`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Start Time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => {
                            return (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    );
                  }}
                />
                <span>to</span>
                <Controller
                  name={`${day}.endTime`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="End Time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => {
                            return (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    );
                  }}
                />
                {errors[day]?.endTime && (
                  <span className="text-red-500 text-sm ml-2">
                    {errors[day].endTime.message}
                  </span>
                )}
              </>
            )}
          </div>
        );
      })}
      <div className="space-y-4">
        <span className="flex items-center space-x-4">
          Minimum gap before booking (minutes):
        </span>

        <Input
          type="number"
          {...register("timeGap", {
            valueAsNumber: true,
          })}
          className="w-32"
        />
        {errors?.timeGap && (
          <span className="text-red-500 text-sm ml-2">
            {errors[day].endTime.message}
          </span>
        )}
      <Button type="submit">Update Availability</Button>
      </div>
    </form>
  );
};

export default AvailabilityForm;
