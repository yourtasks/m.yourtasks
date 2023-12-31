import { getServerSession } from "next-auth";
import { connectToDB } from "./database";
import { User } from "@/models/user";
import { redirect } from "next/navigation";

export const serverAuth = async (req) => {
  const session = await getServerSession(req);

  if (!session) {
    redirect("/login");
  }

  const emailAddress = session.user.email;
  await connectToDB();

  try {
    const user = await User.findOne({
      email: emailAddress,
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user._doc;
  } catch (error) {
    console.log(error);

    throw new Error("Something went wrong");
  }
};
