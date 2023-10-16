import LoadingSpinner from "../shared/LoadingSpinner";

const Loading = () => {
  return (
    <div className="w-full h-full flex gap-x-4 justify-center items-center">
      <h1 className="text-lg font-semibold">Loading</h1>
      <LoadingSpinner size={30} />
    </div>
  );
};

export default Loading;
