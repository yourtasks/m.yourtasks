"use client";
import Button from "@/components/form/Button";
import Post from "@/components/posts/Post";
import PostSkeleton from "@/components/skeleton/PostSkeleton";
import TaskSkeleton from "@/components/skeleton/TaskSkeleton";
import TaskItem from "@/components/tasks/TaskItem";
import TaskNav from "@/components/tasks/TaskNav";
import { fetcher } from "@/libs/fetcher";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import useSWR, { mutate } from "swr";

const Page = () => {
  console.log(process.env.NEXT_PUBLIC_BASE_URL);

  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const canSubmit = selected.length > 0;
  const { data: tasks, isLoading, mutate } = useSWR(`/api/tasks`, fetcher);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.put(`/api/tasks`, { tasks: selected });
      setLoading(false);
      toast.success("Marked as completed");
      await mutate();
      setSelected([]);
    } catch (error) {
      console.log(error);
      setLoading(false);

      toast.error("Failed to mark as complete");
    }
  };

  return (
    <div
      className={`h-full w-full pt-[44px] relative ${canSubmit && "pb-[40px]"}`}
    >
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
            <TaskItem
              key={task._id}
              data={task}
              onSelect={setSelected}
              selected={selected}
              loading={loading}
            />
          ))
        ) : (
          <div className="h-full w-full font-semibold text-xl flex items-center justify-center capitalize">
            No Pending task
          </div>
        )}
      </div>
      {canSubmit && (
        <div className="fixed bottom-[75px] left-0 w-full z-40 px-4">
          <Button
            title={`Mark as completed (${selected.length})`}
            onClick={handleSubmit}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
