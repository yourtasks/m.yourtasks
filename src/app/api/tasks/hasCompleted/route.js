import { protectRoute } from "@/libs/protectRoute";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const user = await protectRoute();

  try {
    const completedTasks = await Task.find({
      source: { $in: user.studentInformation.courses },
      hasCompleted: { $in: user._id },
    })
      .populate("owner source")
      .sort({ deadline: -1 });

    return new NextResponse(JSON.stringify(completedTasks), { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to get completed tasks", { status: 500 });
  }
};
