"use client";

import IconButton from "@/components/shared/IconButton";
import moment from "moment/moment";
import Image from "next/image";
import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

const PostHeader = ({ createdAt, owner }) => {
  const {
    name: { firstname, lastname },
  } = owner;

  const postTime = moment(createdAt).fromNow();

  return (
    <div className="w-full px-3 flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <div>
          <div className="relative h-10 w-10">
            <Image
              src={"/profile-avatar.jpg"}
              alt="profile"
              fill={true}
              className="overflow-hidden rounded-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <h1 className="text-xs font-semibold">{`${firstname} ${lastname}`}</h1>
          <p className="font-medium text-[10px] opacity-70">{postTime}</p>
        </div>
      </div>
      <IconButton>
        <BiDotsVerticalRounded size={25} />
      </IconButton>
    </div>
  );
};

export default PostHeader;
