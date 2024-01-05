import client from "@/libs/server/client";
import {NextResponse} from "next/server";
import authHandler from "@/libs/server/authHandler";

export const GET = authHandler(async (req: Request, res: Response) => {
    const url = new URL(req.url);
    const id = url.pathname.split('/')[3]
    const { session: { user }}: any = req;

    const product = await client.product.findUnique({
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
    const terms = product?.name.split(" ").map(word => ({
        name: {
            contains: word,
        }
    }));
    const relatedProducts = await client.product.findMany({
        where: {
            OR: terms,
            AND: {
                id: {
                    not: product?.id,
                }
            }
        }
    })

    const isLiked = Boolean(await client.fav.findFirst({
            where: {
                productId: product?.id,
                userId: user.id,
            },
            select: {
                id: true,
            }
        }));

    return NextResponse.json({
        ok: true,
        product,
        isLiked,
        relatedProducts,
    })
});