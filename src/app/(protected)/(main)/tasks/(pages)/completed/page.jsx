"use client";
import Empty from "@/components/shared/Empty";
import TaskSkeleton from "@/components/skeleton/TaskSkeleton";
import TaskItem from "@/components/tasks/TaskItem";
import { fetcher } from "@/libs/fetcher";
import { useEffect, useState } from "react";
import useSWR from "swr";

const Page = () => {
  const { data: tasks, isLoading } = useSWR(`/api/tasks/completed`, fetcher, {
    revalidateOnFocus: false,
  });
  const [completed, setCompleted] = useState();
  console.log(isLoading);
  useEffect(() => {
    if (tasks && tasks.length > 0) {
      setCompleted(tasks);
    }
  }, [tasks]);

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
        ) : completed ? (
          completed.map((task) => (
            <TaskItem
              key={task._id}
              data={task}
              completed={true}
              selected={tasks}
            />
          ))
        ) : (
          <Empty title="No completed task" />
        )}
      </div>
    </div>
  );
};

export default Page;
