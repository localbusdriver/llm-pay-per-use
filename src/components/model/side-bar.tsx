"use client";

import { useSideBarContext } from "@/components/model/sidebar-page-context";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar";

const items = [
    {
        title: "llm in use",
    },
];

const AppSidebar = () => {
    const { model, setModel, variant, setVariant, key, setKey } =
        useSideBarContext();

    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
};

export default AppSidebar;
