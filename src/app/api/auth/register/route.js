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
  } = await request.json();

  const username = orgUsername.toLowerCase();
  const email = orgEmail.toLowerCase();

  console.log(username, email, firstname, lastname);

  await connectToDB();

  const hashedPassword = await hash(password, 10);

  try {
    const newUser = await User.create({
      username,
      name: {
        firstname,
        lastname,
      },
      email: { address: email },
      password: hashedPassword,
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
