import Login from "@/components/pages/Login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession();

  console.log(session);

  if (session) {
    redirect("/");
  }

  return <Login />;
};

export default page;
