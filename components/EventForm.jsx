"use client"
import { Input } from "../components/ui/input";
import React from "react";
import { Controller, set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "../lib/userValidator";
import { Button } from "../components/ui/button";
import { useRouter,  } from "next/navigation";
import useFetch from "../hooks/use-fetch";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { createEvent } from "../actions/events";

const EventForm = ({onSubmitForm, setIsOpen}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      duration: 30,
      isPrivate: true,
    },
  });
  const { loading, error, fn: fnupdateUsername } = useFetch(createEvent);
  try{

  }catch(err){
    console.log(err)
  }
  const onSubmit = async (data) => {
    await fnupdateUsername(data)
    toast.success("Event created successfully", {
      style: {
        border: "1px solid black",
        padding: "16px",
        color: "black",
        marginTop: "75px",
      },
      iconTheme: {
        primary: "blue",
        secondary: "white",
      },
    });
    if (!loading && !error) onSubmitForm();
    router.push('/events');
       
    // router.refresh(); // Refresh the page to show updated data
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            {...register("duration", {
             valueAsNumber: true,
          })}
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
      {error && <span className="text-red-500 text-sm">{error?.message}</span>}
      <Button disabled={loading} className="w-full mt-7 -mb-4" type="submit">
        {loading ? "Creating Event..." : "Create Event"}
      </Button>
    </form>
  );
};

export default EventForm;
