import { getAuthUser } from "@/libs/getAuthUser";
import { Course } from "@/models/course";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const user = await getAuthUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 404 });
  }
  console.log(user);
  try {
    const courses = await Course.find({ cr: user._id });

    return new NextResponse(JSON.stringify(courses), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Failed to get your served courses", {
      status: 500,
    });
  }
};
