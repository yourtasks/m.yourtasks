import { getAuthUser } from "@/libs/getAuthUser";
import { Announcement } from "@/models/announcement";
import { NextResponse } from "next/server";

export const PUT = async (request, { params }) => {
  const { postId } = params;
  const user = await getAuthUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 400 });
  }

  try {
    let ann = await Announcement.findById(postId);

    if (ann.likes.includes(user._id)) {
      ann = await Announcement.findByIdAndUpdate(
        postId,
        {
          $pull: { likes: user._id },
        },
        { new: true }
      );
    } else {
      ann = await Announcement.findByIdAndUpdate(
        postId,
        {
          $addToSet: { likes: user._id },
        },
        { new: true }
      );
    }

    return new NextResponse(JSON.stringify(ann), { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to get the post", { status: 500 });
  }
};
