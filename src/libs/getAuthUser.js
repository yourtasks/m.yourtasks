import { getServerSession } from "next-auth";
import { connectToDB } from "./database";
import { User } from "@/models/user";

export const getAuthUser = async () => {
  const session = await getServerSession();

  if (!session) {
    return null;
  }

  await connectToDB();

  console.log(session);

  try {
    const user = await User.findOne({
      email: session.user.email,
    })
      .select("username role courses")
      .lean();

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.log(error);

    return null;
  }
};
