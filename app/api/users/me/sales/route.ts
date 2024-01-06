import client from "@/libs/server/client";
import {NextResponse} from "next/server";
import authHandler from "@/libs/server/authHandler";

export const GET = authHandler(async (req: Request, res: Response) => {
    const { session : { user }}: any = req;
    const sales = await client.sale.findMany({
        where: {
            userId: user.id,
        },
        include: {
            product: {
                include: {
                    _count: {
                        select: {
                            favs: true,
                        }
                    },
                }
            }
        }
    });

    return NextResponse.json({
        ok: true,
        sales
    });
});