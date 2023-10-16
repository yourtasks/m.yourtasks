import { getAuthUser } from "@/libs/getAuthUser";
import { protectRoute } from "@/libs/protectRoute";
import { Course } from "@/models/course";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const user = await protectRoute();

  console.log(user);

  try {
    let courses;

    if (user.role === "admin") {
      courses = await Course.find();

      courses.sort((a, b) => {
        const sectionA = a.section;
        const sectionB = b.section;

        return sectionA.localeCompare(sectionB);
      });

      return new NextResponse(JSON.stringify(courses));
    }

    courses = await Course.find({ cr: user._id });

    return new NextResponse(JSON.stringify(courses), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Failed to get your served courses", {
      status: 500,
    });
  }
};
