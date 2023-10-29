"use client";
import { BsSearch } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import IconButton from "../shared/IconButton";
import useCurrentUser from "@/hooks/useCurrentUser";
import TopSkeleton from "../skeleton/TopSkeleton";
import { useRouter } from "next/navigation";
import { usePostStore } from "@/store/usePostStore";
import { useProfile } from "@/store/useProfile";
import Image from "next/image";

const TopNav = () => {
  const { isOpen, setOpen } = usePostStore();
  const { setOpen: openProfile } = useProfile();
  const router = useRouter();
  const { data: user, isLoading } = useCurrentUser();

  console.log(user);

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
    <div className="fixed z-40 top-0 left-0 w-full py-2 px-4 flex items-center justify-between border-b-2 border-color bg-sky-600">
      <div className="flex gap-x-1">
        <h1 className="text-white text-xl font-semibold tracking-wider">
          YourTasks
        </h1>
        <p className="text-[10px] font-semibold bg-rose-500 text-white rounded-md h-fit px-1">
          Beta
        </p>
      </div>
      {isLoading ? (
        <TopSkeleton />
      ) : (
        <div className="flex items-center gap-x-2 text-white">
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
