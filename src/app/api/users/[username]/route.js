import { getAuthUser } from "@/libs/getAuthUser";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const user = await getAuthUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 400 });
  }

  try {
    const user = await User.findOne({ username: params.username });

    console.log(user);

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to get the user by username", {
      status: 500,
    });
  }
};
