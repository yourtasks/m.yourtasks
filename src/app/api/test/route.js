import { generateCode } from "@/libs/generateCode";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const code = generateCode();

  return new NextResponse(JSON.stringify(code), { status: 200 });
};
