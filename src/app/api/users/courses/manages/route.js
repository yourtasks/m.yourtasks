import { protectRoute } from "@/libs/protectRoute";
import { Course } from "@/models/course";
import { NextResponse } from "next/server";

export const GET = async () => {
  const user = await protectRoute();

  const isAdmin = user.role === "admin";

  try {
    const courses = await Course.find(
      isAdmin ? {} : { cr: { $in: user._id } }
    ).select("name code roomCode section");

    return new NextResponse(JSON.stringify(courses), { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to get manage courses", { status: 500 });
  }
};
