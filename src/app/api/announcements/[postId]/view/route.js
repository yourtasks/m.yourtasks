import { protectRoute } from "@/libs/protectRoute";
import { Announcement } from "@/models/announcement";
import { NextResponse } from "next/server";

export const PUT = async (request, { params }) => {
  const { postId } = params;
  const user = await protectRoute();

  try {
    const announcement = await Announcement.findById(postId);

    if (announcement.seen.includes(user._id)) {
      return new NextResponse("Already viewed this announcement", {
        status: 400,
      });
    }

    const seenCount = announcement.seen.length;

    await Announcement.findByIdAndUpdate(postId, {
      $addToSet: { seen: user._id },
      $set: { seenCount: seenCount + 1 },
    });

    return new NextResponse("View added to announcement", { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to add view in announcement", {
      status: 500,
    });
  }
};
