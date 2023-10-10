"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

const Page = () => {
  const url = process.env.NEXT_PUBLIC_SITE_URL;

  console.log(url);

  const { data: user } = useCurrentUser();

  console.log(user);

  return (
    <div className="w-full h-full pt-[100px]">
      Home
      {user && <button onClick={signOut}>Sign out</button>}
    </div>
  );
};

export default Page;
