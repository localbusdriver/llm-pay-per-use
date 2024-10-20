import { NextRequest, NextResponse } from "next/server";

import { SupportedModels, VariantVersions } from "@/data/models-routes";

export async function POST(req: NextRequest) {
    try {
        const {
            model,
            variant,
            prompt,
            api_key = process.env.GEMINI_API_KEY,
        }: {
            model: string;
            variant: string;
            prompt: string;
            api_key: string | undefined;
        } = await req.json();

        console.log("model", model);
        console.log("variant", variant, VariantVersions[model][variant]);
        console.log("prompt", prompt);
        console.log("api_key", api_key);

        if (!prompt) {
            console.log("Prompt is not provided");
            return NextResponse.json(
                { error: "Prompt is required" },
                { status: 400 }
            );
        }

        if (!model || !variant) {
            console.error("Model and variant are not provided");
            return NextResponse.json(
                { error: "Model and variant are required" },
                { status: 400 }
            );
        }

        if (
            !VariantVersions[model][variant] ||
            !SupportedModels.includes(model)
        ) {
            console.error("Model or variant not found");
            return NextResponse.json(
                { error: "Model or variant not found" },
                { status: 404 }
            );
        }

        const modelUrl = `${
            VariantVersions[model].modelUrl
        }${variant}:generateContent?key=${api_key}`;
        console.log("api", modelUrl);
        const response = await fetch(modelUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                { error: errorData.error.message || "API request failed" },
                { status: response.status }
            );
        }
        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Error in API route: ", error);
        return NextResponse.json(
            { error: "Error in API route" },
            { status: 500 }
        );
    }
}
