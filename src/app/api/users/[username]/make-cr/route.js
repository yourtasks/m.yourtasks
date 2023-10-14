import { getAuthUser } from "@/libs/getAuthUser";
import { Course } from "@/models/course";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const PUT = async (request, { params }) => {
  const { username } = params;
  const { rooms } = await request.json();

  const admin = await getAuthUser();

  if (!admin) {
    return new NextResponse("Ünauthorized", { status: 400 });
  }

  if (admin.role !== "admin") {
    return new NextResponse("You cannot access the route", { status: 400 });
  }

  try {
    const user = await User.findOneAndUpdate({ username }, { role: "cr" });

    const coursesIdPromise = rooms.map(async (room) => {
      await Course.findByIdAndUpdate(room.id, { $addToSet: { cr: user._id } });
      return room.id;
    });

    const coursesId = await Promise.all(coursesIdPromise);

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to make cr", { status: 500 });
  }
};
