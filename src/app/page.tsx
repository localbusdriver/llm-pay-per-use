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

import Navbar from "@/components/ui/navbar";

import Footer from "@/components/footer/footer"
import { AllModels, AllVariants, SupportedModels } from "@/data/models-routes";
import { cn } from "@/lib/utils";
import { AllModelsType } from "@/types/models-types";

const pixelify = Pixelify_Sans({
    weight: ["400", "700"],
    subsets: ["latin"],
});

export default function Home() {

    return (
        <>
            <Navbar />
            <main className="px-2 sm:px-20 lg:px-36 pb-36 pt-18">
                <Header />
                <SupportingModels />
            </main>
            <Footer />
        </>
    );
}

const Header = () => {
    return (
        <header className="mt-20 flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="md:max-w-[600px]">
                <h1 className="text-center text-xl font-bold tracking-wide lg:text-start text-black/[0.4]">
                    Accelerate your work through
                    <br />
                    <span className={cn(pixelify.className, "text-6xl text-primary")}>
                        LLM Pay p/Use
                    </span>
                </h1>
                <p className="mt-6 text-center text-xl text-[#b3b3b3] lg:text-start">
                    Add your API Key to get started!
                </p>
            </div>

            <div
                className="flex h-[221px] min-w-[500px] max-w-[500px] items-center justify-center rounded-xl px-0 shadow-xl"
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
                        href={"/models"}
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
    )
}

const SupportingModels = () => {
    const [accordionState, setAccordionState] = useState<AllModelsType | null>(
        null
    );
    return (
        <section className="space-y-8 py-24">
            <div className="">
                <h1 className="text-center text-xl text-[#b3b3b3] lg:text-start">
                    Currently supporting:
                </h1>
                <div className="flex flex-col justify-between gap-12 md:items-center lg:flex-row lg:items-start">
                    <Accordion
                        type="single"
                        collapsible
                        className="mx-auto min-w-[350px] md:mx-0 md:w-[600px]"
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
                            height={40}
                            className="mx-auto h-auto max-w-[800px] sm:mx-0 md:max-w-[500px] lg:h-44 lg:w-auto"
                        />
                    )}
                </div>
            </div>
            <div className="">
                <h1 className="text-center text-xl text-[#b3b3b3] lg:text-start">
                    Coming Soon:
                </h1>
            </div>
        </section>
    )
}