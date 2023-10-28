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
    <div className="h-full w-full card p-2 flex flex-col gap-y-3">Test</div>
  );
};

export default CommentList;
