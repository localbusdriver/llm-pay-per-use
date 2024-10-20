"use client";

import { Pixelify_Sans } from "next/font/google";
import { useRef, useState } from "react";

import MessageSendContainer from "@/components/model/message-send-container";
import ModelSelect from "@/components/model/model-selector";
import ParameterSelector from "@/components/model/parameter-selector";
import ResponseDisplayContainer from "@/components/model/response-display-container";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { AllVariants, SupportedModels } from "@/data/models-routes";
import { markdownToHtml } from "@/lib/utils";

const pixelifySans = Pixelify_Sans({
    style: "normal",
    weight: "400",
    subsets: ["latin"],
});

const Page = () => {
    const [error, setError] = useState<string>();
    const [prompt, setPrompt] = useState<string>("");
    const [model, setModel] = useState<string>(SupportedModels[0]);
    const [variant, setVariant] = useState<string>(AllVariants[model][0]);
    const [key, setKey] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const responseRef = useRef<HTMLDivElement>(null);

    const handleChangePrompt = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
    };
    const handleChangeKey = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKey(e.target.value);
    };

    const requestData = async () => {
        setLoading(true);

        if (!prompt) {
            setError("Please enter a prompt");
            setLoading(false);
            return;
        }
        if (!model) {
            setError("Please select a model");
            setLoading(false);
            return;
        }

        if (!variant) {
            setError("Please select a variant");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/models", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: model.toLowerCase(),
                    variant: variant.toLowerCase(),
                    prompt: prompt,
                    key: key,
                }),
            });
            const data = await response.json();
            console.log(data);
            if (responseRef.current) {
                setPrompt("");
                responseRef.current.innerHTML = markdownToHtml(
                    data.candidates[0].content.parts[0].text
                );
            } else {
                setError("Error fetching data");
            }
        } catch (error) {
            console.error(error);
            setError("Error fetching data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="w-screen px-2 sm:px-20 lg:px-36">
            <section className="mx-auto flex flex-col gap-4 sm:w-5/6 lg:w-3/5 xl:flex-row">
                <ParameterSelector
                    model={model}
                    setModel={setModel}
                    variant={variant}
                    setVariant={setVariant}
                    key={key}
                    setKey={setKey}
                    className=""
                />
                <div className="flex w-full flex-col items-center gap-2">
                    <ResponseDisplayContainer
                        model={model}
                        responseRef={responseRef}
                        loading={loading}
                        error={error}
                        className="w-full"
                    />
                    <MessageSendContainer
                        model={model}
                        handleChangePrompt={handleChangePrompt}
                        requestData={requestData}
                        className="w-full"
                    />
                </div>
            </section>
        </main>
    );
};

export default Page;
