"use client";

import { Pixelify_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { AllModels, AllVariants, SupportedModels } from "@/data/models-routes";
import { cn } from "@/lib/utils";
import { AllModelsType } from "@/types/models-types";

const pixelify = Pixelify_Sans({
    weight: ["400", "700"],
    subsets: ["latin"],
});

export default function Home() {
    const [accordionState, setAccordionState] = useState<AllModelsType | null>(
        null
    );
    return (
        <div className="pt-18 px-36 pb-36">
            <header className="items-center gap-8 md:flex">
                <div className="md:max-w-[600px]">
                    <h1 className="text-start text-6xl font-bold tracking-wide">
                        Accelerate your work through
                        <br />
                        <span className={pixelify.className}>
                            LLM Pay p/Use
                        </span>
                    </h1>
                    <p className="mt-6 text-start text-xl text-[#b3b3b3]">
                        Add your API Key to get started!
                    </p>
                </div>

                <div
                    className="mx-auto mt-20 flex h-[221px] w-[500px] items-center justify-center rounded-xl shadow-xl"
                    style={{
                        backgroundImage: "url(/assets/hero/gemini-flash.png)",
                        backgroundSize: "500px 221px",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <h1 className="glass mt-44 w-max rounded-lg p-4 text-sm text-[#b3b3b3] shadow-xl">
                        Start by trying&nbsp;
                        <Link
                            className={cn(
                                "rounded-lg bg-[#b3b3b3] px-3 py-2 text-2xl text-zinc-200 shadow-md transition-all duration-200 ease-in-out hover:bg-zinc-200 hover:text-[#b3b3b3]",
                                pixelify.className
                            )}
                            href={"/models/gemini/flash"}
                        >
                            Flash
                        </Link>
                        &nbsp;
                        <Link
                            href="https://gemini.google.com/"
                            className="text-zinc text-sm italic underline transition-all duration-200 ease-in-out hover:text-zinc-500"
                        >
                            by Gemini
                        </Link>
                    </h1>
                </div>
            </header>

            <section className="space-y-8 py-24">
                <div className="">
                    <h1 className="text-xl text-[#b3b3b3]">
                        Currently supporting:
                    </h1>
                    <div className="flex items-start justify-between">
                        <Accordion
                            type="single"
                            collapsible
                            className="min-w-[300px]"
                        >
                            {AllModels.filter((model) =>
                                SupportedModels.includes(model.title)
                            ).map((model, i) => (
                                <AccordionItem
                                    key={`supported-accordion-${model.title}-${i}`}
                                    value={`${model.title}`}
                                    onClick={() =>
                                        setAccordionState(
                                            accordionState
                                                ? accordionState === model
                                                    ? null
                                                    : model
                                                : model
                                        )
                                    }
                                >
                                    <AccordionTrigger
                                        className={cn(
                                            "text-4xl",
                                            pixelify.className
                                        )}
                                    >
                                        {model.title.charAt(0).toUpperCase() +
                                            model.title.slice(1)}
                                    </AccordionTrigger>
                                    <AccordionContent className="flex justify-between">
                                        <div className="flex flex-col gap-2">
                                            {AllVariants[model.title].map(
                                                (variation, i) => (
                                                    <p
                                                        key={`${variation}-${i}`}
                                                    >
                                                        {variation}
                                                    </p>
                                                )
                                            )}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                        {accordionState && (
                            <Image
                                src={accordionState.logo}
                                alt={accordionState.title}
                                width={100}
                                height={30}
                                className="h-44 w-auto max-w-[800px]"
                            />
                        )}
                    </div>
                </div>
                <div className="">
                    <h1 className="text-xl text-[#b3b3b3]">Coming Soon:</h1>
                </div>
            </section>
        </div>
    );
}
