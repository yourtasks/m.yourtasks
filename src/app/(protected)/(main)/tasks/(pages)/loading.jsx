import TaskSkeleton from "@/components/skeleton/TaskSkeleton";

const loading = () => {
  return (
    <div className="h-full w-full p-4 both-space">
      <div className="pt-[44px] overflow-y-auto flex flex-col gap-y-4 h-full w-full">
        <TaskSkeleton />
        <TaskSkeleton />
        <TaskSkeleton />
        <TaskSkeleton />
        <TaskSkeleton />
      </div>
    </div>
  );
};

export default loading;
