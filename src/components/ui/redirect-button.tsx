"use client";

import { Route } from "next";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const RedirectButton = ({
    children,
    className,
    link,
}: {
    children: React.ReactNode;
    className: string;
    link: string;
}) => {
    const router = useRouter();
    const handleRedirect = () => {
        router.push(link as Route);
    };

    return (
        <Button
            onClick={handleRedirect}
            className={cn(
                "rounded-lg bg-[#b3b3b3] px-3 py-2 text-2xl text-zinc-200 shadow-md transition-all duration-200 ease-in-out hover:bg-zinc-200 hover:text-[#b3b3b3]",
                className
            )}
        >
            {children}
        </Button>
    );
};

export default RedirectButton;
