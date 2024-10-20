"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import {
    AllModels,
    AllVariants,
    ModelsAndVariants,
    SupportedModels,
} from "@/data/models-routes";
import { markdownToHtml } from "@/lib/utils";

const Page = () => {
    const [error, setError] = useState<string>();
    const [prompt, setPrompt] = useState<string>("");
    const [model, setModel] = useState<string>(SupportedModels[0]);
    const [variant, setVariant] = useState<string>(AllVariants[model][0]);
    const [key, setKey] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const responseRef = useRef<HTMLDivElement>(null);

    const handleChangePrompt = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        <main className="px-36">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Label htmlFor="model-select">Model:</Label>
                    <ModelSelect
                        id="model-select"
                        value={model}
                        onChange={setModel}
                        options={SupportedModels}
                    />
                    <ModelSelect
                        id="variant-select"
                        value={variant}
                        onChange={setVariant}
                        options={AllVariants[model]}
                    />
                </div>
                <div className="flex items-center justify-center gap-2">
                    <Label htmlFor="key-input">Your key:</Label>
                    <Input
                        id="key-input"
                        onChange={handleChangeKey}
                        value={key}
                        className="w-[200px]"
                    />
                </div>
            </div>
            <div>
                <h1 className="text-2xl">Response:</h1>
                {error && <p>{error}</p>}
                {loading && <p>Loading...</p>}
                <div ref={responseRef}></div>
            </div>

            <Textarea onChange={handleChangePrompt} value={prompt} />
            <Button onClick={requestData} disabled={loading}>
                {"Send"}
            </Button>
        </main>
    );
};

export default Page;

function ModelSelect({
    id,
    value,
    onChange,
    options,
}: {
    id: string;
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
    options: string[];
}) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger id={id} className="w-[150px]">
                <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
                {options
                    ? options.map((option, i) => (
                          <SelectItem key={option + i} value={option}>
                              {id === "model-select"
                                  ? option.charAt(0).toUpperCase() +
                                    option.slice(1)
                                  : option}
                          </SelectItem>
                      ))
                    : null}
            </SelectContent>
        </Select>
    );
}
