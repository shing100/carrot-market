"use client";
import type { NextPage } from "next";
import Layout from "@/components/layout";
import TextArea from "@/components/textarea";
import {Answer, Post, User} from "@prisma/client";
import useSWR from "swr";
import Link from "next/link";
import useMutation from "@/libs/client/useMutation";
import {cls} from "@/libs/client/utils";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Image from "next/image";
import {useFormatter} from "next-intl";

const useRelativeTime = (dateStr: string) => {
    const format = useFormatter();
    const dateTime = new Date(dateStr);

    // At 2020-11-20T10:36:00.000Z,
    // this will render "2 hours ago"
    return format.relativeTime(dateTime);
}

interface AnswerWithUser extends Answer {
    user: User;
}

interface PostWithUser extends Post{
    user: User;
    _count: {
        answers: number;
        wondering: number;
    }
    answers: AnswerWithUser[];
}

interface CommunityPostResponse {
    ok: boolean;
    post: PostWithUser;
    isWondering: boolean;
}

interface AnswerForm {
    answer: string;
}

interface AnswerResponse {
    ok: boolean;
    answer: Answer;
}

const CommunityPostDetail: NextPage = (props) => {
    const { params } : any = props;
    const { register, handleSubmit, reset} = useForm<AnswerForm>();
    const { data, mutate, error, isLoading } = useSWR<CommunityPostResponse>(params.id ? `/api/posts/${params.id}`:  null);
    const [ wonder, { loading } ] = useMutation(`/api/posts/${params.id}/wonder`);
    const onWonderClick = () => {
        if (!data) return;
        mutate({
            ...data,
            post: {
                ...data.post,
                _count: {
                    ...data.post._count,
                    wondering: data.isWondering ? data.post._count.wondering - 1 : data.post._count.wondering + 1,
                },
            },
            isWondering: !data.isWondering,
        }, false);
        if (!loading) {
            wonder({});
        }
    }

    const [ sendAnswer, { data: answerData,  loading: answerLoading, error: answerError } ] = useMutation<AnswerResponse>(`/api/posts/${params.id}/answers`);
    const onValid = (form: AnswerForm) => {
        if (answerLoading) return;
        sendAnswer(form);
    }
    useEffect(() => {
        if (answerError) console.log(answerError);
        if (answerData && answerData.ok) {
            reset();
            mutate();
        }
    }, [answerData, reset, mutate]);
    return (
        <Layout canGoBack>
            <div className="ml-1">
                <span className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  동네질문
                </span>
                <div className="flex mb-3 px-4 cursor-pointer pb-3  border-b items-center space-x-3">
                    {data?.post.user.avatar ? (
                        <Image width={40} height={40} className={"w-10 h-10 rounded-full bg-slate-300"} src={`https://imagedelivery.net/u1s6ESEE0Zneb43goOtlDA/${data?.post.user.avatar}/avatar`} alt={data?.post.user.name} />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-300" />
                    )}
                    <div>
                        {isLoading ? <Skeleton count={1} /> : null}
                        <p className="text-sm font-medium text-gray-700">{data?.post?.user?.name}</p>
                        <Link legacyBehavior href={`/profile/${data?.post?.user?.id}`}>
                            <p className="text-xs font-medium text-gray-500">
                                View profile &rarr;
                            </p>
                        </Link>
                    </div>
                </div>
                <div>
                    <div className="mt-2 px-4 text-gray-700">
                        {isLoading ? <Skeleton count={1} width="70%"/> : <span className="text-orange-500 font-medium mr-1">Q. </span>}
                        {" "}{data?.post?.question}
                    </div>
                        <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px]  w-full">
                            <button onClick={onWonderClick} className={cls("flex space-x-2 items-center text-sm", data?.isWondering ? "text-teal-400" : "")}>
                              <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                              </svg>
                          <span>궁금해요 {data?.post?._count?.wondering}</span>
                        </button>
                        <span className="flex space-x-2 items-center text-sm">
                          <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            ></path>
                          </svg>
                          <span>답변 {data?.post?._count?.answers}</span>
                        </span>
                    </div>
                </div>
                <div className="px-4 my-5 space-y-5">
                    {data?.post?.answers?.map((answer) => (
                        <div key={answer.id} className="flex items-start space-x-3">
                            {answer.user.avatar ? (
                                <Image width={40} height={40} className={"w-10 h-10 rounded-full bg-slate-300"} src={`https://imagedelivery.net/u1s6ESEE0Zneb43goOtlDA/${answer.user.avatar}/avatar`} alt={answer.user.name} />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-slate-300" />
                            )}
                            <div>
                                <span className="text-sm block font-medium text-gray-700">
                                    {answer.user.name}
                                </span>
                                <span className="text-xs text-gray-500 block ">{useRelativeTime(answer.createdAt.toString())}</span>
                                <p className="text-gray-700 mt-2">
                                    {answer.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit(onValid)}>
                    <div className="px-4">
                        <TextArea
                            register={register("answer", {required: true, minLength: 2})}
                            name="description"
                            placeholder="질문에 답변해주세요!"
                            required
                        />
                        <button className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none ">
                            {answerLoading ? "Loading... " : "작성하기"}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default CommunityPostDetail;