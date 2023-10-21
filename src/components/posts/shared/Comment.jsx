import IconButton from "@/components/shared/IconButton";
import Image from "next/image";
import React from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { BsDot, BsThreeDotsVertical } from "react-icons/bs";

const Comment = () => {
  return (
    <div className="w-full flex gap-x-2 px-2">
      <div>
        <div className="h-7 w-7 relative">
          <Image
            src={"/profile-avatar.jpg"}
            alt="profile"
            className="object-cover rounded-full"
            fill
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-1 no-select">
        <div className="text-xs flex items-center gap-x-1 opacity-70">
          <h1 className="font-semibold px-1 click rounded-md">
            Md Mofazzal Hossain
          </h1>
          <BsDot size={20} />
          <p>12 May 2023</p>
        </div>
        <p className="text-xs leading-5 font-medium click no-select rounded-md p-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga dolores
          ipsum maiores sit mollitia porro illum dignissimos molestiae nobis
          temporibus ullam nam consequuntur culpa minima, velit officia
          reiciendis autem quasi?
        </p>
        <div className="text-xs font-medium w-full flex items-center gap-x-2">
          <IconButton>
            <BiLike size={20} />
          </IconButton>
          <p className="opacity-80">15</p>
          <IconButton>
            <BiDislike size={20} />
          </IconButton>
          <p className="opacity-80">15</p>
        </div>
      </div>
      <IconButton>
        <BsThreeDotsVertical size={20} />
      </IconButton>
    </div>
  );
};

export default Comment;
