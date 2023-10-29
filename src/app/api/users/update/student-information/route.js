import { getAuthUser } from "@/libs/getAuthUser";
import { Course } from "@/models/course";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const PUT = async (request) => {
  const { rooms } = await request.json();

  const user = await getAuthUser();

  if (!user) {
    return new NextResponse("Access denied", { status: 401 });
  }

  const courseIds = rooms.map((course) => course.id);

  try {
    await Course.updateMany(
      { _id: { $in: courseIds } },
      {
        $addToSet: { students: user._id },
        $inc: { studentsCount: 1 },
      }
    );
    await User.findByIdAndUpdate(user._id, {
      $addToSet: {
        courses: { $each: courseIds },
      },
    });

    return new NextResponse("Success");
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to update student information");
  }
};
