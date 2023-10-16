"use client";

import Button from "@/components/form/Button";
import InputField from "@/components/form/InputField";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const Verify = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const canSubmit = code.length === 6;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data } = await axios.put(`/api/token/verify`, {
        code,
      });

      setLoading(false);
      router.push("/onboarding");
      toast.success("Email verified successfully");
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
    try {
      await axios.get(`/api/token/resend-token`);
      toast("A code has sent to your email address");
    } catch (error) {
      console.log(error);
      toast.error("Couldn't perform the operation");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-5/6 card p-4 flex flex-col gap-y-4 rounded-lg">
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
        <button
          disabled={loading}
          onClick={handleResetCode}
          className={`text-xs rounded-lg py-2 font-medium disabled:opacity-30 ${
            !loading && "click"
          }`}
        >
          Resend Code
        </button>
      </div>
    </div>
  );
};

export default Verify;
