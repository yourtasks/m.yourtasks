import Loading from "@/components/pages/Loading";
import Login from "@/components/pages/Login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession();

  if (session) {
    <Loading />;
    redirect("/");
  }

  return <Login />;
};

export default page;
