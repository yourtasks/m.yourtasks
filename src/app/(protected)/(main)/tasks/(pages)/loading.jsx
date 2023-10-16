import TaskSkeleton from "@/components/skeleton/TaskSkeleton";

const loading = () => {
  return (
    <div className="h-full w-full overflow-y-auto flex flex-col gap-y-4 p-4">
      <TaskSkeleton />
      <TaskSkeleton />
      <TaskSkeleton />
      <TaskSkeleton />
      <TaskSkeleton />
    </div>
  );
};

export default loading;
