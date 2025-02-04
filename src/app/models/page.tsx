tsx
// src/app/models/page.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { fetchGeminiModels, fetchOpenAIModels } from '@/lib/model-fetch';

import ResponseDisplayContainer from '@/components/model/response-display-container';
import MessageSendContainer from '@/components/model/message-
send-container';
import ParameterSelector from '@/components/model/parameter-selector';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ApiResponse {
    response: any; // Adjust the type according to your actual response structure
    usage: any; // Adjust the type according to your actual response structure
}

const ModelPage = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string >("");
    const [model, setModel] = useState<string>('gemini-pro');
    const [variant, setVariant] = useState<string>('gemini-pro');
    const [key, setKey] = useState<string>('');

    const responseRef = useRef<HTMLDivElement>(null);
    const params = useSearchParams();

    const handleChangePrompt = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(event.target.value);
    };

    const requestData = async () => {
        setLoading(true);
        setError("");
        try {
            let apiResponse: ApiResponse;
            if (model === 'gemini') {
                apiResponse = await fetchGeminiModels(key, variant, prompt);
            } else if (model === 'openai') {
                apiResponse = await fetchOpenAIModels(key, variant, prompt);
            } else {
                throw new Error('Invalid model selected');
            }
            console.log('api response', apiResponse);
            setResponse(apiResponse.response);
            // Additional logic to handle usage if needed
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <main className="w-screen px-2 sm:px-20 lg:px-36">
            <section className="mx-auto flex flex-col gap-4 sm:w-5/6 lg:w-3/5 xl:flex-row">
                {/* Sidebar for Model and Key Selection */}
                
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
                        prompt={prompt}
                    />
                </div>
            </section>
        </main>
    );
};

export default ModelPage;
