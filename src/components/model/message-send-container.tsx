import { Pixelify_Sans } from "next/font/google";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

const pixelifySans = Pixelify_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const MessageSendContainer = ({
    model,
    handleChangePrompt,
    requestData,
    className,
    prompt,
}: {
    model: string;
    handleChangePrompt: (e: React.ChangeEvent<HTMLInputElement>) => void;
    requestData: () => Promise<void>;
    className?: string;
    prompt?: string;
}) => {
    const inputPlaceholders = [
        "What's on your mind?",
        "Need help?",
        "How big is uranus?",
    ];
    return (
        <Card className={cn("md:px-8", className)}>
            <CardHeader>
                <CardTitle className="font-normal text-gray-500">
                    To&nbsp;&nbsp;
                    <span
                        className={cn(
                            "text-3xl text-primary",
                            pixelifySans.className
                        )}
                    >
                        {model.charAt(0)[0].toUpperCase() + model.slice(1)}
                    </span>
                    :
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <span className="text-gray-500">
                    Type your message below 👇
                </span>
                {/* <PlaceholdersAndVanishInput
                    onChange={handleChangePrompt}
                    onSubmit={requestData}
                    placeholders={inputPlaceholders}
                    className="mx-0"
                /> */}
                <Input
                    onChange={handleChangePrompt}
                    onSubmit={requestData}
                    placeholder="Type your message here"
                    className="mx-0"
                />
                <Button
                    onClick={requestData}
                    className="hover:bg-primary-dark bg-primary text-white"
                >
                    Send
                </Button>
            </CardContent>
            <CardFooter>
                <CardDescription>
                    Thanks for using{" "}
                    <span className={cn("", pixelifySans.className)}>
                        LLM Pay/Use
                    </span>
                </CardDescription>
            </CardFooter>
        </Card>
    );
};

export default MessageSendContainer;
