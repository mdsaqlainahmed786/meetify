"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import EventForm from "../components/EventForm";
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
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create New Event</DrawerTitle>
          <DrawerDescription>
            <EventForm
              onSubmitForm={() => {
                handleOpen;
              }}
            />
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" onClick={handleOpen}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
