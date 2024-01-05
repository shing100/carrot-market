import client from "@/libs/server/client";
import {NextResponse} from "next/server";
import authHandler from "@/libs/server/authHandler";

export const GET = authHandler(async (req: Request, res: Response) => {
    const { session : { user }}: any = req;
    const url = new URL(req.url);
    const id = url.pathname.split('/')[3]
    const post = await client.post.findUnique({
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
            answers: {
                select: {
                    answer: true,
                    id: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            avatar: true,
                        }
                    }
                }
            },
            _count: {
                select: {
                    answers: true,
                    wondering: true,
                }
            },
        }
    });
    const isWondering = Boolean(await client.wondering.findFirst({
        where: {
            userId: user?.id,
            postId: +id.toString(),
        },
        select: {
            id: true,
        }
    }));

    return NextResponse.json({
        ok: true,
        post,
        isWondering,
    });
});
