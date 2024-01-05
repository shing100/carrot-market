import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {getIronSession} from "iron-session";
import client from "@/libs/server/client";

export const POST = async (req: Request, res: Response) => {
    const { token } = await req.json();
    console.log(token);
    const exists = await client.token.findUnique({
        where: {
            payload: token,
        },
    });
    const session: any = await getIronSession(cookies(), {
        cookieName: "carrotsession",
        password: process.env.CARROT_SESSION_PASSWORD!,
    });

    if (!exists) NextResponse.json({ ok: false });

    session.user = {
        id: exists?.userId,
    }

    await (await session).save();
    return NextResponse.json({
        ok: true,
    });
};