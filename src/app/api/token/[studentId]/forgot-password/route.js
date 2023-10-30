import { connectToDB } from "@/libs/database";
import { forgotPassHtml } from "@/libs/email/forgotPassHtml";
import { sendMail } from "@/libs/email/sendMail";
import { generateCode } from "@/libs/generateCode";
import { Token } from "@/models/token";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const POST = async (request, { params }) => {
  const { studentId } = params;

  await connectToDB();

  try {
    const user = await User.findOne({ studentId });

    if (!user) {
      return new NextResponse("Account not found", { status: 404 });
    }

    const code = await generateCode();
    const token = await Token.create({
      code,
      user: user._id,
      type: "forgot-password",
    });

    const link = process.env.SITE_URL + `/reset-password/${token._id}`;
    await sendMail({
      to: user.email,
      subject: `Reset Code - ${code}`,
      html: forgotPassHtml(code, link),
    });

    return new NextResponse(JSON.stringify(code), { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
