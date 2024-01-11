"use client";
import type {NextPage} from "next";
import Layout from "@/components/layout";
import Link from "next/link";
import FloatingButton from "@/components/floating-button";
import {Stream} from "@prisma/client";
import useSWRInfinite from "swr/infinite";
import {useInfiniteScroll} from "@/libs/client/useinfiniteScroll";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import {useEffect} from "react";

interface StreamResponse {
    ok: boolean;
    streams: Stream[];
    pages: number;
}

const getKey = (pageIndex: number, previousPageData: StreamResponse) => {
    if (pageIndex === 0) return `/api/streams?page=1`;
    if (pageIndex + 1 > previousPageData.pages) return null;
    return `/api/streams?page=${pageIndex + 1}`;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());


const Stream: NextPage = () => {
    const { data, setSize, isLoading } = useSWRInfinite<StreamResponse>(getKey, fetcher);
    const streams = data ? data.map((item) => item.streams).flat() : [];
    const page = useInfiniteScroll();
    console.log(isLoading);
    useEffect(() => {
        setSize(page);
    }, [setSize, page]);
    return (
        <Layout hasTabBar title={"라이브"}>
            <div className={"divide-y-[1px] space-y-4"}>
                {isLoading ? <Skeleton width={"95%"} height={"280px"} className={"w-full justify-center mt-5 mb-10 rounded-md"} count={3}/> : null}
                {streams?.map((stream) => (
                    <Link legacyBehavior key={stream.id} href={`/streams/${stream.id}`}>
                        <a className="pt-4 block  px-4">
                            <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
                            <h1 className="text-2xl mt-2 font-bold text-gray-900">
                                {stream.name}
                            </h1>
                        </a>
                    </Link>
                ))}
            <FloatingButton href="/streams/create">
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    ></path>
                </svg>
            </FloatingButton>
        </div>
        </Layout>
    );
}

export default Stream;