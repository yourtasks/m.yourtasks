import { protectRoute } from "@/libs/protectRoute";
import { Comment } from "@/models/Comment";
import { Announcement } from "@/models/announcement";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { postId } = params;

  try {
    const announcement = await Announcement.findById(postId);

    if (!announcement) {
      return new NextResponse("Announcement does not exists", { status: 404 });
    }

    const comments = await Comment.find({ source: announcement._id })
      .populate({
        path: "owner",
        select: "username name profileInformation.badges",
      })
      .sort({ createdAt: -1 });

    comments.sort((a, b) => {
      const likes = b.likes.length - a.likes.length;
      const dislikes = a.dislikes.length - b.dislikes.length;

      if (likes === 0 && dislikes === 0) {
        return 0;
      }

      if (likes === 0) {
        return -1;
      }

      return likes || dislikes;
    });

    return new NextResponse(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to get the comments", { status: 500 });
  }
};

export const POST = async (request, { params }) => {
  const { caption } = await request.json();
  const { postId } = params;
  const type = "announcement";
  const user = await protectRoute();

  try {
    const announcement = await Announcement.findById(postId)
      .select("_id")
      .lean();

    if (!announcement) {
      return new NextResponse("Announcement not found", { status: 404 });
    }

    const comment = await Comment.create({
      caption,
      owner: user._id,
      source: announcement._id,
      type,
    });
    await Announcement.findByIdAndUpdate(postId, {
      $addToSet: { comments: comment._id },
    });

    return new NextResponse("Comment added", { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Failed to create comment", { status: 500 });
  }
};
