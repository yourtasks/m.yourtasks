"use client";
import React from "react";
import Post from "../posts/Post";
import useSWR from "swr";
import { fetcher } from "@/libs/fetcher";
import PostSkeleton from "../skeleton/PostSkeleton";
import { MdCloudDone } from "react-icons/md";
import EndPost from "../shared/EndPost";

const Home = () => {
  const { data: posts, isLoading } = useSWR(`/api/announcements`, fetcher);

  return (
    <div className="h-full w-full flex flex-col items-center">
      <div className="w-full sm:w-3/5 md:w-3/5 lg:w-2/5 h-full both-space flex flex-col gap-y-1 overflow-y-auto">
        {isLoading ? (
          <>
            {[1, 2, 3].map((index) => (
              <PostSkeleton key={index} />
            ))}
          </>
        ) : posts && posts.length > 0 ? (
          <>
            {posts.map((post) => (
              <Post key={post._id} data={post} />
            ))}
            <EndPost />
          </>
        ) : (
          <div className="h-full w-full flex items-center justify-center text-xl font-semibold">
            No post found
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
