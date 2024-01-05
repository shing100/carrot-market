import {getIronSession} from "iron-session";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import client from "@/libs/server/client";

export default function authHandler(handler: (req: Request, res: Response, isPrivate?: boolean) => void) {
    return async (req: Request, res: Response, isPrivate = true) => {
        const session: any = await getIronSession(cookies(), {
            cookieName: "carrotsession",
            password: process.env.CARROT_SESSION_PASSWORD!
        });

        if (isPrivate && !session.user) {
            return NextResponse.json({
                ok: false,
                error: "Not authenticated",
            });
        }

        if (session.user) {
            const profile = await client.user.findUnique({
                where: {
                    id: session.user.id,
                }
            });
            session.user = profile;
            req.session = session;
        }

        return handler(req, res);
    }
}