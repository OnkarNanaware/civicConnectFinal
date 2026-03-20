import { NextResponse } from "next/server";
import { query } from "@/app/lib/db";

export const POST = async (req, res) => {
  const data = await req.json();

  console.log(data);
  const username = data.username;
  const password = data.password;

  const user = await query({
    query: "select * from user where email = ? and pass = ?",
    values: [username, password],
  });

  if (user.length > 0) {
    return NextResponse.json({ user: user }, { status: 200 });
  }
  return NextResponse.json(
    { message: "Invalid uername or password" },
    { status: 400 }
  );
};
