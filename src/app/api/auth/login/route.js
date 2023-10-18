import { User } from "@/models/user";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { username, password } = await request.json();

  try {
    const user = await User.findOne({ username }).select("password");

    if (!user) {
      return new NextResponse("Wrong username", { status: 404 });
    }

    const correctPassword = await compare(password, user.password);

    if (!correctPassword) {
      return new NextResponse("Incorrect password", { status: 401 });
    }

    return new NextResponse("Correct credentials", { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Something went wrong", { status: 500 });
  }
};
