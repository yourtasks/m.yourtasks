"use client";
import HeaderBack from "@/components/shared/HeaderBack";
import SearchBar from "@/components/shared/SearchBar";
import UserListItem from "@/components/shared/UserListItem";
import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";

const Page = () => {
  const { data: users, isLoading } = useSWR(`/api/users`, fetcher);

  return (
    <div className="w-full h-full overflow-hidden">
      <HeaderBack title="All users" />
      <SearchBar />
      <div className="px-4 h-full w-full">
        <div className="h-4/6 w-full overflow-y-auto card p-2 flex flex-col gap-y-1">
          {users &&
            users.map((user) => <UserListItem key={user._id} data={user} />)}
        </div>
      </div>
    </div>
  );
};

export default Page;
