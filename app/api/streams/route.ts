import client from "@/libs/server/client";
import {NextResponse} from "next/server";
import authHandler from "@/libs/server/authHandler";

export const GET = authHandler(async (req: Request, res: Response) => {
    const params = new URLSearchParams(req.url.split("?")[1]);
    const page: number = Number(params.get("page"));
    const streamCount = await client.stream.count()
    const streams = await client.stream.findMany({
       take: 10,
       skip: (+page - 1) * 10,
        orderBy: {
         createdAt: 'desc',
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    avatar: true,
                }
            },
        },
    });

   return NextResponse.json({
        ok: true,
        streams,
        pages: Math.ceil(streamCount / 10),
   });
});

export const POST = authHandler(async (req: Request, res: Response) => {
    const { session : { user }}: any = req;
    const { name, price, description }: any = await req.json();
    const stream = await client.stream.create({
        data: {
            name,
            price,
            description,
            user: {
                connect: {
                    id: user.id,
                }
            }
        }
    });

    return NextResponse.json({
        ok: true,
        stream
    });
});