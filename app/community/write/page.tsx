"use client";
import type { NextPage } from "next";
import Button from "@/components/button";
import TextArea from "@/components/textarea";
import Layout from "@/components/layout";
import {useForm} from "react-hook-form";
import useMutation from "@/libs/client/useMutation";
import {useCallback, useEffect, useState} from "react";
import {Post} from "@prisma/client";
import {useRouter} from "next/navigation";
import useCoords from "@/libs/client/useCoords";

interface WriteForm {
    question: string;
    formErrors?: string;
}

interface WriteResponse {
    ok: boolean;
    post: Post;
}


const Write: NextPage = () => {
    const { latitude, longitude } = useCoords();
    const router = useRouter();
    const { register, handleSubmit, clearErrors, setError, formState: { errors } } = useForm<WriteForm>();
    const [post, {loading, data}] = useMutation<WriteResponse>("/api/posts");
    const onValid = (data: WriteForm) => {
        if (loading) return;
        if (data.question.length < 5) {
            return setError("formErrors", {message: '5글자 이상 입력해주세요.'});
        }
        post({...data, latitude, longitude});
    }
    const onClick = () => {
        if (errors.formErrors?.message) {
            clearErrors("formErrors");
        }
    };
    useEffect(() => {
        if (data?.ok) {
            router.push(`/community/${data.post.id}`);
        }
    }, [data, router])
    return (
        <Layout canGoBack title="글쓰기">
            <form onClick={onClick} onSubmit={handleSubmit(onValid)} className="p-4 space-y-4">
                <TextArea register={register("question", {required:true})} required placeholder="질문하세요!" />
                <Button text={loading ? "Loading..." : "Submit"} />
                {errors.formErrors ? <span className="my-2 text-red-500 text-sm block">{errors.formErrors.message}</span> : null}
            </form>
        </Layout>
    );
};

export default Write;