"use client";
import { useProfile } from "@/store/useProfile";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { BsPersonAdd, BsPersonUp, BsPostcard } from "react-icons/bs";
import { MdOutlineAssignmentInd, MdOutlineSecurity } from "react-icons/md";
import { LiaBookMedicalSolid } from "react-icons/lia";
import { RxAvatar } from "react-icons/rx";
import { BiBookAlt, BiHelpCircle, BiLogOut } from "react-icons/bi";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/libs/fetcher";
const List = ({ children }) => {
  return <div className="w-full flex flex-col gap-y-2">{children}</div>;
};

const ButtonItem = ({ title, Icon, onClick, red, link }) => {
  const { setClose } = useProfile();
  const router = useRouter();
  const handleClick = () => {
    if (link) {
      router.push(link);
      setClose();
      return;
    }
    onClick();
    setClose();
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-x-2 p-4 w-full rounded-lg border-[1px] click no-select ${
        red && "text-red-500 border-red-500 bg-red-500 bg-opacity-5"
      }`}
    >
      <div>{Icon}</div>
      <p className="capitalize text-start text-xs font-semibold w-full">
        {title}
      </p>
    </button>
  );
};

const Seperator = ({ title }) => {
  return (
    <div className="flex items-center w-full gap-x-2 opacity-50 py-2">
      <p className="capitalize text-xs font-semibold">{title}</p>
    </div>
  );
};

const ProfileModal = () => {
  const { data: user } = useSWR(`/api/current`, fetcher);

  const router = useRouter();
  const { isOpen, setClose } = useProfile();

  if (isOpen)
    return (
      <div className="fixed top-0 right-0 w-full h-full z-50 overflow-hidden">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setClose();
          }}
          className="fixed top-0 left-0 w-full h-full invert-bg opacity-30"
        />
        <div className="absolute z-10 top-0 right-0 h-full w-3/5 card overflow-y-auto px-2 no-select">
          <div className="w-full flex items-center gap-x-2 click p-2 rounded-lg my-2">
            <div className="relative h-14 w-14 p-2 rounded-lg">
              <Image
                src={"/profile-avatar.jpg"}
                alt="profile"
                fill={true}
                className="object-cover rounded-full"
              />
            </div>
            {user && (
              <p className="text-sm font-medium">
                {user.name.firstname + " " + user.name.lastname}
              </p>
            )}
          </div>
          <div></div>
          <Seperator title="Profile" />
          <List>
            <ButtonItem title="Your posts" Icon={<BsPostcard size={20} />} />
            <ButtonItem
              title="Your courses"
              Icon={<BiBookAlt size={20} />}
              link="/courses"
            />
          </List>
          {user && user.role === "admin" && (
            <>
              <Seperator title="Admin Panel" />
              <List>
                <ButtonItem
                  title="Add new course"
                  link="/courses/create"
                  Icon={<LiaBookMedicalSolid size={20} />}
                />
                <ButtonItem
                  title="Add new user"
                  Icon={<BsPersonAdd size={20} />}
                  link="/users"
                />
                <ButtonItem
                  title="Assign role"
                  onClick={() => router.push("/users")}
                  Icon={<MdOutlineAssignmentInd size={20} />}
                />
              </List>
            </>
          )}
          <Seperator title="Settings & privacy" />
          <List>
            <ButtonItem
              title="Personal & account"
              Icon={<RxAvatar size={20} />}
            />
            <ButtonItem
              title="password & security"
              Icon={<MdOutlineSecurity size={20} />}
            />
            <ButtonItem
              title="Reuqest for a Role"
              Icon={<BsPersonUp size={20} />}
            />
          </List>

          <Seperator title="help & support" />
          <List>
            <ButtonItem title="Help" Icon={<BiHelpCircle size={20} />} />
          </List>
          <div className="py-4">
            <ButtonItem
              red
              onClick={signOut}
              title="Log out"
              Icon={<BiLogOut size={20} />}
            />
          </div>
        </div>
      </div>
    );
};

export default ProfileModal;
