"use client";
import Layout from "../components/layout";
import Item from "../components/item";
import FloatingButton from "../components/floating-button";
import useUser from "@/libs/client/useUser";
import Head from "next/head";

export default function Page() {
    const { user, isLoading } = useUser();
    console.log(user, isLoading);
    return (
        <Layout title={"홈"} hasTabBar>
            <Head>
                <title>Home</title>
            </Head>
            <div className={"flex flex-col space-y-5"}>
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
                    <Item
                        id={i}
                        key={i}
                        title={"iPhone 14"}
                        price={1000}
                        comments={1}
                        hearts={1}
                    />
                ))}
                <FloatingButton href="/products/upload">
                    <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                    </svg>
                </FloatingButton>
            </div>
        </Layout>
    );
}