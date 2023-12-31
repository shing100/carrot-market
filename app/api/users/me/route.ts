import { getIronSession } from "iron-session";
import client from "@/libs/server/client";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export const GET = async (req: Request, res: Response) => {
    const session = await getIronSession(cookies(), {
        cookieName: "carrotsession",
        password: process.env.CARROT_SESSION_PASSWORD!,
    });

    if (!session.user) return NextResponse.json({ ok: false });

    const profile = await client.user.findUnique({
        where: {
            id: session.user.id,
        }
    });
    return NextResponse.json({
        ok: true,
        profile,
    });
};