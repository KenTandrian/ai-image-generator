"use client";

import useProviderSelector from "@/components/ProviderSelector";
import trpc from "@/server/client";
import fetchImages from "@/services/fetchImages";
import fetchSuggestion from "@/services/fetchSuggestion";
import { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

const PromptInput = () => {
  const { provider, ProviderSelector } = useProviderSelector();
  const [input, setInput] = useState("");
  const {
    data: suggestion,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("/api/suggestion", () => fetchSuggestion({ provider }), {
    revalidateOnFocus: false,
  });
  const loading = isLoading || isValidating;

  const { mutate: refreshImages } = useSWR("/api/getImages", fetchImages, {
    revalidateOnFocus: false,
  });

  const submitPrompt = async (useSuggestion?: boolean) => {
    const inputPrompt = input;
    setInput("");

    // p is the prompt to send to API
    const p = useSuggestion ? suggestion : inputPrompt;
    if (!p) {
      toast.error("Prompt is empty!");
      return;
    }

    const notifPrompt = p.slice(0, 50);
    const notification = toast.loading(`DALL·E is creating: ${notifPrompt}...`);

    const data = await trpc.generateImage.mutate({ prompt: p });
    if (!data.success) toast.error(data.message, { id: notification });
    else toast.success("Your AI Art has been generated!", { id: notification });
    refreshImages();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitPrompt();
  };

  return (
    <div className="m-6 md:m-10">
      <ProviderSelector />
      <form
        className="flex flex-col rounded-md border 
        shadow-md shadow-slate-400/10 dark:divide-zinc-500 dark:border-zinc-500 lg:flex-row lg:divide-x"
        onSubmit={handleSubmit}
      >
        <textarea
          name="prompt"
          id="prompt"
          className="flex-1 resize-none rounded-md p-4 outline-none dark:bg-transparent dark:text-zinc-200"
          placeholder={
            (loading && "ChatGPT is thinking of a suggestion...") ||
            suggestion ||
            "Enter a prompt..."
          }
          onChange={(e) => setInput(e.target.value)}
          value={input}
          rows={2}
        />
        <button
          className={`p-4 font-bold transition-colors duration-200 ${
            input
              ? "bg-violet-500 text-white dark:bg-violet-700"
              : "cursor-not-allowed text-zinc-300 dark:text-zinc-500"
          }`}
          type="submit"
          disabled={!input}
        >
          Generate
        </button>
        <button
          type="button"
          className="bg-violet-400 p-4 font-bold text-white transition-colors 
            duration-200 disabled:cursor-not-allowed disabled:bg-gray-400 
            disabled:text-gray-300 dark:bg-violet-600"
          onClick={() => submitPrompt(true)}
        >
          Use Suggestion
        </button>
        <button
          type="button"
          className="rounded-b-md border-none bg-white p-4 font-bold
            text-violet-500 transition-colors duration-200 dark:bg-transparent
            md:rounded-r-md md:rounded-bl-none"
          onClick={() => mutate()}
        >
          New Suggestion
        </button>
      </form>

      {input && (
        <p className="pl-2 pt-2 font-light italic dark:text-zinc-300">
          Suggestion:{" "}
          <span className="text-violet-500">
            {loading ? "ChatGPT is thinking..." : suggestion}{" "}
          </span>
        </p>
      )}
    </div>
  );
};

export default PromptInput;
