"use client";
import { SWRConfig } from "swr";

export const SWRProvider = ({ children }: { children: React.ReactNode; }) => {
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
