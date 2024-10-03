"use client";
import { useUser } from "@clerk/nextjs";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
export default function Dashboard() {
  const { isLoader, user } = useUser();
  const userSchema = z.object({
    username: z
      .string()
      .min(3)
      .max(20)
      .regex(/^[a-zA-Z0-9_]+$/),
  });
  useEffect(()=>{
    setValue("username", user?.username)
  },[isLoader, user])
  const { register, handleSubmit, setValue, formState:{errors}} = useForm({
    resolver: zodResolver(userSchema),
  });
  const onSubmit = async (data) => {};
  return (
    <div className="w-full space-y-5 lg:w-[80%] lg:p-5">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 text-center pt-5 lg:text-6xl lg:text-left">
        Dashboard
      </h1>
      <Card className="mx-4 lg:mx-0">
        <CardHeader>
          <CardTitle>Welcome, {user?.firstName}!</CardTitle>
        </CardHeader>
        {/* user meetings */}
      </Card>
      <Card className="mx-4 lg:mx-0">
        <CardHeader>
          <CardTitle>Your Unique Link</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`flex flex-col space-y-8 ${errors.username?"space-y-2":""}`}>
              <div className="flex justify-center items-center gap-2">
                <span>{window?.location.origin}</span>
                <Input {...register("username")} placeholder="username" />
              </div>
              {errors.username && (<span className="text-red-500 text-sm">
                {errors.username?.message}</span>)}
              <Button className="flex justify-start w-[9rem] items-center" type="submit">Update username</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
