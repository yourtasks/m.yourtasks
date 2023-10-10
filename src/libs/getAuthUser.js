import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { connectToDB } from "./database";
import { User } from "@/models/user";

export const getAuthUser = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  await connectToDB();

  try {
    const user = await User.findOne({
      "email.address": session.user.email.address,
    });

    const { password, ...info } = user._doc;

    return info;
  } catch (error) {
    console.log(error);

    return null;
  }
};
