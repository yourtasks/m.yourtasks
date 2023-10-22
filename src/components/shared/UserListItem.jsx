"use client";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";
import UserListOption from "./option/UserListOption";
import { useState } from "react";
import {
  MdDeleteOutline,
  MdOutlineAddModerator,
  MdOutlineCampaign,
} from "react-icons/md";
import Option from "./option/Option";
import OptionItem from "../modal/option/OptionItem";
import { BiFlag } from "react-icons/bi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { mutate } from "swr";

const UserListItem = ({ data }) => {
  const router = useRouter();
  const {
    name: { firstname, lastname },
    username,
    role,
  } = data;
  const [option, setOption] = useState(false);

  const isCR = role === "cr";
  const isMOD = role === "moderator";
  const isUser = role === "user";
  const isAdmin = role === "admin";

  const handleOpen = () => {
    setOption(true);
  };

  const handleClose = () => {
    setOption(false);
  };

  const makeCR = () => {
    router.push(`users/${username}/make-cr`);
    handleClose();
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`/api/users/${username}`);

      toast.success("User has been deleted");
      await mutate(`/api/users`);
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error("Couldn't delete the user");
    }
  };

  return (
    <div className="relative flex items-center gap-x-4 p-2 rounded-lg no-select">
      <div className="w-full flex items-center gap-x-2 invert-bg bg-opacity-0 dark:bg-opacity-0 group-active:bg-opacity-10 click p-2 rounded-lg">
        <div>
          <div className="relative h-8 w-8">
            <Image
              src={"/profile-avatar.jpg"}
              alt="profile"
              fill
              className="object-cover rounded-full"
            />
          </div>
        </div>
        <p className="text-sm font-semibold opacity-70 w-full">
          {`${firstname} ${lastname}`}
          <span
            className={`mx-2 px-2 py-1 text-xs font-semibold text-white rounded-md ${
              role === "admin"
                ? "bg-sky-500"
                : role === "cr"
                ? "bg-blue-500"
                : "bg-black bg-opacity-30"
            }`}
          >
            {role}
          </span>
        </p>
      </div>
      {!isAdmin && (
        <Option isOpen={option} setClose={handleClose} setOpen={handleOpen}>
          {!isMOD && (
            <OptionItem
              Icon={<MdOutlineAddModerator size={20} />}
              title="Make MOD"
              setClose={handleClose}
            />
          )}
          {!isCR && (
            <OptionItem
              Icon={<MdOutlineCampaign size={20} />}
              title="Make CR"
              setClose={makeCR}
            />
          )}
          <OptionItem
            Icon={<BiFlag size={20} />}
            title="Suspend"
            setClose={handleClose}
          />
          <OptionItem
            Icon={<MdDeleteOutline size={20} />}
            title="delete"
            setClose={deleteUser}
          />
        </Option>
      )}
    </div>
  );
};

export default UserListItem;
