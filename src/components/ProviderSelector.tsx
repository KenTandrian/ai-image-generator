import { PROVIDERS, type AIProvider } from "@/data/ai-providers";
import { useCallback, useState } from "react";

function Selector({
  onChange,
  provider,
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  provider: AIProvider;
}) {
  return (
    <div className="flex flex-col items-center justify-between rounded border border-gray-200 px-4 py-2 sm:flex-row dark:border-zinc-700">
      <h3 className="font-medium text-zinc-900 dark:text-zinc-200">
        Prompt Generator
      </h3>

      <div className="flex gap-4">
        {PROVIDERS.map((p, i) => (
          <div className="flex items-center" key={i}>
            <input
              id={p.value}
              type="radio"
              value={p.value}
              name="provider"
              className="h-4 w-4 border-zinc-300 bg-zinc-100 text-violet-600 accent-violet-600 dark:border-zinc-600 dark:bg-zinc-700"
              onChange={onChange}
              checked={p.value === provider}
            />
            <label
              htmlFor={p.value}
              className="ml-2 text-sm text-zinc-900 dark:text-zinc-300"
            >
              {p.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function useProviderSelector() {
  const [provider, setProvider] = useState<AIProvider>("gemini-1.5-flash");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProvider(event.target.value as AIProvider);
  };

  const ProviderSelector = useCallback(
    () => <Selector onChange={onChange} provider={provider} />,
    [provider]
  );

  return { provider, ProviderSelector };
}
