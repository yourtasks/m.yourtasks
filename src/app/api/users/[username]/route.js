import { connectToDB } from "@/libs/database";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { username } = params;

  await connectToDB();

  try {
    const user = await User.findOne({ username });

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Failed to get the user by username", {
      status: 500,
    });
  }
};
