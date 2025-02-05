"use client";

import { ReactNode, createContext, useContext, useState } from "react";

interface SidebarContextType {
    model: string;
    setModel: (model: string) => void;
    variant: string;
    setVariant: (variant: string) => void;
    key: string;
    setKey: (key: string) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [model, setModel] = useState<string>("gemini-pro");
    const [variant, setVariant] = useState<string>("gemini-pro");
    const [key, setKey] = useState<string>("");

    return (
        <SidebarContext.Provider
            value={{
                model,
                setModel,
                variant,
                setVariant,
                key,
                setKey,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export const useSideBarContext = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error(
            "useSideBarContext must be used within a SidebarContextProvider"
        );
    }
    return context;
};
