"use client";
import InputField from "@/components/form/InputField";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";
import { BiSend, BiSolidSend } from "react-icons/bi";
import { BsFillSendFill, BsSend } from "react-icons/bs";
import { mutate } from "swr";

const CommentBar = ({ apiUrl, mutate: parentMutate }) => {
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const canSubmit = !loading && caption.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(apiUrl, { caption });

      setCaption("");
      await mutate(apiUrl);
      await parentMutate();
      toast.success("Comment added");
      setLoading(false);
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;

    setCaption(value);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-40 card px-2 py-2 flex items-center gap-x-2">
      <div>
        <div className="h-10 w-10 relative no-select">
          <Image
            src={"/profile-avatar.jpg"}
            alt="profile"
            className="object-cover rounded-full"
            fill
          />
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-x-2 w-full"
      >
        <InputField
          disabled={loading}
          value={caption}
          onChange={handleChange}
          placeholder="Write a comment"
        />
        <button
          disabled={!canSubmit}
          className={`px-4 py-2 rounded-lg ${!loading && "click"}`}
        >
          {loading ? (
            <div className="text-sky-500 animate-spin flex items-center justify-center">
              <AiOutlineLoading size={20} />{" "}
            </div>
          ) : canSubmit ? (
            <div className="text-sky-500">
              <BsFillSendFill size={20} />
            </div>
          ) : (
            <BsSend size={20} />
          )}
        </button>
      </form>
    </div>
  );
};

export default CommentBar;
