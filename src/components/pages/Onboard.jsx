"use client";
import { useRef, useState } from "react";
import Button from "../form/Button";
import InputField from "../form/InputField";
import { v4 } from "uuid";
import useSWR from "swr";
import { fetcher } from "@/libs/fetcher";
import axios from "axios";

const Course = ({ data, rooms, setRooms }) => {
  const canSelect = rooms.some(
    (room) => room.code !== data.code && room.section !== data.section
  );
  const isSelected = rooms.some((room) => room.roomCode === data.roomCode);

  const inputRef = useRef(null);

  const handleClick = () => {
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
    <div
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
        <h1 className="leading-5 font-medium">{data.name}</h1>
        <input
          ref={inputRef}
          type="checkbox"
          value={data.roomCode}
          onChange={handleChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

const Onboard = () => {
  const { data } = useSWR(`/api/courses`, fetcher);

  console.log(data);

  const [rooms, setRooms] = useState([]);
  const handleSubmit = async () => {
    try {
      const { data } = await axios.put(
        `/api/users/update/student-information`,
        { rooms }
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-y-4">
      <div className="h-full w-full flex flex-col gap-y-4 items-center justify-center px-4">
        <div className="h-fit py-2 flex flex-col gap-y-4">
          <h1 className="text-2xl text-center">Select your courses</h1>
          <div className="h-fit w-full flex items-center gap-x-3 gap-y-2 flex-wrap">
            {rooms.map((room) => (
              <p
                key={room.roomCode}
                className="px-2 py-1 bg-sky-500 bg-opacity-30 rounded-md text-xs"
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
              />
            ))}
        </div>
        <div className="h-fit w-full py-4">
          <Button title="Submit" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Onboard;
