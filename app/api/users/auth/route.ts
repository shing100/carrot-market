import { NextResponse, NextRequest } from "next/server";
import client from "@/libs/server/client";

export const POST = async (req: Request) => {
    const { phone, email } = await req.json();
    const payload = phone ? { phone: +phone } : { email };
    const user = await client.user.upsert({
        where: {
            ...payload,
        },
        create: {
            name: "Anonymous",
            ...payload,
        },
        update: {},
    });
    console.log(user);
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
        user
    });
};