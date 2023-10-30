import { protectRoute } from "@/libs/protectRoute";
import { Course } from "@/models/course";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const user = await protectRoute();

  if (!user) {
    return new NextResponse("Access denied", { status: 401 });
  }
  try {
    const tasks = await Task.find({
      source: { $in: user.courses },
      hasCompleted: { $nin: [user._id] },
    }).select("_id");
    const pending = tasks.length;

    return new NextResponse(JSON.stringify(pending), { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to get pending task count", {
      status: 500,
    });
  }
};
