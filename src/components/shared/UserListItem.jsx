"use client";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";
import UserListOption from "./option/UserListOption";
import { useState } from "react";

const UserListItem = ({ data }) => {
  const {
    name: { firstname, lastname },
    username,
    role,
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
        <span
          className={`mx-2 px-2 py-1 text-xs font-semibold text-white rounded-md ${
            role === "admin"
              ? "bg-green-500"
              : role === "cr"
              ? "bg-blue-500"
              : "bg-black bg-opacity-30"
          }`}
        >
          {role}
        </span>
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
