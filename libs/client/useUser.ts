import {usePathname, useRouter} from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";
import {User} from "@prisma/client";

interface ProfileResponse {
    ok: boolean;
    profile: User;
}

export default function useUser() {
    const { data, error } = useSWR<ProfileResponse>("/api/users/me");
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        if (data && !data.ok && pathname !== "/enter") {
            router.replace("/enter");
        }
    }, [data, router]);
    return { user: data?.profile, isLoading: !data && !error };
}