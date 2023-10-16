import Onboard from "@/components/pages/Onboard";
import { getAuthUser } from "@/libs/getAuthUser";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getAuthUser();

  console.log();

  if (!user) {
    redirect("/login");
  }

  if (user.studentInformation.courses.length > 0) {
    if (user.role === "admin") {
      return;
    }

    redirect("/");
  }

  return <Onboard />;
};

export default page;
