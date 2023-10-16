"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";
import { BiCheck, BiCheckDouble, BiSolidCheckCircle } from "react-icons/bi";
import { BsDot, BsEyeFill, BsThreeDotsVertical } from "react-icons/bs";
import { mutate } from "swr";

export default function TaskItem({ data, completed }) {
  const [checked, setChecked] = useState(completed ? completed : false);
  const [loading, setLoading] = useState(false);
  const user = useCurrentUser();
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

  useEffect(() => {
    const view = async () => {
      try {
        await axios.put(`/api/tasks/${_id}/seen`);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      !seen.includes(user._id) && view();
    }
  }, [user, seen, _id]);

  const handleChecked = async () => {
    if (completed) {
      return;
    }

    setChecked(true);
    setLoading(true);

    try {
      await axios.put(`/api/tasks/${_id}/completed`);
      await mutate(`/api/tasks`);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setChecked(false);
      toast.error("Could not mark as complete");
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
        className={`relative m-2 p-2 card rounded-lg w-full ${
          checked && "opacity-70"
        }`}
      >
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="h-fit w-fit text-green-500 animate-spin">
              <AiOutlineLoading size={30} />
            </div>
          </div>
        )}

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
