import Image from "next/image";
import React from "react";
import { MdVerified } from "react-icons/md";

const Seperator = () => {
  return <div className="h-6 w-[2px] invert-bg opacity-50" />;
};

const Profile = () => {
  return (
    <div className="w-full h-full both-space flex flex-col gap-y-2">
      <div className="p-4 card w-full flex flex-col gap-y-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <div>
              <div className="h-20 w-20 relative">
                <Image
                  src={"/profile-avatar.jpg"}
                  alt="profile"
                  className="object-cover rounded-full"
                  fill
                />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold opacity-60">mofazzal</p>
              <div className="flex items-center gap-x-2">
                <h1 className="font-semibold">Md Mofazzal Hossain</h1>
                <div className="text-sky-500">
                  <MdVerified size={20} />
                </div>
              </div>
              <div className="my-4">
                <button className="capitalize font-semibold text-xs px-2 py-2 invert-bg bg-opacity-10 dark:bg-opacity-10 rounded-md">
                  Edit profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-around">
          <div className="flex flex-col gap-y-2 items-center font-semibold">
            <p className="text-lg">15</p>
            <p className="text-xs opacity-70">Posts</p>
          </div>
          <Seperator />
          <div className="flex flex-col gap-y-2 items-center font-semibold">
            <p className="text-lg">15</p>
            <p className="text-xs opacity-70">Likes</p>
          </div>
          <Seperator />
          <div className="flex flex-col gap-y-2 items-center font-semibold">
            <p className="text-lg">15</p>
            <p className="text-xs opacity-70">Reports</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
