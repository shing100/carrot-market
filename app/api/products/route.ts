import client from "@/libs/server/client";
import {NextResponse} from "next/server";
import authHandler from "@/libs/server/authHandler";

export const GET = authHandler(async (req: Request, res: Response) => {
    const params = new URLSearchParams(req.url.split("?")[1]);
    const page: number = Number(params.get("page"));
    const productCount = await client.product.count()
    const products = await client.product.findMany({
        take: 10,
        skip: (+page - 1) * 10,
        include: {
            _count: {
                select: {
                    favs: true,
                }
            },
        }
    });
    return NextResponse.json({
        ok: true,
        products,
        pages: Math.ceil(productCount / 10),
    });
});

export const POST = authHandler(async (req: Request, res: Response) => {
    const { session: { user }}: any = req;
    const { name, price, description, latitude, longitude, photoId } = await req.json();

    const product = await client.product.create({
        data: {
            name,
            price: +price,
            description,
            latitude,
            longitude,
            image: photoId,
            user: {
                connect: {
                    id: user.id,
                },
            },
        },
    });

    return NextResponse.json({
        ok: true,
        product,
    });
});