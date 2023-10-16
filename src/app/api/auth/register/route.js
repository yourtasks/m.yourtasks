import { connectToDB } from "@/libs/database";
import { generateCode } from "@/libs/generateCode";
import { sendMail } from "@/libs/sendMail";
import { Token } from "@/models/token";
import { User } from "@/models/user";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const {
    username: orgUsername,
    firstname,
    lastname,
    email: orgEmail,
    password,
    studentId,
  } = await request.json();

  const username = orgUsername.toLowerCase();
  const email = orgEmail.toLowerCase();

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

    await sendMail(newUser.email.address, "Email Verification Code", code);

    return new NextResponse(JSON.stringify("An verification email is sent"), {
      status: 203,
    });
  } catch (error) {
    console.log("[Register]", error);

    return new NextResponse("[Registration_ERROR]", { status: 500 });
  }
};
