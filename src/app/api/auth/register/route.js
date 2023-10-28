import { capitalizeWord } from "@/libs/capitalizeWord";
import { connectToDB } from "@/libs/database";
import { generateCode } from "@/libs/generateCode";
import { sendMail } from "@/libs/email/sendMail";
import { Token } from "@/models/token";
import { User } from "@/models/user";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { verificationHtml } from "@/libs/email/verificationHtml";

export const POST = async (request) => {
  const {
    username: orgUsername,
    firstname: orgFirstname,
    lastname: orgLastname,
    email,
    password,
    studentId,
  } = await request.json();

  const username = orgUsername.toLowerCase();
  const firstname = capitalizeWord(orgFirstname);
  const lastname = capitalizeWord(orgLastname);

  console.log(username, email, firstname, lastname);

  const hashedPassword = await hash(password, 10);

  try {
    await connectToDB();

    const studentIdTaken = await User.findOne({
      "studentInformation.studentId": studentId,
    });

    if (studentIdTaken) {
      return new NextResponse("student id taken", { status: 409 });
    }

    const emailTaken = await User.findOne({ "email.address": email });

    if (emailTaken) {
      return new NextResponse("email taken", { status: 409 });
    }

    const usernameTaken = await User.findOne({ username });

    if (usernameTaken) {
      return new NextResponse("username taken", { status: 409 });
    }

    const newUser = await User.create({
      username,
      name: {
        firstname,
        lastname,
      },
      email: { address: email },
      password: hashedPassword,
      studentInformation: { studentId },
    });

    const code = await generateCode();
    await Token.create({ user: newUser._id, code });

    await sendMail({
      to: newUser.email.address,
      subject: `Verification code - ${code}`,
      html: verificationHtml(code),
    });

    return new NextResponse(JSON.stringify("An verification email is sent"), {
      status: 203,
    });
  } catch (error) {
    console.log("[Register]", error);

    return new NextResponse("[Registration_ERROR]", { status: 500 });
  }
};
