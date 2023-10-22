import React from "react";
import { MdCloudDone } from "react-icons/md";

const EndPost = () => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center opacity-60 font-semibold py-10 no-select">
      <MdCloudDone size={50} />
      <div className="flex flex-col gap-y-1">
        <p className="text-lg">That{"'"}s all for now</p>
        <p className="text-[10px]">Check back later for new posts</p>
      </div>
    </div>
  );
};

export default EndPost;
