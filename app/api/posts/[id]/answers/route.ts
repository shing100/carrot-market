import client from "@/libs/server/client";
import {NextResponse} from "next/server";
import authHandler from "@/libs/server/authHandler";

export const POST = authHandler(async (req: Request, res: Response) => {
    const { session : { user }}: any = req;
    const url = new URL(req.url);
    const id = url.pathname.split('/')[3]
    const { answer } = await req.json();
    const post = await client.post.findUnique({
        where: {
            id: +id.toString(),
        },
    });

    if (!post) return NextResponse.json({ok: false, error: "Post not found"});

    const newAnswer = await client.answer.create({
        data: {
            answer,
            user: {
                connect: {
                    id: user?.id,
                },
            },
            post: {
                connect: {
                    id: post?.id,
                },
            },
        },
    });

    return NextResponse.json({
        ok: true,
        answer: newAnswer,
    });
});
