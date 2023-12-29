import { NextResponse, NextRequest } from "next/server";
import client from "@/libs/server/client";

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
    console.log(token);
    /* if (email) {
      user = await client.user.findUnique({
        where: {
          email,
        },
      });
      if (user) console.log("found it.");
      if (!user) {
        console.log("Did not find. Will create.");
        user = await client.user.create({
          data: {
            name: "Anonymous",
            email,
          },
        });
      }
      console.log(user);
    }
    if (phone) {
      user = await client.user.findUnique({
        where: {
          phone: +phone,
        },
      });
      if (user) console.log("found it.");
      if (!user) {
        console.log("Did not find. Will create.");
        user = await client.user.create({
          data: {
            name: "Anonymous",
            phone: +phone,
          },
        });
      }
      console.log(user);
    } */
    return NextResponse.json({
        token
    });
};