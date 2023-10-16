"use client";
import CourseCard from "@/components/course/CourseCard";
import Loading from "@/components/pages/Loading";
import HeaderBack from "@/components/shared/HeaderBack";
import CourseSkeleton from "@/components/skeleton/CourseSkeleton";
import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";

const Page = () => {
  const { data: courses, isLoading } = useSWR(`/api/courses`, fetcher);

  return (
    <div className="h-full w-full flex flex-col">
      <HeaderBack title="All of your courses" />
      <div className="w-full h-full p-4 overflow-y-auto flex flex-col gap-y-4">
        {isLoading ? (
          <CourseSkeleton />
        ) : courses && courses.length > 0 ? (
          courses.map((course) => <CourseCard key={course._id} data={course} />)
        ) : (
          <div>No course found</div>
        )}
      </div>
    </div>
  );
};

export default Page;
