import { getServerSession } from "next-auth";
import { connectToDB } from "./database";
import { NextResponse } from "next/server";
import { User } from "@/models/user";
import { redirect } from "next/navigation";

export const serverAuth = async (req) => {
  const session = await getServerSession(req);

  if (!session) {
    redirect("/login");
  }

  const emailAddress = session.user.email.address;
  await connectToDB();

  try {
    const user = await User.findOne({
      "email.address": emailAddress,
    });

    return user._doc;
  } catch (error) {
    console.log(error);

    throw new NextResponse("Something went wrong");
  }
};
