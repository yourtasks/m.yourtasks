"use client";
import { useRef, useState } from "react";
import Button from "../form/Button";
import InputField from "../form/InputField";
import { v4 } from "uuid";
import useSWR from "swr";
import { fetcher } from "@/libs/fetcher";
import axios from "axios";
import { RxReset } from "react-icons/rx";
import IconButton from "../shared/IconButton";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

const Course = ({ data, rooms, setRooms, canSubmit }) => {
  const disabled =
    !canSubmit && rooms.some((room) => room.roomCode !== data.roomCode);

  const isSelected = rooms.some((room) => room.roomCode === data.roomCode);

  const inputRef = useRef(null);

  const handleClick = () => {
    if (disabled) {
      return;
    }

    inputRef.current.checked = !inputRef.current.checked;

    handleChange();
  };

  const handleChange = () => {
    console.log("first");
    const { value, checked } = inputRef.current;

    if (checked) {
      setRooms((prev) => [
        ...prev,
        {
          roomCode: value,
          name: data.name,
          section: data.section,
          id: data._id,
        },
      ]);
    } else {
      setRooms((prev) => prev.filter((room) => room.roomCode !== value));
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`border-2 border-color rounded-lg px-4 py-2 transition no-select ${
        isSelected && "border-sky-500 bg-sky-500 bg-opacity-30"
      }`}
    >
      <div className="flex items-center gap-x-4">
        <div className="flex flex-col items-center">
          <p className="uppercase text-lg font-bold">{data.section}</p>
          <p className="uppercase text-[8px] font-medium">{data.code}</p>
        </div>
        <h1 className="text-xs text-start leading-5 font-semibold line-clamp-2 w-full">
          {data.name}
        </h1>
        <input
          ref={inputRef}
          type="checkbox"
          value={data.roomCode}
          onChange={handleChange}
          className="hidden"
        />
      </div>
    </button>
  );
};

const Onboard = () => {
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const { data } = useSWR(`/api/courses`, fetcher);
  const canSubmit = rooms.length < 8;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `/api/users/update/student-information`,
        { rooms }
      );
      console.log(data);
      setLoading(false);
      redirect("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-y-4">
      <div className="h-full w-full flex flex-col gap-y-4 items-center justify-center px-4 pb-[96px]">
        <div className="h-fit py-2 flex flex-col gap-y-4">
          <h1 className="text-2xl text-center font-medium">
            Select your courses
          </h1>
          <div className="h-fit w-full flex flex-wrap items-center gap-2">
            {rooms.map((room) => (
              <p
                key={room.roomCode}
                className="h-fit w-fit px-2 py-1 bg-sky-500 bg-opacity-30 rounded-md text-xs"
              >
                {`${room.name.slice(0, 16)} (${room.section.toUpperCase()})`}
              </p>
            ))}
          </div>
        </div>
        <div className="h-full w-full overflow-y-auto flex flex-col gap-y-4">
          {data &&
            data.map((course) => (
              <Course
                key={course._id}
                data={course}
                rooms={rooms}
                setRooms={setRooms}
                canSubmit={canSubmit}
              />
            ))}
        </div>
        <div className="fixed bottom-0 z-10 left-0 w-full py-4 px-4 flex flex-col gap-y-2 bg">
          <Button
            loading={loading}
            disabled={canSubmit}
            title="Submit"
            onClick={handleSubmit}
          />
          <p className="text-center text-xs font-semibold italic text-rose-500 opacity-70">
            You cannot change section after submitting
          </p>
        </div>
      </div>
    </div>
  );
};

export default Onboard;
