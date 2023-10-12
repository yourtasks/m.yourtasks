import { getAuthUser } from "@/libs/getAuthUser";
import { redirect } from "next/navigation";

const layout = async ({ children }) => {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "admin") {
    redirect("/");
  }

  return <>{children}</>;
};

export default layout;
