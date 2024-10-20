import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

import {
    AllVariants,
    SupportedModels,
    VariantVersions,
} from "@/data/models-routes";

export const fetchAnthropicModels = async (
    key: string,
    variant: string,
    prompt: string,
    maxTokens?: number
) => {
    const anthropic = new Anthropic({
        apiKey: key, // defaults to process.env["ANTHROPIC_API_KEY"]
    });

    const msg = await anthropic.messages.create({
        model: VariantVersions.anthropic[variant],
        max_tokens: maxTokens || 1024,
        messages: [{ role: "user", content: prompt }],
    });
    console.log(msg);
    return { response: msg, usage: "Not available" };
};

export const fetchGeminiModels = async (
    key: string,
    variant: string,
    prompt: string
) => {
    const genAI = new GoogleGenerativeAI(
        key || (process.env.GEMINI_API_KEY as string)
    );

    const model = genAI.getGenerativeModel({ model: variant });
    const result = await model.generateContent(prompt);

    console.log(result.response.text());
    return { response: result.response.text(), usage: "" };
};

export const fetchOpenAIModels = async (
    key: string,
    variant: string,
    prompt: string
) => {
    // const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${key}`,
    //   },
    //   body: JSON.stringify({
    //     model: variant,
    //     messages: [{ role: "user", content: prompt }],
    //     temperature: 0.7,
    //   }),
    // });

    const openai = new OpenAI({ apiKey: key });

    const response = await openai.chat.completions.create({
        model: variant,
        messages: [{ role: "user", content: prompt }],
        stream: false,
    });
    return { response: response.choices[0], usage: response.usage };
};

export const fetchModels = async (
    key: string,
    model: string,
    variant: string,
    prompt: string,
    maxTokens?: number
) => {
    if (!model) {
        throw new Error("No model provided");
    }
    if (!SupportedModels.includes(model)) {
        throw new Error(`Model ${model} not supported`);
    }
    if (!variant) {
        throw new Error(`No variant provided for ${model}`);
    }
    if (!AllVariants[model].includes(variant)) {
        throw new Error(`Variant ${variant} not supported for ${model}`);
    }
    if (!key) {
        throw new Error(`No key provided for ${model}`);
    }
    if (!prompt) {
        throw new Error(`No prompt provided for ${model}`);
    }

    switch (model) {
        case "Gemini": {
            return fetchGeminiModels(
                key,
                VariantVersions[model][variant],
                prompt
            );
        }
        case "Anthropic": {
            return fetchAnthropicModels(
                key,
                VariantVersions[model][variant],
                prompt,
                maxTokens || 1024
            );
        }
        case "Open-AI": {
            return fetchOpenAIModels(
                key,
                VariantVersions[model][variant],
                prompt
            );
        }
    }
};
