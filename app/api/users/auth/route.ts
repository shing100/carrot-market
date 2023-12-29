import { NextResponse, NextRequest } from "next/server";
import client from "../../../../libs/server/client";

export const POST = async (req: Request) => {
    const res = await req.json();
    console.log(res);
    return NextResponse.json({
        res
    });
};