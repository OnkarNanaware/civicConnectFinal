import { NextResponse } from "next/server";
import { query } from "@/app/lib/db";

export const PUT = async (req) => {
  try {
    const data = await req.json();
    const { id, status } = data;

    if (!id || !status) {
      return NextResponse.json({ message: "ID and Status required" }, { status: 400 });
    }

    const result = await query({
      query: "UPDATE complaint SET status = ? WHERE id = ?",
      values: [status, id],
    });

    if (result.affectedRows > 0) {
      return NextResponse.json({ message: "Status updated successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Complaint not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Update status error:", error.message);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
