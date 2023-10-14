import { getAuthUser } from "@/libs/getAuthUser";
import { protectRoute } from "@/libs/protectRoute";
import { Announcement } from "@/models/announcement";
import { Course } from "@/models/course";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  await protectRoute();
  const user = await getAuthUser();

  const courses =
    user && user.studentInformation.courses.map((course) => course._id);

  console.log(courses);

  try {
    const announcements = await Announcement.find({
      source: { $in: courses },
    })
      .populate("source owner")
      .sort({ createdAt: -1 });

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

  const user = await getAuthUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 400 });
  }

  try {
    const newAnn = await Announcement.create({
      title,
      description,
      owner: user._id,
      source: course,
    });

    console.log(newAnn);

    await Course.findByIdAndUpdate(course, {
      $addToSet: { announcements: newAnn._id },
    });

    await User.findByIdAndUpdate(user._id, {
      $addToSet: { announcements: newAnn._id },
    });

    return new NextResponse("Post created successfully", { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to create announcement", { status: 500 });
  }
};