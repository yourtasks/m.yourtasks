"use client";

import OptionItem from "@/components/modal/option/OptionItem";
import Option from "@/components/shared/option/Option";
import useCurrentUser from "@/hooks/useCurrentUser";
import moment from "moment/moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiEditAlt, BiFlag, BiLink, BiSolidBadgeCheck } from "react-icons/bi";

const Header = ({ createdAt, owner, postId, type }) => {
  const router = useRouter();
  const { data: user } = useCurrentUser();
  const [show, setShow] = useState(false);
  const isOwner = user && owner._id === user._id;

  const showOption = () => {
    setShow(true);
  };

  const hideOption = () => {
    setShow(false);
  };

  const handleEdit = () => {
    router.push(`/announcements/${postId}`);
  };

  const { firstname, lastname, username } = owner;

  const postTime = moment(createdAt).fromNow();

  return (
    <div className="relative w-full px-3 flex items-center justify-between no-select">
      <div className="flex items-center gap-x-1">
        <div>
          <div className="relative h-10 w-10">
            <Image
              src={"/profile-avatar.jpg"}
              alt="profile"
              fill={true}
              className="overflow-hidden rounded-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="text-xs flex w-full flex-wrap items-center gap-x-1">
            <Link
              href={`/${username}`}
              className="font-semibold px-1 rounded-md click"
            >{`${firstname} ${lastname}`}</Link>
            <div className="text-sky-500">
              <BiSolidBadgeCheck size={16} />
            </div>
          </div>
          <p className="font-medium text-[10px] opacity-70 px-1">{postTime}</p>
        </div>
      </div>
      <Option
        size={20}
        isOpen={show}
        setClose={hideOption}
        setOpen={showOption}
      >
        {isOwner && (
          <OptionItem
            title="Edit"
            Icon={<BiEditAlt size={25} />}
            setClose={handleEdit}
          />
        )}
        <OptionItem
          title="Copy link"
          Icon={<BiLink size={25} />}
          setClose={hideOption}
        />
        <OptionItem
          title="Report"
          Icon={<BiFlag size={25} />}
          setClose={hideOption}
        />
      </Option>
    </div>
  );
};

export default Header;
