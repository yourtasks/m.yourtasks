"use client";

import Button from "@/components/form/Button";
import InputField from "@/components/form/InputField";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineCode } from "react-icons/hi";

export default function Page() {
  const [code, setCode] = useState("");

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-y-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-2 w-3/5 items-center"
      >
        <div className="opacity-70">
          <HiOutlineCode size={50} />
        </div>
        <h1 className="text-center font-semibold py-4 opacity-70">
          A verification code
          <br />
          <span className="text-sm">will be sent to your email address</span>
        </h1>
        <InputField
          type="number"
          placeholder="Student ID"
          value={code}
          onChange={handleChange}
        />
        <Button title="send code" />
      </form>
      <div className="flex items-center gap-x-2 text-xs opacity-60 font-semibold no-select">
        <Link href="/login" className="px-2 py-1 click rounded-sm">
          Login
        </Link>
        <p>•</p>
        <Link href="/register" className="px-2 py-1 click rounded-sm">
          Register
        </Link>
      </div>
    </div>
  );
}
