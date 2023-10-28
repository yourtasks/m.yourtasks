"use client";
import React from "react";
import Comment from "./Comment";
import useSWR from "swr";
import { fetcher } from "@/libs/fetcher";
import Empty from "../shared/Empty";
import CommentSkeleton from "../skeleton/CommentSkeleton";

const CommentList = ({ apiUrl, handleLike, handleDislike }) => {
  const { data: comments, isLoading, mutate } = useSWR(apiUrl, fetcher);

  return (
    <div className="h-full w-full card p-2 flex flex-col gap-y-3">
      {isLoading ? (
        <div className="w-full h-full flex flex-col gap-y-4">
          {[1, 2, 3].map((item) => (
            <CommentSkeleton key={item} />
          ))}
        </div>
      ) : comments && comments.length > 0 ? (
        comments.map((comment) => (
          <Comment
            key={comment._id}
            data={comment}
            mutate={mutate}
            handleDislike={handleDislike}
            handleLike={handleLike}
          />
        ))
      ) : (
        <Empty title="No comments yet" />
      )}
    </div>
  );
};

export default CommentList;
