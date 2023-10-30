import { protectRoute } from "@/libs/protectRoute";
import { Announcement } from "@/models/announcement";
import { Course } from "@/models/course";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const user = await protectRoute();

  if (!user) {
    return new NextResponse("Access denied", { status: 401 });
  }

  try {
    const AT = await Course.find({ _id: { $in: user.courses } })
      .populate({
        path: "announcements",
        select:
          "type title description createdAt likes likesCount commentsCount sharesCount seenCount owner source",
        populate: [
          {
            path: "owner",
            select: "username firstname lastname badges role profilePicture",
          },
          {
            path: "source",
            select: "code section name",
          },
        ],
      })
      .populate({
        path: "tasks",
        select:
          "type title description seenCount likes likesCount commentsCount sharesCount hasCompleted owner source",
        populate: [
          {
            path: "owner",
            select: "username firstname lastname badges role profilePicture",
          },
          {
            path: "source",
            select: "code section name",
          },
        ],
      })
      .select("announcements tasks")
      .lean();

    return new NextResponse(JSON.stringify(AT.flat()), { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to get the feed posts", { status: 500 });
  }
};
