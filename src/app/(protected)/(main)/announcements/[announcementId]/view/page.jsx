"use client";

import CommentBar from "@/components/posts/shared/CommentBar";
import CommentList from "@/components/posts/shared/CommentList";
import PostContainer from "@/components/posts/shared/Container";
import Description from "@/components/posts/shared/Description";
import Footer from "@/components/posts/shared/Footer";
import PostHeader from "@/components/posts/shared/Header";
import Title from "@/components/posts/shared/Title";
import HeaderBack from "@/components/shared/HeaderBack";
import PostSkeleton from "@/components/skeleton/PostSkeleton";
import { fetcher } from "@/libs/fetcher";
import axios from "axios";
import toast from "react-hot-toast";
import useSWR from "swr";

const Page = ({ params }) => {
  console.log(params.announcementId);
  const {
    data: post,
    isLoading,
    mutate,
  } = useSWR(`/api/announcements/${params.announcementId}`, fetcher);

  const handleLike = async (commentId) => {
    try {
      const { data } = await axios.put(`/api/comments/${commentId}/like`);
      console.log(data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to like comment");
    }
  };

  const handleDislike = async (commentId) => {
    try {
      const { data } = await axios.put(`/api/comments/${commentId}/dislike`);
      console.log(data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to like comment");
    }
  };

  return (
    <div className="pb-[56px] w-full h-full overflow-y-auto flex flex-col gap-y-2">
      <HeaderBack
        title={`${
          post ? post.owner.name.firstname : "A person"
        }'s announcement`}
      />
      {isLoading ? (
        <PostSkeleton />
      ) : (
        post && (
          <>
            <PostContainer>
              <PostHeader
                createdAt={post.createdAt}
                owner={post.owner}
                postId={post._id}
                type={post.type}
              />
              <div className="p-2">
                <div className="px-2 py-2 click no-select rounded-lg">
                  <Title>{post.title}</Title>
                  <Description>{post.description}</Description>
                </div>
              </div>
              <Footer
                seen={post.seen}
                postId={post._id}
                likes={post.likes}
                comments={post.comments}
                shares={post.shares}
              />
            </PostContainer>
            <CommentList
              apiUrl={`/api/announcements/${post._id}/comments`}
              handleLike={handleLike}
              handleDislike={handleDislike}
            />
            <CommentBar
              apiUrl={`/api/announcements/${post._id}/comments`}
              mutate={mutate}
            />
          </>
        )
      )}
    </div>
  );
};

export default Page;
