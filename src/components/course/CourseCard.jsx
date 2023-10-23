"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import React from "react";
import { BiCheckDouble, BiTask } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { MdOutlineCampaign } from "react-icons/md";

const CourseCard = ({ data }) => {
  const { data: user } = useCurrentUser();
  const { _id, name, code, section, students, announcements, tasks, cr } = data;

  const isCR = cr && cr.length > 0 && cr.includes(user._id);

  return (
    <div className="card flex flex-col w-full gap-y-2 p-4 rounded-lg relative">
      {isCR && (
        <div className="absolute text-[10px] font-medium top-4 -left-4 -rotate-45 bg-sky-500 px-4 z-10 rounded-sm">
          Manage
        </div>
      )}
      <div className=" w-full flex justify-between items-center">
        <div className="flex flex-col gap-y-1">
          <p className="text-xs font-semibold opacity-70 uppercase">{code}</p>
          <h1 className="font-medium capitalize">{`${name} - ${section}`}</h1>
          <div>
            <div className="flex items-center gap-x-2 font-medium opacity-50">
              <BsFillPersonFill size={15} />
              <p className="text-xs">{students.length}</p>
            </div>
          </div>
        </div>
        <div className="text-xs flex flex-col gap-y-2">
          <div className="flex items-center gap-x-2">
            <MdOutlineCampaign size={20} />
            <p className="font-medium">{announcements.length}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <BiTask size={20} />
            <p className="font-medium">{tasks.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
