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
import { usePostStore } from "@/store/usePostStore";
import { useProfile } from "@/store/useProfile";
import Image from "next/image";

const TopNav = () => {
  const { isOpen, setOpen } = usePostStore();
  const { setOpen: openProfile } = useProfile();
  const router = useRouter();
  const { data: user, isLoading } = useCurrentUser();

  const canPost = user && (user.role === "admin" || user.role === "cr");

  const handleAdd = () => {
    setOpen();
  };

  // useEffect(() => {
  //   if (!isLoading) {
  //     user &&
  //       !user.email.isVerified &&
  //       router.push(`/${user.username}//verify-token`);
  //   }
  // }, [isLoading, user, router]);

  return (
    <div className="fixed z-40 top-0 left-0 w-full py-2 px-4 flex items-center justify-between border-b-2 border-color card">
      <div className="flex gap-x-1">
        <h1 className="text-sky-500 text-xl font-semibold tracking-wider">
          YourTasks
        </h1>
        <p className="text-[10px] font-semibold bg-sky-500 text-white rounded-md h-fit px-1">
          Beta
        </p>
      </div>
      {isLoading ? (
        <TopSkeleton />
      ) : (
        <div className="flex items-center gap-x-2">
          {canPost && (
            <IconButton onClick={handleAdd}>
              <MdAdd size={25} />
            </IconButton>
          )}
          <IconButton>
            <BsSearch size={25} />
          </IconButton>
          <IconButton onClick={openProfile}>
            <div className="h-7 w-7 relative">
              <Image
                src={`/profile-avatar.jpg`}
                alt="profile"
                fill={true}
                className="bg-cover rounded-full"
              />
            </div>
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default TopNav;
