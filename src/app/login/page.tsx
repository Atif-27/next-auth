"use client";
import React, { useState } from "react";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  async function handleLogin() {
    try {
      console.log(user);
      setIsLoading(true);
      const res = await fetch("http://localhost:3000/api/users/login", {
        body: JSON.stringify(user),
        method: "POST",
      });
      const data = await res.json();
      console.log(data);

      toast.success(data.message);
      router.push("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  }
  const isDisabled = user.email === "" || user.password === "" ? true : false;
  return (
    <div
      className="
      flex flex-col items-center justify-center h-screen
      bg-black text-white
    "
    >
      <h1>Login Page</h1>
      <input
        type="email"
        placeholder="Email"
        value={user.email}
        className="mt-4 bg-gray-300 p-2 w-80 rounded-md"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        value={user.password}
        className="mt-4 bg-gray-300 p-2 w-80 rounded-md"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        onClick={handleLogin}
        disabled={isDisabled}
        className="
        mt-4 bg-gray-300 p-2 w-80 rounded-md
        hover:bg-gray-400 
      "
      >
        {isLoading ? "Loading..." : "Sign Up"}
      </button>
      <Link
        href="/signup"
        className="
 text-blue-500 mt-4 
       
      "
      >
        Dont have an account? Sign Up
      </Link>
    </div>
  );
}

export default LoginPage;
