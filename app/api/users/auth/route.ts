import mail from "@sendgrid/mail";
import twilio from "twilio";
import { NextResponse, NextRequest } from "next/server";
import client from "@/libs/server/client";

mail.setApiKey(process.env.SENDGRID_API_KEY!);
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

export const POST = async (req: Request) => {
    const { phone, email } = await req.json();
    const user = phone ? { phone: +phone } : { email };
    const payload = Math.floor(100000 + Math.random() * 900000) + "";
    const token = await client.token.create({
        data: {
            payload,
            user: {
                connectOrCreate: {
                    where: {
                        ...user,
                    },
                    create: {
                        name: "Anonymous",
                        ...user,
                    },
                },
            },
        },
    });
    if (phone) {
        const message = await twilioClient.messages.create({
            messagingServiceSid: process.env.TWILIO_MSID,
            to: process.env.MY_PHONE!,
            body: `Your login token is ${payload}.`,
        });
        console.log(message);
    } else if (email) {
        const email = await mail.send({
            from: "shing100@naver.com",
            to: "shing100@naver.com",
            subject: "Your Carrot Market Verification Email",
            text: `Your token is ${payload}`,
            html: `<strong>Your token is ${payload}</strong>`,
        });
        console.log(email);
    }
    console.log(token);

    return NextResponse.json({
        token
    });
};