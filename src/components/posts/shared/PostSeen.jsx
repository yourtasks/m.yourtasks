const PostSeen = ({ postId, seen }) => {
  return (
    <div className="w-full flex justify-end text-xs font-semibold px-4 opacity-70">
      seen {seen.length}
    </div>
  );
};

export default PostSeen;
