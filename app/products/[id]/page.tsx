"use client";
import type {NextPage} from "next";
import Skeleton from 'react-loading-skeleton'
import Layout from "@/components/layout";
import Button from "@/components/button";
import useSWR from "swr";
import 'react-loading-skeleton/dist/skeleton.css'
import Link from "next/link";
import {Product, User} from "@prisma/client";

interface ProductWithUser extends Product {
    user: User;
}

interface ItemDetailResponse {
    ok: boolean;
    product: ProductWithUser;
    relatedProducts: Product[];
}

const ItemDetail: NextPage = (params) => {
    const { params : { id } } = params;
    const { data } = useSWR<ItemDetailResponse>(id ? `/api/products/${id}` : null);
    return (
        <Layout canGoBack>
            <div className={"px-4 py-4"}>
                <div className={"mb-8"}>
                    <div className={"h-96 bg-slate-300"} />
                    <div className={"flex cursor-pointer py-3 border-t border-b items-center space-x-3"}>
                        <div className={"w-12 h-12 rounded-full bg-slate-300"} />
                        <div>
                            {data?.product?.user?.name ?
                                <p className={"text-sm font-medium text-gray-700"}>{data?.product?.user?.name}</p>
                                :
                                <Skeleton count={1} />
                            }
                            <Link legacyBehavior href={`/user/profiles/${data?.product?.user?.id}`}>
                                <a className={"text-xs font-medium text-gray-500"}>View profile &rarr;</a>
                            </Link>
                        </div>
                    </div>
                    <div className={"mt-5"}>
                        {data?.product?.name ?
                            <h1 className={"text-3xl font-bold text-gray-900"}>{data?.product?.name}</h1>
                            :
                            <Skeleton height={'36px'} className={'mb-2'} count={1} />
                        }
                        {data?.product?.price ?
                            <span className={"text-2xl mt-3 text-gray-900 block"}>{data?.product?.price}원</span>
                            :
                            <Skeleton height={'32px'} className={'mb-2'} count={1} />
                        }
                        {data?.product?.description ?
                            <p className={"text-base my-6 text-gray-700"}>
                                {data?.product?.description}
                            </p>
                            :
                            <Skeleton height={'20px'} count={2} className={'mb-2'} />
                        }
                        <div className={"flex items-center justify-between space-x-2"}>
                            <Button large text="Talk to seller" />
                            <button className={"p-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-400"}>
                                <svg
                                    className="h-6 w-6 "
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
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className={"text-2xl font-bold text-gray-900"}>Similar items</h2>
                    <div className={"mt-6 grid grid-cols-2 gap-4"}>
                        {data?.relatedProducts.map((product) => (
                            <Link legacyBehavior href={`/products/${product.id}`}>
                                <div key={product.id} className={'cursor-pointe'}>
                                        <div className={"h-56 w-full mb-4 bg-slate-300"} />
                                        <h3 className={"-mb-1 text-gray-700"}>{product.name}</h3>
                                        <span className={"text-sm font-medium text-gray-900"}>{product.price}원</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ItemDetail;