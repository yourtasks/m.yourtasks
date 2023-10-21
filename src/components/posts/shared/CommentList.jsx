import React from "react";
import CommentBar from "./CommentBar";
import Comment from "./Comment";

const CommentList = () => {
  return (
    <div className="h-full w-full card p-2 flex flex-col gap-y-3">
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <CommentBar />
    </div>
  );
};

export default CommentList;
