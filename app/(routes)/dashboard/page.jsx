"use client";
import { useUser } from "@clerk/nextjs";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import useFetch from "../../../hooks/use-fetch";
import { Toaster } from "react-hot-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUsername } from "../../../actions/users";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { isLoader, user } = useUser();
  const userSchema = z.object({
    username: z
      .string()
      .min(3)
      .max(20)
      .regex(/^[a-zA-Z0-9_]+$/),
  });

  useEffect(() => {
    setValue("username", user?.username);
  }, [isLoader, user]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const { loading, error, fn: fnupdateUsername } = useFetch(updateUsername);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  if (!isLoaded) {
    return null;
  }

  const onSubmit = async (data) => {
    try {
      const result = await fnupdateUsername(data.username);

      toast.success("Username updated successfully", {
        style: {
          border: "1px solid black",
          padding: "16px",
          color: "black",
          marginTop: "75px",
        },
        iconTheme: {
          primary: "purple",
          secondary: "white",
        },
      });
    } catch (err) {
      toast.error(err.message || "Failed to update username", {
        style: {
          border: "1px solid black",
          padding: "16px",
          color: "red",
          marginTop: "75px",
        },
        iconTheme: {
          primary: "red",
          secondary: "white",
        },
      });
    }
  };

  return (
    <div className="w-full space-y-5 lg:w-[80%] lg:p-5">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400 text-center pt-5 lg:text-6xl lg:text-left">
        Dashboard
      </h1>
      <Card className="bg-[#1F1F1F] border-2 border-purple-600 mx-4 lg:mx-0">
        <CardHeader>
          <CardTitle className="text-white">Welcome, {user?.firstName}!</CardTitle>
        </CardHeader>
        {/* user meetings */}
      </Card>
      <Card className="bg-[#1F1F1F] border-2 text-white border-purple-600 mx-4 lg:mx-0">
        <CardHeader>
          <CardTitle>Your Unique Link</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className={`flex flex-col space-y-8 ${
                errors.username ? "space-y-2" : ""
              }`}
            >
              <div className="flex justify-center items-center gap-2">
                <span>
                  {typeof window !== "undefined" ? window.location.origin : ""}
                </span>
                <Input {...register("username")} placeholder="username" />
              </div>
              {errors.username && (
                <span className="text-red-500 text-sm">
                  {errors.username?.message}
                </span>
              )}
              {error && (
                <span className="text-red-500 text-sm">{error?.message}</span>
              )}
              {loading && (
                <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
              )}
              <Button
                className="flex justify-start w-[9rem] items-center bg-purple-600 hover:bg-purple-800"
                type="submit"
                disabled={loading}
              >
                Update username
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
