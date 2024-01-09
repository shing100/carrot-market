"use client";
import Layout from "../components/layout";
import Item from "../components/item";
import FloatingButton from "../components/floating-button";
import useUser from "@/libs/client/useUser";
import Head from "next/head";
import {Product} from "@prisma/client";
import useSWRInfinite from "swr/infinite";
import {useInfiniteScroll} from "@/libs/client/useinfiniteScroll";
import {useEffect} from "react";

export interface ProudctWithHeart extends Product {
    _count: {
        favs: number;
    }
}

interface ProductsResponse {
    ok : boolean;
    products: ProudctWithHeart[];
    pages: number;
}

const getKey = (pageIndex: number, previousPageData: ProductsResponse) => {
    if (pageIndex === 0) return `/api/products?page=1`;
    if (pageIndex + 1 > previousPageData.pages) return null;
    return `/api/products?page=${pageIndex + 1}`;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page() {
    const { user, isLoading } = useUser();
    const { data, setSize } = useSWRInfinite<ProductsResponse>(getKey, fetcher);
    const products = data ? data.map((item) => item.products).flat() : [];
    const page = useInfiniteScroll();
    useEffect(() => {
        setSize(page);
    }, [setSize, page]);
    return (
        <Layout title={"홈"} hasTabBar>
            <Head>
                <title>Home</title>
            </Head>
            <div className={"flex flex-col space-y-5"}>
                {products?.map((product) => (
                    <Item
                        key={product.id}
                        id={product.id}
                        title={product.name}
                        price={product.price}
                        image={product.image}
                        hearts={product._count.favs}
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