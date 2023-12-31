"use client";
import { useEffect, useState } from "react";
import Button from "../form/Button";
import useSWR from "swr";
import { fetcher } from "@/libs/fetcher";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import CourseSkeleton from "../skeleton/CourseSkeleton";
import useCurrentUser from "@/hooks/useCurrentUser";
import { BiPlusCircle } from "react-icons/bi";
import Link from "next/link";
import CourseItem from "../course/CourseItem";
import HeaderBack from "../shared/HeaderBack";

const Onboard = () => {
  const router = useRouter();
  const { data: courses, isLoading } = useSWR(`/api/courses`, fetcher);
  const { data: user, mutate } = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const canSubmit = rooms.length > 0;
  const [avCourses, setAvCourses] = useState(null);

  useEffect(() => {
    if (courses && courses.length > 0 && user) {
      const selectedCourseCode = courses
        .filter((course) => user.courses.includes(course._id))
        .map((course) => course.code);

      const availableCourses = courses.filter(
        (course) => !selectedCourseCode.includes(course.code)
      );
      setAvCourses(availableCourses);
    }
  }, [courses, user]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.put(`/api/users/update/student-information`, { rooms });
      setRooms([]);
      setLoading(false);
      await mutate();
      router.push("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-y-4">
      {user && user.courses.length > 0 && (
        <HeaderBack title="Course Selection" />
      )}
      <div className="h-full w-full flex flex-col gap-y-4 items-center justify-center px-4 pb-[96px]">
        <div className="h-fit py-2 flex flex-col gap-y-4">
          <h1 className="text-2xl text-center font-medium">
            Select your courses{" "}
            <span className="font-semibold">{`${rooms.length}/${
              user ? user.maxCourse : "-"
            }`}</span>
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
          {isLoading ? (
            <div className="flex flex-col gap-y-4 w-full">
              <CourseSkeleton />
              <CourseSkeleton />
              <CourseSkeleton />
              <CourseSkeleton />
              <CourseSkeleton />
              <CourseSkeleton />
              <CourseSkeleton />
              <CourseSkeleton />
            </div>
          ) : avCourses && avCourses.length > 0 ? (
            avCourses.map((course) => (
              <CourseItem
                key={course._id}
                data={course}
                rooms={rooms}
                setRooms={setRooms}
                canSubmit={canSubmit}
                loading={loading}
              />
            ))
          ) : (
            <div className="h-full w-full flex items-center justify-center font-semibold flex-col gap-y-4">
              <h1>No course found</h1>
              {user && user.role === "admin" && (
                <Link
                  href={"/courses/create"}
                  className="button flex items-center gap-x-4"
                >
                  <div>
                    <BiPlusCircle size={30} />
                  </div>
                  <p>Add new course</p>
                </Link>
              )}
            </div>
          )}
        </div>
        <div className="fixed bottom-0 z-10 left-0 w-full py-4 px-4 flex flex-col gap-y-2 bg">
          <Button
            loading={loading}
            disabled={!canSubmit}
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
