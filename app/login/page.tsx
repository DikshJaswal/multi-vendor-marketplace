"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Logged in");
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-2xl shadow w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Login
        </h1>

        {/* GOOGLE */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 mb-4 hover:bg-gray-50"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <div className="text-center text-gray-400 mb-4">OR</div>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              className="w-full border p-2 rounded pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              onClick={() => setShow(!show)}
              className="absolute right-3 top-2 cursor-pointer text-sm text-gray-500"
            >
              {show ? "Hide" : "Show"}
            </span>
          </div>

          <button className="w-full bg-black text-white py-2 rounded-lg">
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}