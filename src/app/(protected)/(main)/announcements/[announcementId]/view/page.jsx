"use client";

import CommentBar from "@/components/comment/CommentBar";
import CommentList from "@/components/comment/CommentList";
import Announcement from "@/components/posts/Announcement";
import Container from "@/components/posts/shared/Container";
import PostContainer from "@/components/posts/shared/Container";
import Description from "@/components/posts/shared/Description";
import Footer from "@/components/posts/shared/Footer";
import PostHeader from "@/components/posts/shared/Header";
import Title from "@/components/posts/shared/Title";
import HeaderBack from "@/components/shared/HeaderBack";
import PostSkeleton from "@/components/skeleton/PostSkeleton";
import { fetcher } from "@/libs/fetcher";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

const Page = ({ params }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const {
    data: post,
    isLoading: loadingPost,
    mutate,
    error,
  } = useSWR(
    hydrated ? `/api/announcements/${params.announcementId}` : null,
    fetcher
  );

  const handleLike = async (commentId) => {
    try {
      await axios.put(`/api/comments/${commentId}/like`);
    } catch (error) {
      console.log(error);

      toast.error("Failed to like comment");
    }
  };

  const handleDislike = async (commentId) => {
    try {
      await axios.put(`/api/comments/${commentId}/dislike`);
    } catch (error) {
      console.log(error);

      toast.error("Failed to like comment");
    }
  };

  return (
    <div className="h-full w-full flex-col gap-y-2 overflow-y-auto">
      <HeaderBack title={`A Person's announcement`} />
      {loadingPost ? (
        <PostSkeleton />
      ) : (
        post && (
          <>
            <Container>
              <PostHeader
                createdAt={post.createdAt}
                owner={post.owner}
                postId={post._id}
                type={post.type}
              />
              <Announcement
                title={post.title}
                description={post.description}
                source={post.source}
                owner={post.owner}
              />
              <Footer
                postId={post._id}
                likes={post.likes}
                comments={post.comments}
                shares={post.shares}
              />
            </Container>
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
