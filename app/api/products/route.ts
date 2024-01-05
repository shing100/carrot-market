import client from "@/libs/server/client";
import {NextResponse} from "next/server";
import authHandler from "@/libs/server/authHandler";

export const GET = authHandler(async (req: Request, res: Response) => {
    const products = await client.product.findMany({});
    return NextResponse.json({
        ok: true,
        products,
    });
});

export const POST = authHandler(async (req: Request, res: Response) => {
    const { session: { user }} = req;
    const { name, price, description } = await req.json();

    const product = await client.product.create({
        data: {
            name,
            price: +price,
            description,
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