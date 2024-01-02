import {NextResponse} from "next/server";
import authHandler from "@/libs/server/authHandler";

export const GET = authHandler(async (req: Request, res: Response) => {
    if (!req.session.user) return NextResponse.json({ ok: false });

    const { session : { user }} = req;

    return NextResponse.json({
        ok: true,
        profile: user,
    });
});
