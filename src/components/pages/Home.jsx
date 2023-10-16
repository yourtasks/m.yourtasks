"use client";
import React from "react";
import Post from "../posts/Post";
import useSWR from "swr";
import { fetcher } from "@/libs/fetcher";
import PostSkeleton from "../skeleton/PostSkeleton";

const Home = () => {
  const { data: posts, isLoading } = useSWR(`/api/announcements`, fetcher);

  console.log(posts);
  return (
    <div className="w-full h-full both-space flex flex-col gap-y-1 overflow-y-auto">
      {isLoading ? (
        <>
          {[1, 2, 3].map((index) => (
            <PostSkeleton key={index} />
          ))}
        </>
      ) : posts && posts.length > 0 ? (
        posts.map((post) => <Post key={post._id} data={post} />)
      ) : (
        <div className="h-full w-full flex items-center justify-center text-xl font-semibold">
          No post found
        </div>
      )}
    </div>
  );
};

export default Home;
