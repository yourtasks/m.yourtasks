import { getAuthUser } from "@/libs/getAuthUser";
import { protectRoute } from "@/libs/protectRoute";
import { Announcement } from "@/models/announcement";
import { Course } from "@/models/course";
import { User } from "@/models/user";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const user = await protectRoute();

  if (!user) {
    return new NextResponse("Access denied", { status: 401 });
  }

  try {
    const announcements = await Announcement.find({
      source: { $in: user.courses },
    })
      .populate({
        path: "owner",
        select: "username firstname lastname role badges profilePicture",
      })
      .populate({ path: "source", select: "code section name" })
      .sort({ createdAt: -1 })
      .select(
        "type source owner title description seen seenCount likes likesCount commentsCount sharesCount"
      );

    return new NextResponse(JSON.stringify(announcements), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to get the posts", { status: 500 });
  }
};

export const POST = async (request) => {
  const { title, description, course } = await request.json();

  const user = await protectRoute();

  try {
    const newAnn = await Announcement.create({
      title,
      description,
      owner: user._id,
      source: course,
    });

    await Course.findByIdAndUpdate(course, {
      $addToSet: { announcements: newAnn._id },
      $inc: { announcementsCount: 1 },
    });

    return new NextResponse("Post created successfully", { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to create announcement", { status: 500 });
  }
};
