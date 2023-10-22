"use client";
import InputField from "@/components/form/InputField";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiSend } from "react-icons/bi";
import { mutate } from "swr";

const CommentBar = ({ apiUrl }) => {
  const [caption, setCaption] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(apiUrl, { caption });

      console.log(data);

      await mutate(apiUrl);
      toast.success("Comment added");
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;

    setCaption(value);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-40 card px-2 py-2 flex items-center gap-x-2">
      <div>
        <div className="h-10 w-10 relative">
          <Image
            src={"/profile-avatar.jpg"}
            alt="profile"
            className="object-cover rounded-full"
            fill
          />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-x-2">
        <InputField
          value={caption}
          onChange={handleChange}
          placeholder="Write a comment"
          focus={true}
        />
        <button className="px-4 py-2 rounded-lg click">
          <BiSend size={20} />
        </button>
      </form>
    </div>
  );
};

export default CommentBar;
