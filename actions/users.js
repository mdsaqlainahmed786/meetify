"use server"
import { auth, clerkClient } from "@clerk/nextjs/server";
import {db} from "../lib/prisma"
export async function updateUsername(username){
   const {userId} = auth() 
   if(!userId) throw new Error("User not found")
    const exsistingUser = await db.user.findUnique({
        where:{
            id:userId
        }
    })
  //  console.log("exsistingUser",exsistingUser)
   if(exsistingUser && exsistingUser.id === userId){
    throw new Error("Username already exists")
   }
   await db.user.update({
    where: { clerkUserId: userId },
    data: { username },
  });
   await clerkClient.users.updateUser(userId, {
         username
   })
    return {success:true}

}