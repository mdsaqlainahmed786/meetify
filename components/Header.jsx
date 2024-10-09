import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { PenBox } from "lucide-react";
import { SignedOut } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";
import { checkUser } from "../lib/checkUser";
import UserMenu from "./UserMenu";
async function Header() {
  await checkUser();
  return (
    <div className="w-full border-b-2 bg-[#1F1F1F] border-b-[#1F1F1F]">
      <div className="flex justify-between items-center mx-auto w-full max-w-[80vw] py-4 lg:max-w-[90vw]">
        <Link href="/">
          <div className="cursor-pointer">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400">
              Meetify
            </h1>
          </div>
        </Link>
        <div className="flex items-center">
          <Link href="/events?create=true">
            <Button className="mx-3 bg-purple-600 hover:bg-purple-800">
              <PenBox />
              <span className="hidden md:block text-sm px-2">Create Event</span>
            </Button>
          </Link>

          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button className="bg-[#1F1F1F] text-white border-2 border-purple-600">
                Login
              </Button>
            </SignInButton>
          </SignedOut>
         <SignedIn>
          <UserMenu/>
         </SignedIn>
        </div>
      </div>
    </div>
  );
}

export default Header;
