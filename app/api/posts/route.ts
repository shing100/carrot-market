import client from "@/libs/server/client";
import {NextResponse} from "next/server";
import authHandler from "@/libs/server/authHandler";

export const POST = authHandler(async (req: Request, res: Response) => {
    const { session : { user }}: any = req;
    const { question } = await req.json();
    const post = await client.post.create({
        data: {
            question,
            user: {
                connect: {
                    id: user?.id,
                },
            },
        },
    });

    return NextResponse.json({
        ok: true,
        post,
    });
});
