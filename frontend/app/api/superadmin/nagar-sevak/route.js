import { NextResponse } from "next/server";
import { query } from "@/app/lib/db";

export const GET = async (req, res) => {
    
    try {
        const data = await query({
            query: "SELECT * FROM `user` WHERE role = 'corporator'",
        });
        console.log(data);
        return NextResponse.json(data);
    }
    catch (e) {
        console.log(e);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}

