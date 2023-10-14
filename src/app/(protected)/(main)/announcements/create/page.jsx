import CreateAnnouncement from "@/components/pages/CretaeAnnouncement";
import { getAuthUser } from "@/libs/getAuthUser";

const page = async () => {
  const user = await getAuthUser();

  if ((user && user.role === "cr") || user.role === "admin")
    return <CreateAnnouncement />;
};

export default page;
