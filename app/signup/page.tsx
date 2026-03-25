"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  // ✅ EMAIL VALIDATION
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // ✅ BLOCK TEMP EMAILS
  const blockedDomains = [
    "tempmail.com",
    "10minutemail.com",
    "mailinator.com",
  ];

  const handleSignup = async (e: any) => {
    e.preventDefault();

    // 🔥 VALIDATIONS

    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Invalid email address");
      return;
    }

    const domain = email.split("@")[1];
    if (blockedDomains.includes(domain)) {
      toast.error("Disposable emails not allowed");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // 🔥 API CALL
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    toast.success("Account created 🎉");

    // 🔥 AUTO LOGIN
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    window.location.href = "/";
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-2xl shadow w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h1>

        {/* GOOGLE */}
        <button
          onClick={() => signIn("google")}
          className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 mb-4 hover:bg-gray-50"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <div className="text-center text-gray-400 mb-4">OR</div>

        {/* FORM */}
        <form onSubmit={handleSignup} className="space-y-4">

          <input
            placeholder="Name"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <p className="text-xs text-gray-400">
            Password must be at least 6 characters
          </p>

          <button className="w-full bg-black text-white py-2 rounded-lg">
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}