"use client";
import Post from "@/components/posts/Post";
import PostSkeleton from "@/components/skeleton/PostSkeleton";
import TaskSkeleton from "@/components/skeleton/TaskSkeleton";
import TaskItem from "@/components/tasks/TaskItem";
import TaskNav from "@/components/tasks/TaskNav";
import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";

const Page = () => {
  const { data: tasks, isLoading } = useSWR(`/api/tasks/hasCompleted`, fetcher);

  console.log(isLoading, tasks);

  return (
    <div className="h-full w-full">
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
          tasks.map((task) => (
            <TaskItem key={task._id} data={task} completed={true} />
          ))
        ) : (
          <div className="h-full w-full font-semibold text-xs flex items-center jc">
            No Task found
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
