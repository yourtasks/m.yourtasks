import { connectToDB } from "@/libs/database";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  await connectToDB();

  try {
    const users = await User.find();

    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to get users", { status: 500 });
  }
};
