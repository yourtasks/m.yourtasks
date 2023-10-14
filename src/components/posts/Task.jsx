const Task = ({ title, description, deadline }) => {
  return (
    <div className="w-full flex flex-col gap-y-2 p-4">
      <div className="flex flex-col gap-y-2 w-full p-2 invert-bg bg-opacity-20 rounded-lg">
        <h1 className="font-medium">{title}</h1>
        <p className="text-xs">{description}</p>
      </div>
    </div>
  );
};

export default Task;
