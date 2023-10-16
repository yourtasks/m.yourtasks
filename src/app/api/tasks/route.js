import { getAuthUser } from "@/libs/getAuthUser";
import { protectRoute } from "@/libs/protectRoute";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const user = await protectRoute();
  console.log(user._id);
  const coursesId = user.studentInformation.courses.map((course) => course);

  try {
    const tasks = await Task.find({
      source: { $in: coursesId },
      hasCompleted: { $nin: [user._id] },
    })
      .populate("source owner")
      .sort({
        deadline: -1,
      });

    if (!tasks) {
      return new NextResponse("Task not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to get tasks", { status: 500 });
  }
};

export const POST = async (request) => {
  const { title, description, deadline, course } = await request.json();

  const user = await getAuthUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 400 });
  }

  try {
    const task = await Task.create({
      title,
      description,
      deadline,
      source: course,
      owner: user._id,
    });

    return new NextResponse(JSON.stringify(task), { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to create task", { status: 500 });
  }
};
