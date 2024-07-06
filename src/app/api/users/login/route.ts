import connecToDb from "@/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
connecToDb();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json(
        { error: "User Doesnt Exist with that email" },
        { status: 400 }
      );
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect)
      return NextResponse.json(
        { error: "Incorrect Password" },
        { status: 400 }
      );
    const data = { id: user._id, username: user.username, email: user.email };
    const token = await jwt.sign(data, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json(
      { message: "User Logged in successfully", data: user, success: true },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
