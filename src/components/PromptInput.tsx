"use client";

import fetchImages from "@/services/fetchImages";
import fetchSuggestion from "@/services/fetchSuggestion";
import { useState } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";

const PromptInput = () => {
  const [input, setInput] = useState("");
  const {
    data: suggestion,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("/api/suggestion", fetchSuggestion, {
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

    const notifPrompt = p.slice(0, 40);
    const notification = toast.loading(`DALL·E is creating: ${notifPrompt}...`);

    const resp = await fetch("/api/generateImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: p }),
    });
    const data = await resp.json();

    if (data.error) toast.error(data.error, { id: notification });
    else toast.success("Your AI Art has been generated!", { id: notification });
    refreshImages();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitPrompt();
  };

  return (
    <div className="m-10">
      <form
        className="flex flex-col lg:flex-row shadow-md 
        shadow-slate-400/10 border rounded-md lg:divide-x"
        onSubmit={handleSubmit}
      >
        <textarea
          name="prompt"
          id="prompt"
          className="flex-1 p-4 outline-none rounded-md resize-none"
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
              ? "bg-violet-500 text-white"
              : "text-gray-300 cursor-not-allowed"
          }`}
          type="submit"
          disabled={!input}
        >
          Generate
        </button>
        <button
          type="button"
          className="p-4 bg-violet-400 text-white transition-colors 
            duration-200 font-bold disabled:text-gray-300 
            disabled:cursor-not-allowed disabled:bg-gray-400"
          onClick={() => submitPrompt(true)}
        >
          Use Suggestion
        </button>
        <button
          type="button"
          className="p-4 bg-white text-violet-500 border-none
            transition-colors duration-200 rounded-b-md md:rounded-r-md
            md:rounded-bl-none font-bold"
          onClick={mutate}
        >
          New Suggestion
        </button>
      </form>

      {input && (
        <p className="italic pt-2 pl-2 font-light">
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
