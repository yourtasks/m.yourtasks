import Verify from "@/components/pages/Verify";
import { getAuthUser } from "@/libs/getAuthUser";
import { redirect } from "next/navigation";

const page = async ({ params }) => {
  const user = await getAuthUser();

  if (user) {
    redirect("/");
  }

  return <Verify studentId={params.studentId} />;
};

export default page;
