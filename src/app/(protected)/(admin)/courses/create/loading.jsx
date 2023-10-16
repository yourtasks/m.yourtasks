import LoadingSpinner from "@/components/shared/LoadingSpinner";

const loading = () => {
  return (
    <div className="h-full w-full flex items-center justify-center gap-x-4">
      <h1 className="text-xl font-semibold">Loading</h1>
      <LoadingSpinner size={30} />
    </div>
  );
};

export default loading;
