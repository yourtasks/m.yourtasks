import { getAuthUser } from "@/libs/getAuthUser";
import { Course } from "@/models/course";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const PUT = async (request) => {
  const { rooms } = await request.json();

  const user = await getAuthUser();

  if (!user) {
    return new NextResponse("Unauthorized");
  }

  try {
    const coursesIdPromises = rooms.map(async (room) => {
      const course = await Course.findByIdAndUpdate(
        room.id,
        { $addToSet: { students: user._id } },
        { new: true }
      );

      return room.id;
    });

    const coursesId = await Promise.all(coursesIdPromises)

    await User.findByIdAndUpdate(user._id, {
      "studentInformation.courses": coursesId,
    });

    return new NextResponse("Success");
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to update student information");
  }
};
