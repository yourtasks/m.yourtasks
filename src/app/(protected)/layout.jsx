import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const layout = async ({ children }) => {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
};

export default layout;
