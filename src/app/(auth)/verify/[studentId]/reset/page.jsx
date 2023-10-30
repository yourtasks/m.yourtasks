"use client";

import Button from "@/components/form/Button";
import InputField from "@/components/form/InputField";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { GiToken } from "react-icons/gi";

export default function Page({ params }) {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  let canSubmit = code.length === 6;

  const handleChange = (e) => {
    const sanitizedValue = e.target.value;
    setId(sanitizedValue.slice(0, 6));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data } = await axios.post(
        `/api/token/${params.studentId}/verify/reset`,
        { code }
      );

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
          <GiToken size={50} />
        </div>
        <h1 className="text-center font-semibold py-4 opacity-70">
          A verification code
          <br />
          <span className="text-sm">has been sent to your email</span>
        </h1>
        <InputField
          type="number"
          placeholder="Verification Code"
          value={code}
          onChange={handleChange}
          style={"text-center tracking-widest"}
        />
        <Button disabled={!canSubmit} title="Verify" loading={loading} />
      </form>
    </div>
  );
}
