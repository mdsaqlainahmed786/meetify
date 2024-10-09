"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import EventForm from "../components/EventForm";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { Button } from "../components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../components/ui/drawer";

export default function EventDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const SearchParams = useSearchParams();

  useEffect(() => {
    const create = SearchParams.get("create");
    if (create) {
      setIsOpen(true);
    }
  }, [SearchParams]);

  const handleOpen = () => {
    setIsOpen(false);
    if (SearchParams.get("create") === "true") {
      router.replace(window?.location.pathname);
     
    }
  };

  return (
    <Drawer open={isOpen} handleOpen={handleOpen}>
           {/* <Toaster position="top-right" reverseOrder={false} /> */}
      <DrawerContent className="bg-[#1F1F1F] border-[#1F1F1F] border-t-purple-600">
        <DrawerHeader>
          <DrawerTitle className="text-white">Create New Event</DrawerTitle>
          <DrawerDescription>
            <EventForm
              onSubmitForm={handleOpen} // Call handleOpen on successful form submission
              setIsOpen={setIsOpen}
            />
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" className="bg-[#1F1F1F] border-2 text-white border-purple-600 hover:bg-[#1F1F1F] hover:text-white" onClick={handleOpen}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
