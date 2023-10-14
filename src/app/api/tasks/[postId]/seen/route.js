import { getAuthUser } from "@/libs/getAuthUser";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";

export const PUT = async (request, { params }) => {
  const { postId } = params;

  const user = await getAuthUser();

  try {
    await Task.findByIdAndUpdate(postId, { $addToSet: { seen: user._id } });

    return new NextResponse("View added", { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to seen", { status: 500 });
  }
};
