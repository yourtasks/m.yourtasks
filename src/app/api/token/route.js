import { protectRoute } from "@/libs/protectRoute";
import { Token } from "@/models/token";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const user = await protectRoute();

  try {
    const token = await Token.findOne({ user: user._id });

    if (!token) {
      return new NextResponse("Token not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(token), { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to get the token", { status: 500 });
  }
};
