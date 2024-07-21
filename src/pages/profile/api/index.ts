"use server";
import { auth } from "@/auth";

export async function getUser() {
    try {
      const session = await auth();
      const findUser = await fetch("http://localhost:3000/api/user/", {
        headers: {
          "Content-Type": "application/json",
          id: session?.user.id,
        },
        next: { tags: ["user"] },
      });
      return findUser.json();
    } catch (error) {
      console.log("error =", error);
    }
  }