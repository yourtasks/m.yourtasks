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
      email: session.user.email,
    })
      .select(
        "username firstname lastname email gender role studentId courses profilePicture maxCourse"
      )
      .lean();

    return currentUser;
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to get user credentials", {
      status: 500,
    });
  }
};
