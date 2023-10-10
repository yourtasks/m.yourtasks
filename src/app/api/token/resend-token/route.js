import { generateCode } from "@/libs/generateCode";
import { sendMail } from "@/libs/sendMail";
import { serverAuth } from "@/libs/serverAuth";
import { Token } from "@/models/token";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const user = await serverAuth();

  console.log(user);

  try {
    const token = await Token.findOne({ user: user._id });

    if (token) {
      await Token.findByIdAndDelete(token._id);
    }

    const code = await generateCode();
    await sendMail(user.email.address, "Email Verification Code", code);
    await Token.create({ user: user._id, code });

    return new NextResponse("Verification code resend", { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to resend code", { status: 500 });
  }
};
