import client from "@/libs/server/client";
import {NextResponse} from "next/server";
import authHandler from "@/libs/server/authHandler";

export const GET = authHandler(async (req: Request, res: Response) => {
    const params = new URLSearchParams(req.url.split("?")[1]);
    const latitude = Number(params.get("latitude"));
    const longitude = Number(params.get("longitude"));
    const page: number = Number(params.get("page"));
    const { session : { user }}: any = req;
    const postCount = await client.post.count()
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
        },
        where: {
            latitude: {
                gte: latitude - 0.02,
                lte: latitude + 0.02,
            },
            longitude: {
                gte: longitude - 0.02,
                lte: longitude + 0.02,
            },
        },
        take: 10,
        skip: (+page - 1) * 10,
    }).then(posts => posts.map(post => ({
        ...post,
        wondering: post.wondering.length > 0,
    })));

    return NextResponse.json({
        ok: true,
        posts,
        pages: Math.ceil(postCount / 10),
    });
});

export const POST = authHandler(async (req: Request, res: Response) => {
    const { session : { user }}: any = req;
    const { question, latitude, longitude } = await req.json();
    const post = await client.post.create({
        data: {
            question,
            latitude,
            longitude,
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
