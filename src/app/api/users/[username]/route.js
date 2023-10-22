import { getAuthUser } from "@/libs/getAuthUser";
import { Announcement } from "@/models/announcement";
import { Course } from "@/models/course";
import { Task } from "@/models/task";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const user = await getAuthUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 400 });
  }

  try {
    const user = await User.findOne({ username: params.username });

    console.log(user);

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to get the user by username", {
      status: 500,
    });
  }
};

export const DELETE = async (request, { params }) => {
  const { username } = params;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return new NextResponse("User does not exists", { status: 404 });
    }

    if (user.role === "cr" || user.role === "moderator") {
      const announcements = await Announcement.find({ owner: user._id });

      if (announcements && announcements.length > 0) {
        await Announcement.deleteMany({ owner: user._id });
      }

      const tasks = await Task.find({ owner: user._id });

      if (tasks && tasks.length > 0) {
        await Task.deleteMany({ owner: user._id });
      }
    }

    await User.findByIdAndDelete(user._id);

    return new NextResponse("User has been deleted", { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to delete the user", { status: 500 });
  }
};
