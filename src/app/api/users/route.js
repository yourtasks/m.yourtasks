import { protectRoute } from "@/libs/protectRoute";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const user = await protectRoute();

  if (user.role !== "admin") {
    return new NextResponse("Access denied", { status: 403 });
  }

  try {
    const users = await User.find();

    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to get users", { status: 500 });
  }
};
