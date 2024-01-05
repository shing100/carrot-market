"use client";
import type { NextPage } from "next";
import Button from "@/components/button";
import TextArea from "@/components/textarea";
import Layout from "@/components/layout";
import {useForm} from "react-hook-form";
import useMutation from "@/libs/client/useMutation";
import {useEffect} from "react";
import {Post} from "@prisma/client";
import {useRouter} from "next/navigation";

interface WriteForm {
    question: string;
}

interface WriteResponse {
    ok: boolean;
    post: Post;
}

const Write: NextPage = () => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<WriteForm>();
    const [post, {loading, data}] = useMutation<WriteResponse>("/api/posts");
    const onValid = (data: WriteForm) => {
        if (loading) return;
        post(data);
    }
    useEffect(() => {
        if (data?.ok) {
            router.push(`/community/${data.post.id}`);
        }
    }, [data, router])
    return (
        <Layout canGoBack title="글쓰기">
            <form onSubmit={handleSubmit(onValid)} className="p-4 space-y-4">
                <TextArea register={register("question", {required:true, minLength: 5})} required placeholder="질문하세요!" />
                <Button text={loading ? "Loading..." : "Submit"} />
            </form>
        </Layout>
    );
};

export default Write;