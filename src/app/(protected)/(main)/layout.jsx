import { getAuthUser } from "@/libs/getAuthUser";
import { protect } from "@/libs/protect";
import { redirect } from "next/navigation";

const layout = async ({ children }) => {
  await protect();

  return <>{children}</>;
};

export default layout;
