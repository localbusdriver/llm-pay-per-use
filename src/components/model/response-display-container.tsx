import { Pixelify_Sans } from "next/font/google";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";

const pixelifySans = Pixelify_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const ResponseDisplayContainer = ({
    model,
    responseRef,
    loading,
    error,
    className,
}: {
    model: string;
    responseRef: React.RefObject<HTMLDivElement>;
    loading: boolean;
    error?: string;
    className?: string;
}) => {
    return (
        <Card className={cn("md:max-h-[740px] md:px-8", className)}>
            <CardHeader>
                <CardTitle className="font-normal text-gray-500">
                    From&nbsp;&nbsp;
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
            <CardContent
                id="response-container"
                className="max-h-[660px] scroll-auto rounded-lg border px-6 py-4 text-sm shadow-sm"
            >
                {error && <p>{error}</p>}
                {loading && <p>Loading...</p>}
                <div ref={responseRef}>
                    <span className="text-gray-500">
                        Try sending a message!
                    </span>
                </div>
            </CardContent>
            <CardFooter></CardFooter>
        </Card>
    );
};

export default ResponseDisplayContainer;
