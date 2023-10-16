"use client";

import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";

const Page = ({ params }) => {
  console.log(params.announcementId);
  const { data: post, isLoading } = useSWR(
    `/api/announcements/${params.announcementId}`,
    fetcher
  );

  console.log(post);
  return <div>Page</div>;
};

export default Page;
