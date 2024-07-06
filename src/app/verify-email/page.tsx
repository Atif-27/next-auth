"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { useSearchParams } from "next/navigation";
import page from "../page";

const Page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  async function verifyEmail() {
    try {
      const res = await fetch(`http://localhost:3000/api/users/verify`, {
        method: "POST",
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error: any) {
      console.log(error);
    }
  }
  return (
    <div>
      <h1>Verify Email Page</h1>
      <p>Slug: {token}</p>
      <button onClick={verifyEmail}>Verify Email</button>
    </div>
  );
};

export default Page;
