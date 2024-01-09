import {NextResponse} from "next/server";
import authHandler from "@/libs/server/authHandler";
import client from "@/libs/server/client";

export const GET = authHandler(async (req: Request, res: Response) => {
    if (!req.session.user) return NextResponse.json({ ok: false });

    const { session : { user }}: any = req;

    return NextResponse.json({
        ok: true,
        profile: user,
    });
});


export const POST = authHandler(async (req: Request, res: Response) => {
    const { session : { user } }: any = req;
    const { name, email, phone, avatarId } = await req.json();

    if (email && email !== user.email) {
        const alreadyExists = Boolean(await client.user.findFirst({
            where: {
                email,
            },
            select: {
                id: true,
            },
        }));
        if (alreadyExists) return NextResponse.json({ ok: false, error: "Email already exists" });

        await client.user.update({
            where: {
                id: user.id,
            },
            data: {
                email,
            },
        });
    } else if (name && name !== user.name) {
        const alreadyExists = Boolean(await client.user.findFirst({
            where: {
                name,
            },
            select: {
                id: true,
            },
        }));
        if (alreadyExists) return NextResponse.json({ ok: false, error: "Email already exists" });

        await client.user.update({
            where: {
                id: user.id,
            },
            data: {
                name,
            },
        });
    } else if (phone && phone !== user.phone) {
        const alreadyExists = Boolean(await client.user.findFirst({
            where: {
                phone,
            },
            select: {
                id: true,
            },
        }));
        if (alreadyExists) return NextResponse.json({ ok: false, error: "Email already exists" });

        await client.user.update({
            where: {
                id: user.id,
            },
            data: {
                phone,
            },
        });
    }
    if (avatarId) {
        await client.user.update({
            where: {
                id: user.id,
            },
            data: {
                avatar: avatarId,
            }
        });
    }
    return NextResponse.json({ ok: true });
})