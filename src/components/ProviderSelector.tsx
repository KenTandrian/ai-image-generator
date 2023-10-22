import { useCallback, useState } from "react";

const PROVIDERS = [
  { name: "Google VertexAI", value: "vertexai" },
  { name: "OpenAI ChatGPT", value: "openai" },
] as const;

type Provider = (typeof PROVIDERS)[number]["value"];

function Selector({
  onChange,
  provider,
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  provider: Provider;
}) {
  return (
    <div className="mb-4 flex flex-col items-center justify-between rounded border border-gray-200 px-4 py-2 dark:border-zinc-700 sm:flex-row">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        Choose AI Provider:
      </h3>

      <div className="flex">
        {PROVIDERS.map((p, i) => (
          <div className="mr-4 flex items-center" key={i}>
            <input
              id={p.value}
              type="radio"
              value={p.value}
              name="provider"
              className="h-4 w-4 border-gray-300 bg-gray-100 text-violet-600 accent-violet-600 dark:border-gray-600 dark:bg-gray-700"
              onChange={onChange}
              checked={p.value === provider}
            />
            <label
              htmlFor={p.value}
              className="ml-2 text-sm text-gray-900 dark:text-gray-300"
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
  const [provider, setProvider] = useState<Provider>("vertexai");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setProvider(event.target.value as Provider);
  };

  const ProviderSelector = useCallback(
    () => <Selector onChange={onChange} provider={provider} />,
    [provider]
  );

  return { provider, ProviderSelector };
}
