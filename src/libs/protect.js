import { redirect } from "next/navigation";
import { getAuthUser } from "./getAuthUser";

export const protect = async () => {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  if (!user.courses.length > 0) {
    if (user.role === "admin") {
      return;
    }
    redirect("/course-selection");
  }
};
