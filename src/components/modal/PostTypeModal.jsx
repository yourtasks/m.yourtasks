"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { usePostStore } from "@/store/usePostStore";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { BiBookAlt, BiTask } from "react-icons/bi";
import { MdHowToVote, MdOutlineCampaign } from "react-icons/md";

const Option = ({ title, Icon, link, setClose }) => {
  return (
    <Link
      href={link}
      onClick={setClose}
      className="flex items-center gap-x-4 p-4 font-semibold border-2 border-color rounded-lg click"
    >
      <div className="opacity-70">{Icon}</div>
      <p className="opacity-70">{title}</p>
    </Link>
  );
};

const PostTypeModal = () => {
  const { data: user } = useCurrentUser();
  const { isOpen, setClose } = usePostStore();

  const isAdmin = user && user.role === "admin";

  if (isOpen)
    return (
      <div className="fixed bottom-0 left-0 w-screen h-screen z-50">
        <div
          onClick={setClose}
          className="fixed z-10 top-0 left-0 w-full h-full invert-bg opacity-20"
        />
        <div className="absolute z-20 bottom-0 left-0 w-full card px-2 py-4 flex flex-col gap-y-2 rounded-t-xl">
          {isAdmin && (
            <Option
              title="Create Course"
              Icon={<BiBookAlt size={25} />}
              setClose={setClose}
              link="/courses/create"
            />
          )}
          <Option
            title="Create Announcement"
            Icon={<MdOutlineCampaign size={25} />}
            setClose={setClose}
            link="/announcements/create"
          />
          <Option
            title="Create Task"
            Icon={<BiTask size={25} />}
            setClose={setClose}
            link="/tasks/create"
          />
          {isAdmin && (
            <Option
              title="Create Vote"
              Icon={<MdHowToVote size={25} />}
              setClose={setClose}
              link="/votes/create"
            />
          )}
        </div>
      </div>
    );
};

export default PostTypeModal;
