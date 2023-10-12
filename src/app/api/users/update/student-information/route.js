import { getAuthUser } from "@/libs/getAuthUser";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const PUT = async (request) => {
  const { rooms } = await request.json();

  const user = await getAuthUser();

  if (!user) {
    return new NextResponse("Unauthorized");
  }

  const coursesId = rooms.map((room) => room.id);

  try {
    await User.findByIdAndUpdate(user._id, {
      "studentInformation.courses": coursesId,
    });

    return new NextResponse("Success");
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to update student information");
  }
};
