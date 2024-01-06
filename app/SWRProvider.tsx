"use client";
import {SWRConfig} from "swr";
import useUser from "@/libs/client/useUser";

export const SWRProvider = ({ children }: { children: React.ReactNode; }) => {
    useUser();
    return (
        <SWRConfig
            value={{
        // refreshInterval: 2000,
                fetcher: (url: string) => fetch(url).then(res => res.json())
            }}>
            {children}
        </SWRConfig>
    )
};
