"use client";

import { Pixelify_Sans } from "next/font/google";
import Link from "next/link";

import { ArrowLeftIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";

import { useSideBarContext } from "@/components/model/sidebar-page-context";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarSeparator,
} from "@/components/ui/sidebar";

import { AllModels, AllVariants } from "@/data/models-routes";
import { cn } from "@/lib/utils";

const pixelify = Pixelify_Sans({
    weight: ["400", "700"],
    subsets: ["latin"],
});

const AppSidebar = () => {
    const { model, setModel, variant, setVariant, key, setKey } =
        useSideBarContext();
    return (
        <Sidebar>
            <SidebarHeader className="flex flex-col gap-0">
                <SidebarGroupLabel>current model</SidebarGroupLabel>
                <h1
                    className={cn(
                        "p-0 text-5xl capitalize",
                        pixelify.className
                    )}
                >
                    <Select onValueChange={(value) => setModel(value)}>
                        <SelectTrigger className="border-none pl-0 text-5xl capitalize shadow-none">
                            <SelectValue placeholder={model || "model"}>
                                {model}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {AllModels.map((m) => (
                                <SelectItem
                                    key="m"
                                    value={m.title}
                                    className="capitalize"
                                >
                                    {m.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </h1>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent id="sidebar-content-variant-select">
                <SidebarGroup>
                    <SidebarGroupLabel>Variant</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <Select onValueChange={(value) => setVariant(value)}>
                            <SelectTrigger className="capitalize">
                                <SelectValue placeholder={variant || "variant"}>
                                    {variant}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {AllVariants[model].map((v) => (
                                    <SelectItem
                                        key={v}
                                        value={v}
                                        className="capitalize"
                                    >
                                        {v}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup id="sidebar-content-key-input">
                    <div className="flex items-center justify-between">
                        <SidebarGroupLabel>API Key:</SidebarGroupLabel>
                        <Button
                            variant="ghost"
                            className="size-7 p-0 text-black/[0.4]"
                        >
                            <QuestionMarkCircledIcon />
                        </Button>
                    </div>
                    <SidebarGroupContent>
                        <SidebarInput
                            placeholder="Super secret API key"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setKey(e.target.value)}
                            value={key || undefined}
                        />
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Link href="/">
                    <Button
                        variant="ghost"
                        className="flex items-center justify-start gap-2"
                    >
                        <ArrowLeftIcon /> Back Home
                    </Button>
                </Link>
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;
