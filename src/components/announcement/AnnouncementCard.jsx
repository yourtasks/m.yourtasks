"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import React, { useEffect } from "react";
import { BsDot, BsEyeFill } from "react-icons/bs";
import useSWR from "swr";
import CardButton from "./CardButton";
import {
  BiHeart,
  BiSolidHeart,
  BiCommentDetail,
  BiShare,
  BiCheckCircle,
} from "react-icons/bi";
import Link from "next/link";

export const AnnouncementCard = ({ data }) => {
  const { data: user } = useCurrentUser();
  const { title, description, createdAt, owner, seen, source, _id } = data;

  useEffect(() => {
    const viewed = async () => {
      try {
        await axios.put(`/api/announcements/${_id}/view`);
      } catch (error) {
        console.log(error);
      }
    };
    user && !seen.includes(user._id) && viewed();
  }, [seen, user, _id]);

  return (
    <div className="flex flex-col card rounded-lg no-select">
      <Link
        href={`/announcements/${_id}/view`}
        className="flex flex-col gap-y-1 click p-4 rounded-lg"
      >
        <div className="flex items-center gap-x-2 text-xs font-medium opacity-50">
          <p className="">{moment(createdAt).format("DD MMMM YY")}</p>
          <BsDot size={16} />
          <p>seen {15}</p>
        </div>
        <h1 className="font-semibold line-clamp-2">{`${source.section.toUpperCase()} ${
          source.name
        } - ${title}`}</h1>
        <p className="text-sm font-medium line-clamp-2 opacity-80">
          {description}
        </p>
      </Link>
      <div className="flex items-center justify-between p-2">
        <Link
          href={`/${user.username}`}
          className="w-fit flex items-center gap-x-2 click p-2 rounded-lg"
        >
          <div>
            <div className="h-8 w-8 relative">
              <Image
                src={"/profile-avatar.jpg"}
                alt="profile"
                fill={true}
                className="object-cover rounded-full"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-[10px] font-semibold opacity-50">posted by</p>
            <p className="text-xs font-semibold opacity-80">
              {`${owner.firstname} ${owner.lastname}`}
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-x-2">
          <CardButton count={10} Icon={<BiShare size={25} />} />
        </div>
      </div>
    </div>
  );
};
