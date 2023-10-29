import { getAuthUser } from "@/libs/getAuthUser";
import { protectRoute } from "@/libs/protectRoute";
import { Course } from "@/models/course";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const user = await protectRoute();
  const currentDate = new Date();

  try {
    const tasks = await Task.find({
      source: { $in: user.courses },
      hasCompleted: { $nin: [user._id] },
    })
      .populate({ path: "source", select: "name code section" })
      .populate({
        path: "owner",
        select: "username name profileInformation.badges",
      })
      .sort({
        deadline: 1,
      })
      .select("type source owner title deadline hasCompleted createdAt seen");

    if (!tasks) {
      return new NextResponse("Task not found", { status: 404 });
    }

    const futureTasks = tasks.filter((task) => {
      if (task.deadline >= currentDate) {
        return task;
      }
    });

    const deadTasks = tasks.filter((task) => {
      if (task.deadline < currentDate) {
        return task;
      }
    });

    deadTasks.sort((a, b) => b.deadline - a.deadline);

    const allTasks = futureTasks.concat(deadTasks);

    return new NextResponse(JSON.stringify(allTasks), { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to get tasks", { status: 500 });
  }
};

export const POST = async (request) => {
  const { title, description, deadline, course } = await request.json();

  const user = await protectRoute();

  try {
    if (course === "all") {
      return new NextResponse("Cannot create same tasks for all section", {
        status: 400,
      });
    }

    const task = await Task.create({
      title,
      description,
      deadline,
      source: course,
      owner: user._id,
    });

    await Course.findByIdAndUpdate(course, {
      $addToSet: { tasks: task._id },
      $inc: { tasksCount: 1 },
    });

    return new NextResponse(JSON.stringify(task), { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to create task", { status: 500 });
  }
};

export const PUT = async (request) => {
  const { tasks } = await request.json();

  const user = await protectRoute();

  try {
    await Task.updateMany(
      { _id: { $in: tasks } },
      { $addToSet: { hasCompleted: user._id } }
    );

    return new NextResponse("Task marked as completed", { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to mark as completed", { status: 500 });
  }
};
