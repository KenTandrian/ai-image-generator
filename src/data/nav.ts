import { Images, type LucideIcon } from "lucide-react";
import type { Route } from "next";

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface NavItem {
  title: string;
  url: Route;
  icon: LucideIcon;
  items?: {
    title: string;
    url: Route;
  }[];
}

export const NAVIGATION: NavGroup[] = [
  {
    title: "Menu",
    items: [
      {
        title: "Image Gallery",
        url: "/",
        icon: Images,
      },
    ],
  },
];
