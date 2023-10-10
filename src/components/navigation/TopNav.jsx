"use client";
import { BsSearch } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import IconButton from "../shared/IconButton";
import Avatar from "../shared/Avatar";
import useCurrentUser from "@/hooks/useCurrentUser";
import TopSkeleton from "../skeleton/TopSkeleton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const TopNav = () => {
  const router = useRouter();
  const { data: user, isLoading } = useCurrentUser();

  const canPost = user && (user.role === "admin" || user.role === "cr");

  // useEffect(() => {
  //   if (!isLoading) {
  //     user &&
  //       !user.email.isVerified &&
  //       router.push(`/${user.username}//verify-token`);
  //   }
  // }, [isLoading, user, router]);

  return (
    <div className="fixed top-0 left-0 w-full py-2 px-4 flex items-center justify-between border-b-2 border-color">
      <h1 className="text-sky-500 text-xl font-semibold tracking-wider">
        YourTasks
      </h1>
      {isLoading ? (
        <TopSkeleton />
      ) : (
        <div className="flex items-center gap-x-2">
          {canPost && (
            <IconButton>
              <MdAdd size={25} />
            </IconButton>
          )}
          <IconButton>
            <BsSearch size={25} />
          </IconButton>
          <IconButton>
            <Avatar imageUrl={"/profile-avatar.jpg"} />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default TopNav;
