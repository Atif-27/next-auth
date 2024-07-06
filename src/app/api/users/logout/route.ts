import connecToDb from "@/dbConfig/db";
import { NextResponse } from "next/server";

connecToDb();

export async function GET() {
  try {
    const response = NextResponse.json(
      { message: "User logged out", success: true },
      { status: 200 }
    );
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
