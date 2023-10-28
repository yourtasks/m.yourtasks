import AnnouncementSkeleton from "@/components/skeleton/AnnouncementSkeleton";

const loading = () => {
  return (
    <div className="both-space h-full w-full">
      <div className=" overflow-y-auto h-full w-full flex flex-col gap-y-4 p-4">
        <AnnouncementSkeleton />
        <AnnouncementSkeleton />
        <AnnouncementSkeleton />
        <AnnouncementSkeleton />
        <AnnouncementSkeleton />
      </div>
    </div>
  );
};

export default loading;
