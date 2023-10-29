import { generateCode } from "@/libs/generateCode";
import { sendMail } from "@/libs/email/sendMail";
import { serverAuth } from "@/libs/serverAuth";
import { Token } from "@/models/token";
import { NextResponse } from "next/server";
import { verificationHtml } from "@/libs/email/verificationHtml";
import { TempUser } from "@/models/tempUser";

export const GET = async (request, { params }) => {
  const { studentId } = params;
  try {
    const user = await TempUser.findOne({ studentId });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const token = await Token.findOne({ user: user._id });

    if (token) {
      await Token.findByIdAndDelete(token._id);
    }

    const code = await generateCode();
    await Token.create({ user: user._id, code });
    await sendMail({
      to: user.email,
      subject: `Verification code - ${code}`,
      html: verificationHtml(code),
    });

    return new NextResponse("Verification code resend", { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to resend code", { status: 500 });
  }
};
