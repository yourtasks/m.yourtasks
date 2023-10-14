const TaskSkeleton = () => {
  return (
    <div className="flex items-center gap-x-4">
      <div>
        <div className="h-6 w-6 rounded-full skeleton" />
      </div>
      <div className="h-[70px] w-full skeleton rounded-lg" />
    </div>
  );
};

export default TaskSkeleton;
