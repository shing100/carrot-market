import '../styles/globals.css'
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {SWRProvider} from "@/app/SWRProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "당근마켓 클론",
    description: "Generated by create next app",
    keywords: "당근마켓, 클론, 중고거래, 당근",
};

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <body className={inter.className}>
                <div className="w-full max-w-xl mx-auto">
                    <SWRProvider children={children} />
                </div>
            </body>
        </html>
    )
}