import { redirect } from "next/navigation";
import { getAuthUser } from "./getAuthUser";

export const protect = async () => {
  const user = await getAuthUser();

  console.log("proctec");

  if (!user) {
    redirect("/");
    return null;
  }
  if (!user.email.isVerified) {
    redirect("/verify");
    return null;
  }

  if (!user.studentInformation.studentId) {
    redirect("/onboarding");
    return null;
  }
};
