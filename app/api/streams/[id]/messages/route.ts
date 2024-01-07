import client from "@/libs/server/client";
import {NextResponse} from "next/server";
import authHandler from "@/libs/server/authHandler";

export const POST = authHandler(async (req: Request, res: Response) => {
    const { session : { user }}: any = req;
    const url = new URL(req.url);
    const id = url.pathname.split('/')[3]
    const { message }: any = await req.json();

    const newMessage = await client.message.create({
        data: {
            message,
            user: {
                connect: {
                    id: user.id,
                }
            },
            stream: {
                connect: {
                    id: +id.toString(),
                }
            }
        }
    });

    return NextResponse.json({
        ok: true,
        newMessage
    });
});