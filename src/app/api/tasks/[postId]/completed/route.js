import { protectRoute } from "@/libs/protectRoute";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";

export const PUT = async (request, { params }) => {
  const { postId } = params;
  const user = await protectRoute();

  try {
    const task = await Task.findByIdAndUpdate(postId, {
      $addToSet: { hasCompleted: user._id },
    });

    console.log(task);

    return new NextResponse(JSON.stringify(task), { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to mark as done", { status: 500 });
  }
};
