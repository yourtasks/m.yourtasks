"use client";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";
import UserListOption from "./option/UserListOption";
import { useState } from "react";

const UserListItem = ({ data }) => {
  const {
    name: { firstname, lastname },
    username,
  } = data;
  const [option, setOption] = useState(false);

  return (
    <div className="relative flex items-center gap-x-4 p-2 rounded-lg no-select click">
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
      </p>
      <div onClick={() => setOption(true)} className="p-2 click rounded-full">
        <BsThreeDotsVertical size={20} />
      </div>
      {option && (
        <UserListOption username={username} setClose={() => setOption(false)} />
      )}
    </div>
  );
};

export default UserListItem;
