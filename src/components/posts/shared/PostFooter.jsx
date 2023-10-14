"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  BiHeart,
  BiSolidHeart,
  BiCommentDetail,
  BiShare,
  BiCheckCircle,
} from "react-icons/bi";
import { mutate } from "swr";

const FooterItem = ({ Icon, count, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-full flex items-center justify-center gap-x-2 py-2 rounded-md click no-select"
    >
      <div>{Icon}</div>
      <p className="text-sm font-medium text">{count}</p>
    </div>
  );
};

const Seperator = () => {
  return (
    <div className="h-5 w-2 invert-bg rounded-md bg-opacity-20 dark:bg-opacity-20" />
  );
};

export default function PostFooter({ postId, likes, comments, shares }) {
  const { data: user } = useCurrentUser();
  console.log(likes);
  const [liking, setLiking] = useState(false);
  const [liked, setLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);

  useEffect(() => {
    if (user) {
      setLiked(likes.includes(user._id));
    }
    setTotalLikes(likes.length);
  }, [likes, user]);

  const type = "tt";

  const handleLike = async () => {
    setLiked((prev) => !prev);

    try {
      await axios.put(`/api/announcements/${postId}/like`);
      await mutate(`/api/announcements`);
    } catch (error) {
      console.log(error);

      toast.error("Couldn't like the post");
    }
    console.log("like");
  };
  const handleComment = async () => {
    console.log("comment");
  };
  const handleShare = async () => {
    console.log("share");
  };
  const handleComplete = async () => {
    console.log("Mark as complete");
  };

  return (
    <div className="flex flex-col gap-y-1">
      <p className="px-4 text-[10px] opacity-50  text-end font-medium">
        seen by 35
      </p>
      <div className="flex items-center justify-between px-2 gap-x-2">
        {type === "task" ? (
          <FooterItem
            onClick={handleComplete}
            Icon={<BiCheckCircle size={20} />}
            count={10}
          />
        ) : liked ? (
          <div className="w-full text-rose-500">
            <FooterItem
              onClick={handleLike}
              Icon={<BiSolidHeart size={20} />}
              count={totalLikes}
            />
          </div>
        ) : (
          <FooterItem
            onClick={handleLike}
            Icon={<BiHeart size={20} />}
            count={totalLikes}
          />
        )}
        <Seperator />
        <FooterItem
          onClick={handleComment}
          Icon={<BiCommentDetail size={20} />}
          count={comments.length}
        />
        <Seperator />
        <FooterItem
          onClick={handleShare}
          Icon={<BiShare size={20} />}
          count={shares.length}
        />
      </div>
    </div>
  );
}
