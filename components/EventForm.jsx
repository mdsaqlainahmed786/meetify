import { Input } from "../components/ui/input";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "../lib/userValidator";
import { Button } from "../components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const EventForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      duration: 30,
      isPrivate: false,
    },
  });
  return (
    <form>
      <div className="flex flex-col pt-5 space-y-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-start text-gray-700"
        >
          Event Title
          <Input id="title" {...register("title")} className="mt-1" />
        </label>
        {errors.title && (
          <span className="text-red-500 text-sm">{errors?.title.message}</span>
        )}
        <label
          htmlFor="description"
          className="block text-sm font-medium text-start text-gray-700"
        >
          Description
          <Input
            id="description"
            {...register("description")}
            className="mt-1"
          />
        </label>
        {errors.description && (
          <span className="text-red-500 text-sm">
            {errors?.description.message}
          </span>
        )}
        <label
          htmlFor="duration"
          className="block text-sm font-medium text-start text-gray-700"
        >
          Duration(minutes)
          <Input
            type="number"
            id="duration"
            {...register("duration")}
            className="mt-1"
          />
        </label>
        {errors.duration && (
          <span className="text-red-500 text-sm">
            {errors?.duration.message}
          </span>
        )}
        <label
          htmlFor="isPrivate"
          className="block text-sm font-medium text-start text-gray-700"
        >
          Event Privacy
        </label>
        <Controller
          name="isPrivate"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value ? "true" : "false"}
              onValueChange={(value) => field.onChange(value === "true")}
              className="mt-1"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Privacy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Private</SelectItem>
                <SelectItem value="false">Public</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.isPrivate && (
          <span className="text-red-500 text-sm">
            {errors?.isPrivate.message}
          </span>
        )}
      </div>
        <Button className="w-full mt-7 -mb-4" type="submit">Submit</Button>
    </form>
  );
};

export default EventForm;
