import client from "@/libs/server/client";
import {NextResponse} from "next/server";
import authHandler from "@/libs/server/authHandler";

export const GET = authHandler(async (req: Request, res: Response) => {
    const { session : { user }}: any = req;
    const posts = await client.post.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                }
            },
            _count: {
                select: {
                    answers: true,
                    wondering: true,
                }
            },
            wondering: {
                where: {
                    userId: user?.id,
                },
            }
        }
    }).then(posts => posts.map(post => ({
        ...post,
        wondering: post.wondering.length > 0,
    })));

    return NextResponse.json({
        ok: true,
        posts,
    });
});

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
