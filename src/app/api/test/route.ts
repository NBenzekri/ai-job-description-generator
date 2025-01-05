import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json(
    { message: "Internal Server not error" },
    { status: 200 }
  );
}
