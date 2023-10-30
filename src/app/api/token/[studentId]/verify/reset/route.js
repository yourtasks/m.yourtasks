import { connectToDB } from "@/libs/database";
import { Token } from "@/models/token";
import { NextResponse } from "next/server";

export const POST = async (request, { params }) => {
  const { studentId } = params;
  const { code } = await request.json();

  await connectToDB();

  try {
    const token = await Token.findOne({ studentId, type: "forgot-password" });

    if (!token) {
      return new NextResponse("Token not found", { status: 404 });
    }

    if (token.code !== code) {
      return new NextResponse("Invalid code", { status: 400 });
    }

    await Token.findByIdAndDelete(token._id);

    return new NextResponse("Verified", { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to verify", { status: 500 });
  }
};
