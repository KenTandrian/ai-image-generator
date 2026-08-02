"use client";

import { TRPCClientError } from "@trpc/client";
import { RefreshCwIcon, SparklesIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import useModelSelector from "@/components/ModelSelector";
import useProviderSelector from "@/components/ProviderSelector";
import {
  ComposerAction,
  ComposerInput,
  ComposerRoot,
  ComposerSend,
} from "@/components/ui/composer";
import { TooltipIconButton } from "@/components/ui/tooltip-icon-button";
import { getProviderName } from "@/data/ai-providers";
import trpc from "@/server/client";
import fetchImages from "@/services/fetchImages";
import fetchSuggestion from "@/services/fetchSuggestion";
import { cn } from "@/utils/classname";
import { Button } from "./ui/button";

const PromptInput = () => {
  const { provider, ProviderSelector } = useProviderSelector();
  const { model, ModelSelector } = useModelSelector();
  const [input, setInput] = useState("");

  // Latest AI provider that is being fetched
  const [fetchingProvider, setFetchingProvider] = useState<string | undefined>(
    getProviderName(provider)
  );

  function getSuggestion(p: typeof provider) {
    setFetchingProvider(getProviderName(p));
    return fetchSuggestion({ provider: p });
  }

  const {
    data: suggestion,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("/api/suggestion", () => getSuggestion(provider), {
    revalidateOnFocus: false,
  });
  const loading = isLoading || isValidating;

  const { mutate: refreshImages } = useSWR("/api/getImages", fetchImages, {
    revalidateOnFocus: false,
  });

  async function submitPrompt() {
    const inputPrompt = input.trim();
    if (!inputPrompt) {
      toast.error("Prompt is empty!");
      return;
    }
    setInput("");

    const notifPrompt = inputPrompt.slice(0, 50);
    const notification = toast.loading(`AI is creating: ${notifPrompt}...`);

    try {
      const data = await trpc.generateImage.mutate({
        prompt: inputPrompt,
        model,
      });
      if (data.success) {
        toast.success("Your AI Art has been generated!", { id: notification });
        refreshImages();
      } else {
        toast.error(data.message, { id: notification });
      }
    } catch (err) {
      if (err instanceof TRPCClientError) {
        toast.error(JSON.parse(err.message)[0].message, { id: notification });
      } else {
        toast.error("Something went wrong!", { id: notification });
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitPrompt();
  };

  return (
    <form
      className="max-w-screen-3xl mx-auto my-6 px-6 md:my-10 md:px-10"
      onSubmit={handleSubmit}
    >
      <ComposerRoot>
        <ComposerInput
          placeholder={
            (loading && `${fetchingProvider} is thinking of a suggestion...`) ||
            suggestion ||
            "What do you want to create?"
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <ComposerAction>
          <div className="flex items-center gap-2 flex-wrap">
            <ProviderSelector />
            <ModelSelector />
          </div>

          <div className="flex grow justify-between sm:justify-end items-center gap-2">
            {!input && suggestion && (
              <div className="flex items-center gap-1.5">
                <Button
                  type="button"
                  onClick={() => setInput(suggestion)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-violet-500/20 px-3 py-1.5 text-xs font-medium text-violet-300 transition-colors hover:bg-violet-500/30"
                >
                  <SparklesIcon className="size-3.5" />
                  Use Suggestion
                </Button>
                <TooltipIconButton
                  tooltip="New Suggestion"
                  side="top"
                  type="button"
                  onClick={() => mutate()}
                  variant="secondary"
                  size="icon"
                  className="size-8 rounded-full text-zinc-400 hover:text-zinc-100"
                  aria-label="New Suggestion"
                >
                  <RefreshCwIcon
                    className={cn("size-4", loading && "animate-spin")}
                  />
                </TooltipIconButton>
              </div>
            )}
            <ComposerSend disabled={!input} />
          </div>
        </ComposerAction>
      </ComposerRoot>
    </form>
  );
};

export default PromptInput;
