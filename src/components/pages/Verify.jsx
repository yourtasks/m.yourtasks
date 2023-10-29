"use client";

import Button from "@/components/form/Button";
import InputField from "@/components/form/InputField";
import { fetcher } from "@/libs/fetcher";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiLogOutCircle } from "react-icons/bi";
import useSWR from "swr";

const Verify = ({ studentId }) => {
  const { data: token, mutate } = useSWR(`/api/token/${studentId}`, fetcher);

  console.log(token);

  const canResend = token
    ? new Date() - new Date(token.updatedAt) > 60000
    : false;

  const [resending, setResending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const canSubmit = code.length === 6;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await axios.put(`/api/token/${studentId}/verify`, {
        code,
      });
      window.location.replace("/login");
      toast.success("Email verified successfully");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Invalid verification code");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;

    const santizedValue = value.slice(0, 6);

    setCode(santizedValue);
  };

  const handleResetCode = async () => {
    setResending(true);
    try {
      await axios.get(`/api/token/${studentId}/resend-token`);
      toast.success("Sent code to your email");
      await mutate();
      setResending(false);
    } catch (error) {
      setResending(false);
      console.log(error);
      toast.error("Couldn't resend code");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-5/6 card p-4 flex flex-col gap-y-4 rounded-lg relative">
        <div onClick={signOut} className="flex w-full justify-end items-center">
          <p className="font-semibold px-4">Log out</p>
          <div className="p-2 rounded-full bg-rose-500 flex items-center justify-center">
            <BiLogOutCircle size={30} />
          </div>
        </div>
        <div className="flex items-center justify-center ">
          <p className="bg-sky-500 rounded-full h-16 w-16 text-3xl flex items-center justify-center font-semibold">
            @
          </p>
        </div>
        <h1 className="text-2xl font-semibold text-center">
          Verify Email Account
        </h1>
        <p className="text-center text-sm opacity-70 py-4">
          A 6-digit verification code has been sent to your email. Please check
          your email inbox, including the spam or junk folder, to find the code.
          <br />
          <br />
          If you haven{"'"}t received the code, please click the{" "}
          <span className="font-semibold"> Resend Code </span> button
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center justify-center gap-y-4"
        >
          <InputField
            disabled={loading}
            type="number"
            name="code"
            placeholder="Enter 6-digit verification code"
            value={code}
            onChange={handleChange}
            style="text-sm text-center font-semibold tracking-wider"
          />
          <Button
            disabled={!canSubmit || loading}
            loading={loading}
            title="Verify"
          />
        </form>
        <Button
          onClick={handleResetCode}
          disabled={!canResend}
          title="Resend"
          loading={resending}
          style={"text-xs font-semibold"}
          secondary
        />
      </div>
    </div>
  );
};

export default Verify;
