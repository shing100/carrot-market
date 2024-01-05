import client from "@/libs/server/client";
import {NextResponse} from "next/server";
import authHandler from "@/libs/server/authHandler";

export const GET = authHandler(async (req: Request, res: Response) => {
    const products = await client.product.findMany({
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
    });
});

export const POST = authHandler(async (req: Request, res: Response) => {
    const { session: { user }}: any = req;
    const { name, price, description, latitude, longitude } = await req.json();

    const product = await client.product.create({
        data: {
            name,
            price: +price,
            description,
            latitude,
            longitude,
            image: "xx",
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