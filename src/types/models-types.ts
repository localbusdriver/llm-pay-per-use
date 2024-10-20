export type ModelConfigType = {
    [model: string]: {
        [variant: string]: {
            modelUrl: string;
        };
    };
};

export type ModelAPIBodyType = {
    model: string; // e.g. "gemini"
    variant: string; // e.g. "gemini-1.5-flash-latest""
    prompt: string; // e.g. "Once upon a time..."
    api_key?: string; // e.g. "your-api-key"
};

export type AllModelsType = {
    title: string;
    logo: string;
    icon: string;
    className?: string;
};
