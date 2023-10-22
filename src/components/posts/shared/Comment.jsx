import IconButton from "@/components/shared/IconButton";
import moment from "moment";
import Image from "next/image";
import React from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { BsDot, BsThreeDotsVertical } from "react-icons/bs";

const Comment = ({ data }) => {
  const { caption, _id, owner, createdAt, likes, dislikes } = data;

  const timeAgo = moment(createdAt).fromNow();

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
        <div className="text-xs flex items-center gap-x-1 opacity-70 flex-wrap">
          <h1 className="font-semibold px-1 click rounded-md">
            {`${owner.name.firstname} ${owner.name.lastname}`}
          </h1>
          <BsDot size={20} />
          <p>{timeAgo}</p>
        </div>
        <p className="text-xs leading-5 font-medium click no-select rounded-md p-1">
          {caption}
        </p>
        <div className="text-xs font-medium w-full flex items-center gap-x-2">
          <IconButton>
            <BiLike size={20} />
          </IconButton>
          <p className="opacity-80">{likes.length}</p>
          <IconButton>
            <BiDislike size={20} />
          </IconButton>
          <p className="opacity-80">{dislikes.length}</p>
        </div>
      </div>
      <IconButton>
        <BsThreeDotsVertical size={20} />
      </IconButton>
    </div>
  );
};

export default Comment;
