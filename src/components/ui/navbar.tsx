import Link from "next/link";
import React from "react";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { navItems } from "@/data/general-data";
import type { NavType } from "@/types/general-types";

const NavItem = ({ mapkey, item }: { mapkey?: string; item: NavType }) => {
    return (
        <NavigationMenuItem id="nav-item" key={mapkey} className="w-max px-4">
            {item?.children ? (
                <>
                    <NavigationMenuTrigger>{item?.title}</NavigationMenuTrigger>
                    <NavigationMenuContent className="list-none py-4">
                        {item?.children &&
                            item.children.map((childItem, i) => (
                                <NavItem
                                    key={`${childItem.title}_${i}`}
                                    item={childItem}
                                />
                            ))}
                    </NavigationMenuContent>
                </>
            ) : (
                <NavigationMenuLink href={item.link} className="w-max">
                    {item?.icon && <span>{item.icon}</span>}
                    {item.title}
                </NavigationMenuLink>
            )}
        </NavigationMenuItem>
    );
};

const Navbar = () => {
    return (
        <nav className="z-[4] flex w-full items-center justify-between px-2 py-8 sm:px-20 lg:px-36">
            <div>
                <Link href="/" id="logo-icon" className="text-2xl font-bold">
                    P/U
                </Link>
            </div>
            <NavigationMenu>
                <NavigationMenuList>
                    {navItems.map((item: NavType, i) => (
                        <NavItem key={`${item.title}_${i}`} item={item} />
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </nav>
    );
};

export default Navbar;
