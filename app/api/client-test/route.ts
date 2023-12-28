import { NextResponse, NextRequest } from "next/server";
import client from "../../../libs/client";
export async function GET() {
    let userClient = await client.user.create({
        data: {
            email: "shing100@naver.com",
            name: "shing100",
        },
    });
    return NextResponse.json({
        ok: true,
        userClient,
    });
}