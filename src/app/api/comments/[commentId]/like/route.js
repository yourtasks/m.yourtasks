import { protectRoute } from "@/libs/protectRoute";
import { Comment } from "@/models/Comment";
import { NextResponse } from "next/server";

export const PUT = async (request, { params }) => {
  const { commentId } = params;
  const user = await protectRoute();

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return new NextResponse("Comment does not exists", { status: 404 });
    }

    if (comment.dislikes.includes(user._id)) {
      await Comment.findByIdAndUpdate(commentId, {
        $pull: { dislikes: user._id },
      });
    }

    if (comment.likes.includes(user._id)) {
      await Comment.findByIdAndUpdate(commentId, {
        $pull: { likes: user._id },
      });

      return new NextResponse("Comment unliked", { status: 200 });
    }

    await Comment.findByIdAndUpdate(commentId, {
      $addToSet: { likes: user._id },
    });

    return new NextResponse("Comment liked", { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Something went wrong", { status: 500 });
  }
};
