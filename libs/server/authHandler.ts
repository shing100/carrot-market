import { getIronSession } from "iron-session";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export default function authHandler(handler: (req: Request, res: Response, isPrivate?: boolean) => void) {
    return async (req: Request, res: Response, isPrivate = true) => {
        const session = await getIronSession(cookies(), {
            cookieName: "carrotsession",
            password: process.env.CARROT_SESSION_PASSWORD!
        });

        if (isPrivate && !session.user) {
            return NextResponse.redirect("/enter");
        }
        return handler(req, res);
    }
}