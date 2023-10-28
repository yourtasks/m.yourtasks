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
        "Loading Comments"
      ) : comments && comments.length > 0 ? (
        <div>Comment</div>
      ) : (
        <div>No comments</div>
      )}
    </div>
  );
};

export default CommentList;
