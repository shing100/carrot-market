import {NextResponse} from "next/server";
import authHandler from "@/libs/server/authHandler";
import * as process from "process";

export const GET = authHandler(async (req: Request, res: Response) => {
    const { session : { user }}: any = req;

    const response = await (await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v2/direct_upload`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.CF_TOKEN}`,
            }
        }
        )).json();

    return NextResponse.json({
        ok: true,
        ...response.result,
    });
});
