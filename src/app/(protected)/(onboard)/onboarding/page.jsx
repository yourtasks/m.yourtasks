import Onboard from "@/components/pages/Onboard";
import { getAuthUser } from "@/libs/getAuthUser";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getAuthUser();

  console.log();

  if (user && user.studentInformation.courses.length > 0) {
    redirect("/");
  }

  return <Onboard />;
};

export default page;
