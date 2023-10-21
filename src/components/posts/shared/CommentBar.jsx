import InputField from "@/components/form/InputField";
import Image from "next/image";
import React from "react";
import { BiSend } from "react-icons/bi";

const CommentBar = () => {
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
      <InputField placeholder="Write a comment" focus={true} />
      <button className="px-4 py-2 rounded-lg click">
        <BiSend size={20} />
      </button>
    </div>
  );
};

export default CommentBar;
