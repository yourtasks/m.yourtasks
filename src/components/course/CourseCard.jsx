import React from "react";
import { BiCheckDouble, BiTask } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { MdOutlineCampaign } from "react-icons/md";

const CourseCard = ({ data }) => {
  const { _id, name, code, section, students, announcements, tasks } = data;
  return (
    <div className="card flex flex-col w-full gap-y-2 p-4 rounded-lg">
      <div className=" w-full flex justify-between items-center">
        <div className="flex flex-col gap-y-1">
          <p className="text-sm font-semibold opacity-70 uppercase">{code}</p>
          <h1 className="text-lg font-medium capitalize">{`${name} - ${section}`}</h1>
          <div>
            <div className="flex items-center gap-x-2 font-medium opacity-50">
              <BsFillPersonFill size={20} />
              <p>{students.length}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center gap-x-2">
            <MdOutlineCampaign size={25} />
            <p className="font-medium">{announcements.length}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <BiTask size={25} />
            <p className="font-medium">{tasks.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
