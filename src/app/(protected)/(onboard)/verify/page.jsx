import Verify from "@/components/pages/Verify";
import { getAuthUser } from "@/libs/getAuthUser";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getAuthUser();

  if (user && user.email.isVerified) {
    redirect("/");
  }

  return <Verify />;
};

export default page;
