import { serverAuth } from "@/libs/serverAuth";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const currentUser = await serverAuth(request);

  const { password, ...user } = currentUser;

  return new NextResponse(JSON.stringify(user), { status: 200 });
};
