import { redirect } from "next/navigation";
import { getAuthUser } from "./getAuthUser";

export const protect = async () => {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }
  if (!user.email.isVerified) {
    redirect("/verify");
  }

  if (!user.studentInformation.courses.length > 0) {
    redirect("/onboarding");
  }
};
