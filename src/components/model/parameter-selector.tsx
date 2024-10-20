import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { AllVariants, SupportedModels } from "@/data/models-routes";
import { cn } from "@/lib/utils";

import ModelSelect from "./model-selector";

const ParameterSelector = ({
    model,
    setModel,
    variant,
    setVariant,
    key,
    setKey,
    className,
}: {
    model: string;
    setModel: React.Dispatch<React.SetStateAction<string>>;
    variant: string;
    setVariant: React.Dispatch<React.SetStateAction<string>>;
    key: string;
    setKey: React.Dispatch<React.SetStateAction<string>>;
    className?: string;
}) => {
    return (
        <Card
            id="input-container"
            className={cn(
                "flex flex-col items-center gap-4 rounded-lg border bg-secondary py-6",
                className
            )}
        >
            <CardContent
                className="flex flex-col items-start gap-2"
                id="model-selector"
            >
                <Label htmlFor="model-select" className="text-gray-500">
                    Model:
                </Label>
                <ModelSelect
                    id="model-select"
                    value={model}
                    onChange={setModel}
                    options={SupportedModels}
                    className="w-[175px] bg-white"
                />
                <ModelSelect
                    id="variant-select"
                    value={variant}
                    onChange={setVariant}
                    options={AllVariants[model]}
                    className="w-[175px] bg-white"
                />
            </CardContent>
            <div
                className="flex flex-col items-start justify-center gap-2"
                id="key-input-container"
            >
                <Label htmlFor="key-input" className="text-gray-500">
                    Your super secret key:
                </Label>
                <Input
                    id="key-input"
                    onChange={setKey}
                    value={key}
                    className="w-[175px] bg-white"
                    placeholder="something secret..."
                />
            </div>
        </Card>
    );
};
export default ParameterSelector;
