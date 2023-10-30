"use client";

import Button from "@/components/form/Button";
import InputField from "@/components/form/InputField";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineCode } from "react-icons/hi";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");

  const handleChange = (e) => {
    setId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data } = await axios.post(`/api/token/${id}/forgot-password`);

      console.log(data);
      toast.success("Code sent to your email");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Failed to send code");
    }
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
          value={id}
          onChange={handleChange}
        />
        <Button title="send code" loading={loading} />
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
