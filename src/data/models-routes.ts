import { AllModelsType, ModelConfigType } from "@/types/models-types";

export const ModelsAndVariants: ModelConfigType = {
    gemini: {
        "gemini-1.5-flash-latest": {
            modelUrl:
                "https://generativelanguage.googleapis.com/v1beta/models/",
        },
    },
};

export const AllVariants: {
    [key: string]: string[];
} = {
    gemini: [
        "gemini-1.5-flash",
        "gemini-1.5-flash-8b",
        "gemini-1.5-pro",
        "gemini-1.0-pro",
    ],
    anthropic: [
        "claude-3.5-sonnet",
        "claude-3-sonnet",
        "claude-3-opus",
        "claude-3-haiku",
    ],
    "open-ai": [
        "gpt-4o",
        "gpt-4o-mini",
        "gpt-4-turbo",
        "gpt-4",
        "gpt-3.5-turbo",
    ],
};

export const VariantVersions: {
    [model: string]: {
        modelUrl: string;
        [variant: string]: string;
    };
} = {
    gemini: {
        modelUrl: "https://generativelanguage.googleapis.com/v1beta/models/",
        "gemini-1.5-pro": "gemini-1.5-pro-latest",
        "gemini-1.5-flash": "gemini-1.5-flash-latest",
        "gemini-1.5-flash-8b": "gemini-1.5-flash-8b-latest",
        "gemini-1.0-pro": "gemini-1.0-pro-latest",
    },
    anthropic: {
        modelUrl: "",
        "claude-3.5-sonnet": "claude-3-5-sonnet-20240620",
        "claude-3-sonnet": "claude-3-sonnet-20240229",
        "claude-3-opus": "claude-3-opus-20240229",
        "claude-3-haiku": "claude-3-haiku-20240307",
    },
    "open-ai": {
        modelUrl: "",
        "gpt-4o": "gpt-4o-latest",
        "gpt-4o-mini": "gpt-4o-mini",
        "gpt-4-turbo": "gpt-4-turbo",
        "gpt-4": "gpt-4",
        "gpt-3.5-turbo": "gpt-3.5-turbo",
    },
};
export const SupportedModels: string[] = ["gemini", "anthropic", "open-ai"];
export const AllModels: AllModelsType[] = [
    {
        title: "gemini",
        logo: "/assets/icons/logos/gemini/Google_Gemini_logo.svg",
        icon: "",
        className: "h-[40px]",
    },
    {
        title: "open-ai",
        logo: "/assets/icons/logos/openai/openai-lockup.svg",
        icon: "",
    },
    {
        title: "anthropic",
        logo: "/assets/icons/logos/anthropic/full-black/Anthropic_Logo_0.svg",
        icon: "",
    },
];

type ModelAboutType = {
    [Model: string]: {
        [variant: string]: {
            Description: string;
            Strengths: string;
            MultiLingual: string;
            Vision: string;
            "Message-Batches-API": string;
            "API-Model-Name": string;
            "API format": string;
            "Comparative latency": string;
            "Context window": string;
            "Max-Outputs": { value: number; unit: string } | string;
            Cost: { unit: string; value: string };
        };
    };
};
export const AboutModels: ModelAboutType = {
    Anthropic: {
        "claude-3.5-sonnet": {
            Description: "Most intelligent model",
            Strengths: "Highest level of intelligence and capability",
            MultiLingual: "Yes",
            Vision: "Yes",
            "Message-Batches-API": "Yes",
            "API-Model-Name": "claude-3-5-sonnet-20240620",
            "API format": "Messages API",
            "Comparative latency": "Fast",
            "Context window": "200K",
            "Max-Outputs": { value: 8192, unit: "tokens" },
            Cost: { unit: "Input / Output per MTok", value: "$3.00 / $15.00" },
        },
        "claude-3-opus": {
            Description: "Powerful model for highly complex tasks",
            Strengths:
                "Top-level performance, intelligence, fluency, and understanding",
            MultiLingual: "Yes",
            Vision: "Yes",
            "Message-Batches-API": "Yes",
            "API-Model-Name": "claude-3-opus-20240229",
            "API format": "Messages API",
            "Comparative latency": "Moderately Fast",
            "Context window": "200K",
            "Max-Outputs": { value: 4096, unit: "tokens" },
            Cost: { unit: "Input / Output per MTok", value: "$15.00 / $75.00" },
        },
        "claude-3-sonnet": {
            Description: "Balance of intelligence and speed",
            Strengths: "Strong utility, balanced for scaled deployments",
            MultiLingual: "Yes",
            Vision: "Yes",
            "Message-Batches-API": "No",
            "API-Model-Name": "claude-3-sonnet-20240229",
            "API format": "Messages API",
            "Comparative latency": "Fast",
            "Context window": "200K",
            "Max-Outputs": { value: 4096, unit: "tokens" },
            Cost: { unit: "Input / Output per MTok", value: "$3.00 / $15.00" },
        },
        "claude-3-haiku": {
            Description: "Most intelligent model",
            Strengths: "Highest level of intelligence and capability	",
            MultiLingual: "Yes",
            Vision: "Yes",
            "Message-Batches-API": "Yes",
            "API-Model-Name": "claude-3-haiku-20240307",
            "API format": "Messages API",
            "Comparative latency": "Fastest",
            "Context window": "200K",
            "Max-Outputs": { value: 4096, unit: "tokens" },
            Cost: { unit: "Input / Output per MTok", value: "$3.00 / $15.00" },
        },
    },
    Gemini: {
        "claude-3-haiku": {
            Description: "Most intelligent model",
            Strengths: "Highest level of intelligence and capability	",
            MultiLingual: "Yes",
            Vision: "Yes",
            "Message-Batches-API": "Yes",
            "API-Model-Name": "claude-3-haiku-20240307",
            "API format": "Messages API",
            "Comparative latency": "Fastest",
            "Context window": "200K",
            "Max-Outputs": { value: 4096, unit: "tokens" },
            Cost: { unit: "Input / Output per MTok", value: "$3.00 / $15.00" },
        },
    },
};
