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
    redirect("/login");
  }

  const courses =
    user && user.studentInformation.courses.map((course) => course._id);

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

  const user = await protectRoute();

  try {
    const newAnn = await Announcement.create({
      title,
      description,
      owner: user._id,
      source: course,
    });

    if (course === "all") {
      await Course.updateMany({}, { $addToSet: { announcements: newAnn._id } });

      return new NextResponse("Posted", { status: 200 });
    }

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
