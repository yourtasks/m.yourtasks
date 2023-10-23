import IconButton from "@/components/shared/IconButton";
import useCurrentUser from "@/hooks/useCurrentUser";
import moment from "moment";
import Image from "next/image";
import React from "react";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { BsDot, BsThreeDotsVertical } from "react-icons/bs";

const Comment = ({ data, handleLike, handleDislike, mutate }) => {
  const { caption, _id, owner, createdAt, likes, dislikes } = data;
  const { data: user } = useCurrentUser();
  const liked = user && likes.includes(user._id);
  const disliked = user && dislikes.includes(user._id);

  const timeAgo = moment(createdAt).fromNow();

  const funcLike = async () => {
    await handleLike(_id);
    await mutate();
  };

  const funcDislike = async () => {
    await handleDislike(_id);
    await mutate();
  };

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
      <div className="w-full flex flex-col no-select">
        <div className="text-[10px] flex items-center gap-x-1 opacity-70 flex-wrap">
          <h1 className="font-semibold px-1">
            {`${owner.name.firstname} ${owner.name.lastname} • ${timeAgo}`}
          </h1>
        </div>
        <p className="text-xs leading-5 font-medium click no-select rounded-md p-1">
          {caption}
        </p>
        <div className="text-xs font-medium w-full flex items-center gap-x-2">
          <IconButton onClick={funcLike}>
            {liked ? <BiSolidLike size={20} /> : <BiLike size={20} />}
          </IconButton>
          <p className="opacity-80">{likes.length}</p>
          <IconButton onClick={funcDislike}>
            {disliked ? <BiSolidDislike size={20} /> : <BiDislike size={20} />}
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
