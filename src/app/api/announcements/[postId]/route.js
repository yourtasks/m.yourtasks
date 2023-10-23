import { protect } from "@/libs/protect";
import { Announcement } from "@/models/announcement";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { postId } = params;
  await protect();

  try {
    const announcement = await Announcement.findById(postId).populate({
      path: "owner",
      select: "username name profileInformation.badges",
    });

    if (!announcement) {
      return new NextResponse("Announcement not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(announcement), { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Something went wrong", { status: 500 });
  }
};
