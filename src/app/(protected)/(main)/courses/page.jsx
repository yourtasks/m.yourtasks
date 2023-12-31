"use client";
import AddCourse from "@/components/course/AddCourse";
import CourseCard from "@/components/course/CourseCard";
import Loading from "@/components/pages/Loading";
import HeaderBack from "@/components/shared/HeaderBack";
import CourseSkeleton from "@/components/skeleton/CourseSkeleton";
import useCurrentUser from "@/hooks/useCurrentUser";
import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";

const Page = () => {
  const { data: user } = useCurrentUser();
  const { data: courses, isLoading } = useSWR(`/api/users/courses`, fetcher);

  return (
    <div className="h-full w-full flex flex-col">
      <HeaderBack title="All of your courses" />
      <div className="w-full h-full p-4 overflow-y-auto flex flex-col gap-y-4">
        {isLoading ? (
          <>
            <CourseSkeleton />
            <CourseSkeleton />
            <CourseSkeleton />
            <CourseSkeleton />
          </>
        ) : courses && courses.length > 0 ? (
          courses.map((course) => <CourseCard key={course._id} data={course} />)
        ) : (
          <div>No course found</div>
        )}
        {user && user.courses.length < user.maxCourse && (
          <div className="w-full items-center justify-center">
            <AddCourse />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
