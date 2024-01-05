import client from "@/libs/server/client";
import {NextResponse} from "next/server";
import authHandler from "@/libs/server/authHandler";

export const POST = authHandler(async (req: Request, res: Response) => {
    const { session : { user }}: any = req;
    const url = new URL(req.url);
    const id = url.pathname.split('/')[3]
    const alreadyExists = await client.wondering.findFirst({
        where: {
            userId: user?.id,
            postId: +id.toString(),
        },
        select: {
            id: true,
        }
    });

    if (alreadyExists) {
        await client.wondering.delete({
            where: {
                id: alreadyExists.id
            }
        });
    } else {
        await client.wondering.create({
            data: {
                user: {
                    connect: {
                        id: user?.id,
                    },
                },
                post: {
                    connect: {
                        id: +id.toString(),
                    },
                },
            },
        });
    }

    return NextResponse.json({
        ok: true,
    });
});
