"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { NAVIGATION } from "@/data/nav";

export function NavMain() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  const getIsActive = useCallback(
    (url: string) => pathname === url || pathname.startsWith(`${url}/`),
    [pathname]
  );

  return (
    <SidebarGroup>
      {NAVIGATION.map((group) => (
        <div key={group.title}>
          <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
          <SidebarMenu>
            {group.items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  isActive={getIsActive(item.url)}
                  render={
                    <Link href={item.url} onClick={() => setOpenMobile(false)}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  }
                  tooltip={item.title}
                />
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        isActive={getIsActive(subItem.url)}
                        render={
                          <Link
                            href={subItem.url}
                            onClick={() => setOpenMobile(false)}
                          >
                            <span>{subItem.title}</span>
                          </Link>
                        }
                      />
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      ))}
    </SidebarGroup>
  );
}
