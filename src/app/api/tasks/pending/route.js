import { protectRoute } from "@/libs/protectRoute";
import { Course } from "@/models/course";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const user = await protectRoute();

  if (!user) {
    return new NextResponse("Access denied", { status: 401 });
  }
  try {
    const pending = await Course.find({ _id: { $in: user.courses } }).select(
      "tasksCount"
    );

    const tasksCount = pending.reduce((acc, item) => acc + item.tasksCount, 0);

    return new NextResponse(JSON.stringify(tasksCount), { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to get pending task count", {
      status: 500,
    });
  }
};
