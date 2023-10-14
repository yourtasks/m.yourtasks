"use client";
import { AnnouncementCard } from "@/components/announcement/AnnouncementCard";
import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";

const Page = () => {
  const { data: posts, isLoading } = useSWR(`/api/announcements`, fetcher);

  return (
    <div className="h-full w-full both-space">
      <div className="p-4 h-full overflow-y-auto flex flex-col gap-y-2">
        {isLoading ? (
          <div className="flex flex-col gap-y-4">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="h-[100px] skeleton shadow-md rounded-lg"
              />
            ))}
          </div>
        ) : (
          posts &&
          posts.map((post) => <AnnouncementCard key={post._id} data={post} />)
        )}
      </div>
    </div>
  );
};

export default Page;
