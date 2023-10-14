"use client";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiCheck, BiCheckDouble, BiSolidCheckCircle } from "react-icons/bi";
import { BsDot, BsEyeFill, BsThreeDotsVertical } from "react-icons/bs";
import { mutate } from "swr";

export default function TaskItem({ data }) {
  const {
    _id,
    title,
    description,
    source,
    createdAt,
    deadline,
    seen,
    hasCompleted,
  } = data;
  const timeDifference = new Date(deadline) - new Date();
  console.log(timeDifference);
  const hoursLeft = timeDifference / (1000 * 60 * 60);
  const oneDayLeft = hoursLeft <= 23;
  const late = new Date(deadline) < new Date();

  console.log(oneDayLeft);

  const createdAgo = moment(createdAt).fromNow();
  const deadlineTime = moment(deadline).fromNow();

  const view = async () => {
    try {
      await axios.put(`/api/tasks/${_id}/seen`);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    view();
  }, []);

  const [checked, setChecked] = useState(false);

  const handleChecked = async () => {
    setChecked(true);

    try {
      const { data } = await axios.put(`/api/tasks/${_id}/completed`);

      await mutate(`/api/tasks`);

      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Could not mark as complete");
      setChecked(false);
    }
  };

  return (
    <div onClick={handleChecked} className={`flex items-center gap-x-1`}>
      <div
        className={`rounded-full flex items-center justify-center ${
          checked ? "bg-green-500" : "card"
        }`}
      >
        {checked ? (
          <BiCheck size={25} />
        ) : (
          <div className="h-[25px] w-[25px]" />
        )}
      </div>
      <div
        className={`m-2 p-2 card rounded-lg w-full ${checked && "opacity-70"}`}
      >
        <div className="w-full flex items-center gap-x-2">
          <p
            className={`text-xs rounded-md ${
              late
                ? "text-rose-500 font-bold"
                : oneDayLeft
                ? "text-green-500 font-bold"
                : "font-semibold"
            }`}
          >
            {deadlineTime}
          </p>
        </div>
        <h1 className={`font-semibold ${checked && "opacity-50 line-through"}`}>
          {title}
        </h1>
        <div className="flex items-center justify-end gap-x-4 opacity-50">
          <p className="text-xs font-medium line-clamp-1 w-full overflow-ellipsis">{`${source.section.toUpperCase()} - ${
            source.name
          }`}</p>
          {hasCompleted.length > 0 && (
            <div className="flex items-center justify-end gap-x-2">
              <BiCheckDouble size={15} />
              <p className="text-xs font-medium">{hasCompleted.length}</p>
            </div>
          )}
          {seen.length > 0 && (
            <div className="flex items-center justify-end gap-x-2 ">
              <BsEyeFill size={15} />
              <p className="text-xs font-medium">{seen.length}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
