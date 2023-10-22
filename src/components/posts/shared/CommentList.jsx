"use client";
import React from "react";
import Comment from "./Comment";
import useSWR from "swr";
import { fetcher } from "@/libs/fetcher";

const CommentList = ({ apiUrl, handleLike, handleDislike }) => {
  const { data: comments, isLoading, mutate } = useSWR(apiUrl, fetcher);

  return (
    <div className="w-full card p-2 flex flex-col gap-y-3">
      {isLoading
        ? "Loading comments"
        : comments &&
          comments.length > 0 &&
          comments.map((comment) => (
            <Comment
              key={comment._id}
              data={comment}
              handleDislike={handleDislike}
              handleLike={handleLike}
              mutate={mutate}
            />
          ))}
    </div>
  );
};

export default CommentList;
