import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "Internal Server not error" },
    { status: 200 }
  );
}
