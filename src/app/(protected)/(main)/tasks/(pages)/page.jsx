"use client";
import Post from "@/components/posts/Post";
import PostSkeleton from "@/components/skeleton/PostSkeleton";
import TaskSkeleton from "@/components/skeleton/TaskSkeleton";
import TaskItem from "@/components/tasks/TaskItem";
import TaskNav from "@/components/tasks/TaskNav";
import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";

const Page = () => {
  const { data: tasks, isLoading } = useSWR(`/api/tasks`, fetcher);

  console.log(isLoading, tasks);

  return (
    <div className="h-full w-full pt-[44px]">
      <div className="h-full overflow-y-auto px-4 flex flex-col gap-y-2 py-4">
        {isLoading ? (
          <div className="flex flex-col gap-y-4">
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
          </div>
        ) : tasks && tasks.length > 0 ? (
          tasks.map((task) => <TaskItem key={task._id} data={task} />)
        ) : (
          <div className="h-full w-full font-semibold text-xl flex items-center justify-center capitalize">
            No Pending task
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
