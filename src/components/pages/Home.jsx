"use client";
import React from "react";
import Post from "../posts/Post";
import useSWR from "swr";
import { fetcher } from "@/libs/fetcher";
import PostSkeleton from "../skeleton/PostSkeleton";

const Home = () => {
  const currentDate = new Date();

  console.log(currentDate);

  const { data: posts, isLoading } = useSWR(`/api/announcements`, fetcher);
  console.log("Rereendering", isLoading);
  return (
    <div className="w-full h-full pt-[56px] pb-[96px] flex flex-col gap-y-1 overflow-y-auto">
      {isLoading ? (
        <>
          {[1, 2, 3].map((index) => (
            <PostSkeleton key={index} />
          ))}
        </>
      ) : (
        posts && posts.map((post) => <Post key={post._id} data={post} />)
      )}
    </div>
  );
};

export default Home;
