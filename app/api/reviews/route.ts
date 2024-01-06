import client from "@/libs/server/client";
import {NextResponse} from "next/server";
import authHandler from "@/libs/server/authHandler";

export const GET = authHandler(async (req: Request, res: Response) => {
    const { session : { user }}: any = req;
    const reviews = await client.review.findMany({
        where: {
            createdForId: user.id,
        },
        include: {
            createdBy: {
                select: {
                    id: true,
                    name: true,
                    avatar: true,
                }
            },
        }
    });
    
    return NextResponse.json({
        ok: true,
        reviews,
    });
});