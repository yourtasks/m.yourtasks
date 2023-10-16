import { NextResponse } from "next/server";

export const test = async () => {
  return new NextResponse("New error", { status: 500 });
};
