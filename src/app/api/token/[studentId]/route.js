import { TempUser } from "@/models/tempUser";
import { Token } from "@/models/token";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { studentId } = params;

  try {
    const user = await TempUser.findOne({ studentId });

    if (!user) {
      return new NextResponse("Something went wrong", { status: 500 });
    }

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
