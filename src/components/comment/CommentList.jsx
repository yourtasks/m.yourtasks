"use client";
import React from "react";
import Comment from "./Comment";
import useSWR from "swr";
import { fetcher } from "@/libs/fetcher";
import Empty from "../shared/Empty";
import CommentSkeleton from "../skeleton/CommentSkeleton";

const CommentList = ({ apiUrl, handleLike, handleDislike }) => {
  const { data: comments, isLoading, mutate } = useSWR(apiUrl, fetcher);

  console.log(comments);

  return (
    <div className="h-full w-full card p-2 flex flex-col gap-y-3">
      {isLoading ? (
        <div className="w-full flex flex-col gap-y-4">
          <CommentSkeleton />
          <CommentSkeleton />
          <CommentSkeleton />
          <CommentSkeleton />
        </div>
      ) : comments && comments.length > 0 ? (
        comments.map((comment) => (
          <Comment
            key={comment._id}
            data={comment}
            handleDislike={handleDislike}
            handleLike={handleLike}
            mutate={mutate}
          />
        ))
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          <Empty title="No comments yet" />
        </div>
      )}
    </div>
  );
};

export default CommentList;
