"use client";

import CommentList from "@/components/posts/shared/CommentList";
import PostContainer from "@/components/posts/shared/Container";
import Description from "@/components/posts/shared/Description";
import Footer from "@/components/posts/shared/Footer";
import PostHeader from "@/components/posts/shared/Header";
import Title from "@/components/posts/shared/Title";
import PostSkeleton from "@/components/skeleton/PostSkeleton";
import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";

const Page = ({ params }) => {
  console.log(params.announcementId);
  const { data: post, isLoading } = useSWR(
    `/api/announcements/${params.announcementId}`,
    fetcher
  );

  const {
    createdAt,
    title,
    description,
    seen,
    likes,
    comments,
    shares,
    owner,
    _id,
    type,
  } = post ? post : {};

  console.log(post);
  return (
    <div className="both-space w-full h-full overflow-y-auto flex flex-col gap-y-2">
      {isLoading ? (
        <PostSkeleton />
      ) : (
        type && (
          <>
            <PostContainer>
              <PostHeader
                createdAt={createdAt}
                owner={owner}
                postId={_id}
                type={type}
              />
              <div className="p-2">
                <div className="px-2 py-2 click no-select rounded-lg">
                  <Title>{title}</Title>
                  <Description>{description}</Description>
                </div>
              </div>
              <Footer
                seen={seen}
                postId={_id}
                likes={likes}
                comments={comments}
                shares={shares}
              />
            </PostContainer>
            <CommentList />
          </>
        )
      )}
    </div>
  );
};

export default Page;
