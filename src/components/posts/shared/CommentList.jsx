"use client";
import React from "react";
import Comment from "./Comment";
import useSWR from "swr";
import { fetcher } from "@/libs/fetcher";

const CommentList = ({ apiUrl }) => {
  const { data: comments, isLoading } = useSWR(apiUrl, fetcher);
  console.log(comments);
  return (
    <div className="w-full card p-2 flex flex-col gap-y-3">
      {isLoading
        ? "Loading comments"
        : comments &&
          comments.length > 0 &&
          comments.map((comment) => (
            <Comment key={comment._id} data={comment} />
          ))}
    </div>
  );
};

export default CommentList;
