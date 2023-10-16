"use client";
import { fetcher } from "@/libs/fetcher";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useSWR from "swr";

const NavItem = ({ title, path, link }) => {
  return (
    <Link
      href={link}
      className={`w-full py-2 text-center border-b-4  ${
        path === link
          ? "font-semibold text-sky-500 border-sky-500"
          : "border-transparent"
      }`}
    >
      {title}
    </Link>
  );
};

const TaskNav = () => {
  const { data: tasks, isLoading } = useSWR(`/api/tasks`, fetcher);
  const path = usePathname();

  if (path === "/tasks" || path === "/tasks/completed")
    return (
      <div className="fixed flex items-center w-full card overflow-hidden z-40">
        <NavItem
          title={isLoading ? "Pending" : `Pending (${tasks.length})`}
          path={path}
          link={"/tasks"}
        />
        <NavItem title="Completed" path={path} link={"/tasks/completed"} />
      </div>
    );

  return null;
};

export default TaskNav;
