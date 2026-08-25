"use client";

import Link from "next/link";
import type * as React from "react";
import { VERSION } from "@/common";
import { NavMain } from "@/components/layout/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import VertexAILogo from "@/components/VertexAILogo";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { setOpenMobile } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href="/" onClick={() => setOpenMobile(false)}>
          <SidebarMenuButton
            size="lg"
            className="cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="flex items-center justify-center">
              <VertexAILogo className="size-8!" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">AI Image Generator</span>
              <span className="truncate text-xs text-muted-foreground">
                v{VERSION}
              </span>
            </div>
          </SidebarMenuButton>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
