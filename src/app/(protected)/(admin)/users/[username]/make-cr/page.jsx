"use client";
import Button from "@/components/form/Button";
import CardContainer from "@/components/shared/CardContainer";
import CourseSkeleton from "@/components/skeleton/CourseSkeleton";
import { fetcher } from "@/libs/fetcher";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

const Course = ({ data, rooms, setRooms }) => {
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

const Page = ({ params }) => {
  const router = useRouter();
  const {
    data: user,
    isLoading,
    error,
  } = useSWR(`/api/users/${params.username}`, fetcher);

  const { data: courses, isLoading: loadingCourses } = useSWR(
    `/api/courses`,
    fetcher
  );
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await axios.put(`/api/users/${params.username}/make-cr`, { rooms });
      router.push("/users");
      setLoading(false);
      toast.success(`${user.name.firstname} is CR from now`);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-y-2 p-4">
      <div className="w-full flex items-center justify-center card rounded-lg py-4 flex-col gap-y-4 shadow-sm">
        <div className="w-5/6 flex gap-x-4 items-center">
          <div>
            <div className="h-20 w-20 relative">
              <Image
                src={"/profile-avatar.jpg"}
                alt="profile"
                fill
                className="object-cover rounded-full"
              />
            </div>
          </div>
          {isLoading ? (
            <div className="h-5 w-3/5 bg-zinc-500 animate-pulse rounded-md" />
          ) : (
            user && (
              <h1 className="font-semibold">{`${user.name.firstname} ${user.name.lastname}`}</h1>
            )
          )}
        </div>
      </div>
      <div className="h-4/6 px-4 card overflow-y-auto flex flex-col gap-y-2 justify-between shadow-md relative rounded-md pt-2">
        <div className="flex flex-col gap-y-2">
          {loadingCourses ? (
            <div className="flex flex-col w-full gap-y-4">
              {[1, 2, 3, 4, 5].map((index) => (
                <CourseSkeleton key={index} />
              ))}
            </div>
          ) : (
            courses &&
            courses.map((course) => (
              <Course
                key={course._id}
                data={course}
                rooms={rooms}
                setRooms={setRooms}
              />
            ))
          )}
        </div>
        <div className="sticky bottom-0 w-full card py-2">
          <Button loading={loading} onClick={handleSubmit} title="Submit" />
        </div>
      </div>
    </div>
  );
};

export default Page;
