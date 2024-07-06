import connecToDb from "@/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import tokenExtract from "@/utils/tokenExtract";

connecToDb();

export async function GET(request: NextRequest) {
  try {
    const id = tokenExtract(request);
    const user = await User.findById(id).select("-password");
    if (!user)
      return NextResponse.json({ error: "User doesnt Exist" }, { status: 400 });
    return NextResponse.json(
      { message: "User Details fetched", data: user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
