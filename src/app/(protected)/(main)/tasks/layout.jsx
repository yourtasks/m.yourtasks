import TaskNav from "@/components/tasks/TaskNav";

const layout = ({ children }) => {
  return (
    <div className="h-full w-full both-space">
      <TaskNav />
      <div className="h-full w-full pt-[44px]">{children}</div>
    </div>
  );
};

export default layout;
