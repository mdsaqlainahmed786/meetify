"use client"
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardContent } from "../components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";
import AOS from 'aos';
import 'aos/dist/aos.css';

export function Testimonials() {
  useEffect(() => {
    AOS.init({
      duration: 1000,  // Customize animation duration (optional)
      once: false,      // Animation only occurs once
    });
  }, []);

    const testimonials = [
        {
          name: "Sarah Johnson",
          role: "Marketing Manager",
          content:
            "meetify has transformed how I manage my team's meetings. It's intuitive and saves us hours every week!",
          image: "https://i.pravatar.cc/150?img=1",
        },
        {
          name: "David Lee",
          role: "Freelance Designer",
          content:
            "As a freelancer, meetify helps me stay organized and professional. My clients love how easy it is to book time with me.",
          image: "https://i.pravatar.cc/150?img=2",
        },
        {
          name: "Emily Chen",
          role: "Startup Founder",
          content:
            "meetify streamlined our hiring process. We've never imagined Setting up interviews has never been easier!",
          image: "https://i.pravatar.cc/150?img=3",
        },
        {
          name: "Michael Brown",
          role: "Sales Executive",
          content:
            "I've seen a 30% increase in my meeting bookings since using meetify. It's a game-changer for sales professionals.",
          image: "https://i.pravatar.cc/150?img=4",
        },
        {
          name: "Jessica Thompson",
          role: "Product Manager",
          content:
            "meetify has been a lifesaver for our product team. We can now focus on building great products instead of scheduling meetings.",
          image: "https://i.pravatar.cc/150?img=34",
        },
        {
            name: "John Ross",
            role: "CTO",
            content:
                "meetify has transformed how I manage my team's meetings. It's intuitive and saves us hours every week!",
            image: "https://i.pravatar.cc/150?img=52",
        },
        {
            name: "Daniel Smith",
            role: "Software Engineer",
            content:
                "As a Software Engineer, meetify helps me stay organized. My Team love how easy it is to book time with me.",
            image: "https://i.pravatar.cc/150?img=33",
        }
      ];
  return (
    <Carousel   
    plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]} className="w-full mx-auto max-w-[90vw]">
      <CarouselContent className="-ml-1">
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div data-aos="flip-right" className="p-1">
              <Card className="bg-[#1F1F1F] border-2 border-purple-500">
                <CardContent className="flex items-center justify-center p-6">
                <div className="flex flex-col justify-center space-y-10">
                  <span className="text-md text-white">&quot;{testimonial.content}&quot;</span>
                  <div className="flex items-center">
                   <Avatar>
                    <AvatarImage className="w-11 h-11 rounded-full" src={testimonial.image} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                   </Avatar>
                     <div className="flex flex-col justify-center ml-4">
                        <span className="font-semibold text-lg text-white">{testimonial.name}</span>
                        <span className="text-sm text-white">{testimonial.role}</span>
                        </div>
                  </div>
                </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
