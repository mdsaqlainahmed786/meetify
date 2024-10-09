"use client";
import { Button } from "../components/ui/button";
import Poster from ".././app/assests/poster.webp";
import { Testimonials } from "../components/Testimonials";
import { FaArrowRight } from "react-icons/fa6";
import { GoClock } from "react-icons/go";
import { IoIosLink } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Customize animation duration (optional)
      once: false, // Animation only occurs once
    });
  }, []);
  const howItWorks = [
    {
      step: "Sign Up",
      description: "Create your free meetify account using secured google auth",
    },
    {
      step: "Set Availability",
      description: "Define when you're available for meetings",
    },
    {
      step: "Share Your Link",
      description: "Send your scheduling link to clients or colleagues",
    },
    {
      step: "Get Booked",
      description: "Receive confirmations for new appointments automatically",
    },
  ];
  const Features = [
    {
      icon: <CiCalendar />,
      title: "Create Events",
      description: "Easily set up and customize your event types",
    },
    {
      icon: <GoClock />,
      title: "Schedule Events",
      description: "Set up your meetings to streamline scheduling",
    },
    {
      icon: <IoIosLink />,
      title: "Custom Links",
      description: "Share your personalized scheduling link",
    },
  ];
  return (
    <div className="pb-16">
      {/* Hero Section */}
      <div
        className="flex justify-between items-center w-full pt-32 mx-auto max-w-[90vw]"
      >
        <div  data-aos="fade-right" className="flex justify-start flex-col space-y-5 lg:w-[50%]">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400">
            Simplify Your Schedules
          </h1>
          <span className="text-xl text-white">
            Meetify is a simple and easy way to schedule events and meetings in
            a seamless way with your friends and colleagues.
          </span>
          <Link href="/dashboard">
            <Button className="text-lg bg-purple-600 hover:bg-purple-800 font-medium w-44">
              <span className="pr-2">Get Started </span>
              <FaArrowRight />
            </Button>
          </Link>
        </div>
        <div data-aos="fade-left" className="hidden lg:block">
          <Image src={Poster} width={500} height={500} alt="Hero Image" />
        </div>
      </div>
      {/* Key Features Section */}
      <p className="text-3xl pt-44 pb-16 text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400">
        Key Features
      </p>
      <div
        className="flex flex-col w-full justify-center mx-auto max-w-[80vw] md:mx-auto md:max-w-[90vw] text-center md:flex-row md:space-y-0 md:space-x-8 space-y-8"
      >
        {Features.map((feature, index) => (
          <Card
            className="shadow-md bg-[#1F1F1F] border-2 border-purple-500"
            key={index}
            data-aos="fade-up"
          >
            <CardHeader>
              <div className="flex justify-center flex-col items-center space-y-5">
                <p className="text-5xl text-center text-purple-600">
                  {feature.icon}
                </p>
                <CardTitle className="text-lg text-center text-purple-600">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-md text-center text-white">
                  {feature.description}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
      {/* Testimonials section */}
      <p className="text-3xl pt-44 pb-16 text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400">
        What Our Users Say
      </p>
      {/* <div data-aos="fade-up"> */}
      <Testimonials />
      {/* </div> */}
      {/* How it works */}
      <p className="text-3xl pt-44 pb-16 text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400">
        How It Works
      </p>
      <div className="flex flex-col justify-center items-center space-y-10 mx-auto w-full max-w-[80vw] md:space-y-0 md:flex-row md:gap-5 md:flex-wrap lg:flex-nowrap lg:space-x-10">
        {howItWorks.map((step, index) => (
          <div
            data-aos="fade-up-right"
            className="flex flex-col shadow-md bg-[#1F1F1F] items-center justify-between space-y-5 py-8 rounded-lg w-full max-w-[20rem] min-h-[18rem] px-3 border-2 border-purple-500"
            key={index}
          >
            <p className="text-3xl text-purple-600 text-center bg-purple-200 p-5 rounded-full w-[5rem] h-[5rem] flex items-center justify-center">
              {index + 1}
            </p>
            <p className="text-xl text-white font-semibold text-center">
              {step.step}
            </p>
            <p className="text-lg text-white text-center">{step.description}</p>
          </div>
        ))}
      </div>
      {/* Start for free */}
      <div
        data-aos="fade-up"
        className="flex flex-col space-y-4 px-12 py-10  w-full justify-center items-center mx-auto max-w-[90vw] bg-gradient-to-r from-purple-600 to-purple-400 mt-40 rounded-lg"
      >
        <p className="text-white font-extrabold text-3xl text-center">
          Ready to Simplify Your Scheduling?
        </p>
        <p className="text-white text-xl text-center">
          Join thousands of professionals who trust Meetify for efficient time
          management.
        </p>
        <Button className="bg-white text-purple-600 hover:bg-gray-200">
          Start here
        </Button>
      </div>
    </div>
  );
}
