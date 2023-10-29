"use client";

import { GoHome, GoHomeFill } from "react-icons/go";
import {
  MdOutlineCampaign,
  MdCampaign,
  MdOutlineTask,
  MdTask,
} from "react-icons/md";
import { HiUserGroup, HiOutlineUserGroup } from "react-icons/hi";
import { IoAddCircleOutline, IoAddCircle } from "react-icons/io5";
import Link from "next/link";
import { v4 } from "uuid";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/libs/fetcher";

const BottomNavItem = ({ title, href, Icon, Active, path, big, count }) => {
  const isActive = href === "/" ? path === href : path.includes(href);

  return (
    <Link
      href={href}
      className={`relative no-select no-drag flex flex-col md:flex-row md:justify-center gap-y-2 items-center w-full rounded-md py-2 click`}
    >
      {isActive ? (
        <div className={`text-sky-500 ${big && "text-[40px]"}`}>{Active}</div>
      ) : (
        <div className={`${big && "text-[40px]"}`}>{Icon}</div>
      )}

      {title && (
        <h1
          className={`text-[10px] md:text-sm ${
            isActive && "text-sky-500 font-semibold"
          }`}
        >
          {title}
        </h1>
      )}
      {count > 0 && (
        <div className="absolute top-2 left-[30%] h-4 w-4 bg-red-500 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-zinc-800">
          <p className="text-[8px] font-semibold text-white">{count}</p>
        </div>
      )}
    </Link>
  );
};

export default function BottomNavigation() {
  const { data: tasksCount, isLoading: taskLoading } = useSWR(
    `/api/tasks/pending`,
    fetcher
  );

  const path = usePathname();

  return (
    <div className="color fixed md:static z-40 bottom-0 left-0 w-full flex md:flex-col items-center border-t-[1px] border-color card">
      <BottomNavItem
        path={path}
        href={"/"}
        title={"Home"}
        Icon={<GoHome size={25} />}
        Active={<GoHomeFill size={25} />}
      />
      <BottomNavItem
        path={path}
        href={"/announcements"}
        title={"Notice"}
        Icon={<MdOutlineCampaign size={25} />}
        Active={<MdCampaign size={25} />}
      />
      <BottomNavItem
        count={tasksCount}
        path={path}
        href={"/tasks"}
        title={"Tasks"}
        Icon={<MdOutlineTask size={25} />}
        Active={<MdTask size={25} />}
      />
      <BottomNavItem
        path={path}
        href={"/community"}
        title={"Community"}
        Icon={<HiOutlineUserGroup size={25} />}
        Active={<HiUserGroup size={25} />}
      />
    </div>
  );
}
