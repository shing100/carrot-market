import client from "@/libs/server/client";
import {NextResponse} from "next/server";
import authHandler from "@/libs/server/authHandler";

export const GET = authHandler(async (req: Request, res: Response) => {
    const { session : { user }}: any = req;
    const url = new URL(req.url);
    const id = url.pathname.split('/')[3]

    const stream = await client.stream.findUnique({
        where: {
            id: +id.toString(),
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    avatar: true,
                }
            },
        }
    })

    if (!stream) {
        return NextResponse.next();
    }

    return NextResponse.json({
        ok: true,
        stream
    });
});