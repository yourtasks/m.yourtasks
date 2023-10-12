import { connectToDB } from "@/libs/database";
import { getAuthUser } from "@/libs/getAuthUser";
import { Course } from "@/models/course";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const session = await getServerSession();

  if (!session) {
    return new NextResponse("Unauthorized");
  }

  try {
    const courses = await Course.find().sort({ createdAt: -1 });

    return new NextResponse(JSON.stringify(courses), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Failed to get courses", { status: 500 });
  }
};

export const POST = async (request) => {
  const {
    code: orgCode,
    name,
    teacher,
    section: orgSection,
  } = await request.json();

  const user = await getAuthUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (user && user.role !== "admin") {
    return new NextResponse("Method not allowed", { status: 400 });
  }

  const code = orgCode.toLowerCase();
  const section = orgSection.toLowerCase();
  const roomCode = code + section;

  try {
    const course = await Course.create({
      code,
      name,
      teacher,
      section,
      roomCode,
    });

    return new NextResponse(JSON.stringify(course), { status: 203 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to create course", { status: 500 });
  }
};
