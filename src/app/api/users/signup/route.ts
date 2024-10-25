import connecToDb from "@/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import sendEmail from "@/utils/mailer";

// ! We need to connect to the database before doing anything as Next.js runs on edge servers
connecToDb();

export async function POST(request: NextRequest) {
  try {
    // ! Extracting the request body from the request object
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // TODO VALIDATION

    const dbUser = await User.findOne({ username });

    if (dbUser)
      NextResponse.json(
        {
          error: "User already exists",
        },
        { status: 400 }
      );

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();

    // ! Send Verification Code (EMAIL + DB)

    await sendEmail({
      email: savedUser.email,
      emailType: "VERIFY",
      userId: savedUser._id,
    });

    return NextResponse.json(
      {
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
