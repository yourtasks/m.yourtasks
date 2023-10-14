import moment from "moment";
import Image from "next/image";
import React from "react";
import { BsEyeFill } from "react-icons/bs";

export const AnnouncementCard = ({ data }) => {
  const { title, description, createdAt, owner, seen, source } = data;

  return (
    <div className="flex flex-col card rounded-lg no-select">
      <div className="flex flex-col gap-y-1 click p-4 rounded-lg">
        <p className="text-xs font-semibold opacity-50">
          {moment(createdAt).format("DD MMMM YYYY") + " • seen by 16"}
        </p>
        <h1 className="font-semibold line-clamp-2">{`${source.section.toUpperCase()} ${
          source.name
        } - ${title}`}</h1>
        <p className="text-sm font-medium line-clamp-3 opacity-80">
          {description}
        </p>
      </div>
      <div className="flex items-center justify-between p-2">
        <div className="w-fit flex items-center gap-x-2 click p-2 rounded-lg">
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
              {`${owner.name.firstname} ${owner.name.lastname}`}
            </p>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-end gap-x-2 opacity-70 click px-4 py-2 rounded-lg">
            <BsEyeFill size={15} />
            <p className="text-xs font-semibold">{seen.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
