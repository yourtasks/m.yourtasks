import CreateTask from "@/components/pages/CreateTask";
import { getAuthUser } from "@/libs/getAuthUser";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getAuthUser();
  user.role === "user" && redirect("/");
  user.role === "moderator" && redirect("/");

  return <CreateTask />;
};

export default page;
