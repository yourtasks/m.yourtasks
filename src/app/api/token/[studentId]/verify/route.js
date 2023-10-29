import { serverAuth } from "@/libs/serverAuth";
import { TempUser } from "@/models/tempUser";
import { Token } from "@/models/token";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const PUT = async (request, { params }) => {
  const { studentId } = params;
  const { code } = await request.json();

  try {
    const user = await TempUser.findOne({ studentId });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const token = await Token.findOne({ user: user._id });

    if (!token) return new NextResponse("Token not found", { status: 404 });

    if (token.code !== code) {
      return new NextResponse("Incorrect verification code", { status: 403 });
    }
    await User.create({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      studentId: user.studentId,
      gender: "male",
    });
    await TempUser.findByIdAndDelete(user._id);
    await Token.findByIdAndDelete(token._id);

    return new NextResponse("Verified email address", { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to verify token", { status: 500 });
  }
};
