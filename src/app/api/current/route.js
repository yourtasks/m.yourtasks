import { protectRoute } from "@/libs/protectRoute";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const user = await protectRoute();

  return new NextResponse(JSON.stringify(user), { status: 200 });
};
