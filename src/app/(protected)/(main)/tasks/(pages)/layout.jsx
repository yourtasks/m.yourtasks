import TaskNav from "@/components/tasks/TaskNav";

const layout = ({ children }) => {
  return (
    <div className="h-full w-full both-space">
      <TaskNav />
      <div className="h-full w-full">{children}</div>
    </div>
  );
};

export default layout;
