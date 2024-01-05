import client from "@/libs/server/client";
import {NextResponse} from "next/server";
import authHandler from "@/libs/server/authHandler";

export const POST = authHandler(async (req: Request, res: Response) => {
    const url = new URL(req.url);
    const { session: { user }}: any = req;
    const id = url.pathname.split('/')[3]
    const alreadyExists = await client.fav.findFirst({
        where: {
            productId: +id.toString(),
            userId: user?.id
        },
    });

    if (alreadyExists) {
        await client.fav.delete({
            where: {
                id: alreadyExists.id
            }
        })
    } else {
        await client.fav.create({
            data: {
                user: {
                    connect: {
                        id: user?.id,
                    }
                },
                product: {
                    connect: {
                        id: +id.toString(),
                    }
                }
            }
        })
    }

    return NextResponse.json({
        ok: true,
    })
});
