"use client";

import { ArrowUpIcon } from "lucide-react";
import type { ComponentPropsWithoutRef, FC } from "react";
import { TooltipIconButton } from "@/components/ui/tooltip-icon-button";
import { cn } from "@/utils/classname";

export const ComposerRoot: FC<ComponentPropsWithoutRef<"div">> = ({
  children,
  className,
  ...props
}) => (
  <div
    className={cn(
      "relative flex w-full flex-col gap-2 rounded-2xl border border-border/50 bg-background p-3.5 shadow-lg backdrop-blur-md transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 dark:bg-muted/50 dark:shadow-none",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const ComposerInput: FC<ComponentPropsWithoutRef<"textarea">> = ({
  className,
  rows = 2,
  ...props
}) => (
  <textarea
    rows={rows}
    className={cn(
      "caret-primary max-h-32 min-h-10 w-full resize-none bg-transparent px-2.5 py-1 text-base outline-none dark:text-zinc-100 scrollbar-none",
      className
    )}
    {...props}
  />
);

export const ComposerAction: FC<ComponentPropsWithoutRef<"div">> = ({
  children,
  className,
  ...props
}) => (
  <div
    className={cn(
      "relative flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const ComposerSend: FC<{ disabled?: boolean; className?: string }> = ({
  disabled,
  className,
}) => (
  <TooltipIconButton
    tooltip="Generate Image"
    side="bottom"
    type="submit"
    variant="default"
    size="icon"
    className={cn(
      "size-8 rounded-full bg-violet-600 text-white hover:bg-violet-500 active:scale-95 transition-all shadow-md shadow-violet-500/20 disabled:opacity-50 disabled:cursor-not-allowed",
      className
    )}
    aria-label="Generate Image"
    disabled={disabled}
  >
    <ArrowUpIcon className="size-4.5" />
  </TooltipIconButton>
);

export const Composer = {
  Root: ComposerRoot,
  Input: ComposerInput,
  Action: ComposerAction,
  Send: ComposerSend,
};
