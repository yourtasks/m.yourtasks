import { getAuthUser } from "@/libs/getAuthUser";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await getAuthUser();

  console.log(user);

  if (user && !user.email.isVerified) {
    redirect("/verify");
  }

  return <div className="w-full h-full pt-[100px]">Home</div>;
};

export default Page;
