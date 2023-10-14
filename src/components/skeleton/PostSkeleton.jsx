const PostSkeleton = () => {
  return (
    <div className="py-2 card">
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-x-2 px-3">
          <div>
            <div className="h-10 w-10 rounded-full bg-zinc-500 animate-pulse" />
          </div>
          <div className="w-full flex flex-col gap-y-2">
            <div className="w-2/5 h-4 rounded-md bg-zinc-500 animate-pulse" />
            <div className="w-1/5 h-2 rounded-md bg-zinc-500 animate-pulse" />
          </div>
        </div>
      </div>
      <div className="h-[150px]" />
      <div className="flex items-center px-4 justify-between gap-x-4 py-2">
        <div className="h-3 w-full rounded-md bg-zinc-500 animate-pulse" />
        <div className="h-3 w-full rounded-md bg-zinc-500 animate-pulse" />
        <div className="h-3 w-full rounded-md bg-zinc-500 animate-pulse" />
      </div>
    </div>
  );
};

export default PostSkeleton;
