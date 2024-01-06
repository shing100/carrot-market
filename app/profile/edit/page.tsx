"use client";
import type {NextPage} from "next";
import Input from "@/components/input";
import Layout from "@/components/layout";
import Button from "@/components/button";
import useUser from "@/libs/client/useUser";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import useMutation from "@/libs/client/useMutation";

interface EditProfileForm {
    name: string;
    email: string;
    phone: string;
    formErrors?: string;
}

interface EditProfileResponse {
    ok: boolean;
    error?: string;
}

const EditProfile: NextPage = () => {
    const { user } = useUser();
    const { register,
        setValue,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<EditProfileForm>();
    useEffect(() => {
        if (user?.name) setValue("name", user?.name);
        if (user?.email) setValue("email", user?.email);
        if (user?.phone) setValue("phone", user?.phone);
    }, [user, setValue])

    const [ editProfile, { data, loading }] = useMutation<EditProfileResponse>("/api/users/me");
    useEffect(() => {
        if (data?.ok) {
            alert("프로필이 업데이트되었습니다.");
        } else if (data?.error) {
            setError("formErrors", {message: data.error});
        }
    }, [data, setError]);
    const onValid = (data: EditProfileForm) => {
        if (loading) return;
        if (data.name === "") {
            return setError("formErrors", {message: '닉네임을 입력해주세요.'});
        }
        if (data.email === "" && data.phone === "") {
            return setError("formErrors", {message: '이메일 또는 핸드폰 번호를 입력해주세요.'});
        }
        editProfile(data);
    };
    return (
        <Layout canGoBack title="Edit Profile">
            <form onSubmit={handleSubmit(onValid)} className="py-10 px-4 space-y-4">
                <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 rounded-full bg-slate-500" />
                    <label
                        htmlFor="picture"
                        className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
                    >
                        Change
                        <input
                            id="picture"
                            type="file"
                            className="hidden"
                            accept="image/*"
                        />
                    </label>
                </div>
                <Input register={register("name")} required={false} label="닉네임" name="name" type="text" />
                <Input register={register("email")} required={false} label="이메일 주소" name="email" type="email" />
                <Input register={register("phone")} required={false} label="핸드폰" name="phone" type="number" kind="phone" />
                {errors.formErrors ? <span className="my-2 text-red-500 text-sm block">{errors.formErrors.message}</span> : null}
                <Button text={loading ? "업데이트중...": "프로필 업데이트"} />
            </form>
        </Layout>
    );
};

export default EditProfile;