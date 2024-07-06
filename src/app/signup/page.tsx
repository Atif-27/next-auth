"use client";
import React, { useState } from "react";
import page from "../page";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SignupPage() {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  async function handleSignup() {
    try {
      console.log(user);
      setIsLoading(true);
      const res = await fetch("http://localhost:3000/api/users/signup", {
        body: JSON.stringify(user),
        method: "POST",
      });
      const { message } = await res.json();
      toast.success(message);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  const isDisabled =
    user.email === "" || user.password === "" || user.username === ""
      ? true
      : false;
  return (
    <div
      className="
      flex flex-col items-center justify-center h-screen
      bg-black text-white
    "
    >
      <h1>Sign Up Page</h1>
      <input
        type="email"
        placeholder="Email"
        value={user.email}
        className="mt-4 bg-gray-300 p-2 w-80 rounded-md"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Username"
        value={user.username}
        className="mt-4 bg-gray-300 p-2 w-80 rounded-md"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={user.password}
        className="mt-4 bg-gray-300 p-2 w-80 rounded-md"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        onClick={handleSignup}
        disabled={isDisabled}
        className="
        mt-4 bg-gray-300 p-2 w-80 rounded-md
        hover:bg-gray-400 
      "
      >
        {isLoading ? "Loading..." : "Sign Up"}
      </button>
      <Link
        href="/login"
        className="
 text-blue-500 mt-4 
       
      "
      >
        Already have an account? Login
      </Link>
    </div>
  );
}

export default SignupPage;
