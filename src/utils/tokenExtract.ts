import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
export default function tokenExtract(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    const data: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return data.id;
  } catch (error) {
    throw new Error("Error decoding token");
  }
}
