const CommentSkeleton = () => {
  return (
    <div>
      <div className="flex gap-x-2">
        <div>
          <div className="h-10 w-10 rounded-full skeleton" />
        </div>
        <div className="flex flex-col gap-y-6 w-full">
          <div className="h-3 w-2/5 skeleton rounded-sm" />
          <div className="h-3 w-4/5 skeleton rounded-sm" />
        </div>
      </div>
    </div>
  );
};

export default CommentSkeleton;
