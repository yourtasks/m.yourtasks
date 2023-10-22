import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    return new NextResponse(JSON.stringify({ name: "Md MOfazzal Hossain" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
};
