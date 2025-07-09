"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

import { BotIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DashboardUserButton } from "./dashboard-user-button";


const firstSection = [
    {
        icon: VideoIcon,
        label: "Meetings",
        href: "/meetings",
    },
    {
        icon: BotIcon,
        label: "Agents",
        href: "/agents",
    }
]

// const secondSection = [
//     {
//         icon: StarIcon,
//         label: "Upgrade",
//         href: "/upgrade",
//     },
// ]

export const DashboardSidebar = () => {
    const pathname = usePathname();

    return (
        <Sidebar>
            <SidebarHeader className="text-sidebar-accent-foreground">
                <Link href="/" className="flex items-center gap-2 px-2 pt-2">
                    <Image src="/logo.svg" width={72} height={72} alt="Echo.AI" />
                    <p className="text-2xl font-semibold"> Echo.AI </p>
                </Link>
            </SidebarHeader>
            <div className="px-4 py-2">
                <Separator className="opcacity-100 text-[#000]" />
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild
                                        className={cn("h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-10% via-100% via-sidebar/80 to sidebar/20",
                                            pathname === item.href && "bg-linear-to-r/oklch border-[#5D6B68]/10")}
                                        isActive={pathname === item.href}
                                    >
                                        <Link href={item.href}>
                                        <item.icon className="size-6" />
                                        <span className="text-xl font-medium tracking-tight">
                                            {item.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <div className="px-4 py-2">
                <Separator className="opcacity-100 text-[#000]" />
                </div>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {/* {secondSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild
                                        className={cn("h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-10% via-100% via-sidebar/80 to-sidebar/20",
                                            pathname === item.href && "bg-linear-to-r/oklch border-[#5D6B68]/10")}
                                        isActive={pathname === item.href}
                                    >
                                        <Link href={item.href}>
                                        <item.icon className="size-6" />
                                        <span className="text-xl font-medium tracking-tight">
                                            {item.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))} */}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="text-white">
                <DashboardUserButton />
                </SidebarFooter>
        </Sidebar>
    );
};