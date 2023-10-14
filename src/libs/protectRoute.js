import { User } from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const protectRoute = async () => {
  const session = await getServerSession();

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const currentUser = await User.findOne({
      "email.address": session.user.email.address,
    });

    const { password, ...info } = currentUser._doc;

    return info;
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to get user credentials", {
      status: 500,
    });
  }
};
