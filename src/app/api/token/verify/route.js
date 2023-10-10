import { serverAuth } from "@/libs/serverAuth";
import { Token } from "@/models/token";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const PUT = async (request) => {
  const { code } = await request.json();

  const user = await serverAuth();

  console.log(user._id);

  try {
    const token = await Token.findOne({ user: user._id });

    if (!token) return new NextResponse("Token not found", { status: 404 });

    if (token.code !== code) {
      return new NextResponse("Incorrect verification code", { status: 403 });
    }

    await User.findByIdAndUpdate(user._id, { "email.isVerified": true });
    await Token.findByIdAndDelete(token._id);

    return new NextResponse("Verified email address", { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to verify token", { status: 500 });
  }
};
