import { connectToDB } from "@/libs/database";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  await connectToDB();

  try {
    await User.updateMany({}, { tasksCount: 1 }, { upsert: true })
      .exec()
      .then((err, result) => {
        console.log(result, err);
      });

    return new NextResponse("done", { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse("Failed to update fields", { status: 500 });
  }
};
