import { useCallback, useMemo, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  type ModelOption,
  ModelSelector,
} from "@/components/ui/model-selector";
import { type AIProvider, PROVIDERS } from "@/data/ai-providers";

export default function useProviderSelector() {
  const [provider, setProvider] = useState<AIProvider>(PROVIDERS[0].value);

  const providerOptions = useMemo<ModelOption[]>(() => {
    return PROVIDERS.map((p) => ({
      id: p.value,
      name: p.name,
      description: p.value,
      icon: <FcGoogle className="size-3.5" />,
    }));
  }, []);

  const ProviderSelector = useCallback(
    () => (
      <ModelSelector
        models={providerOptions}
        value={provider}
        onValueChange={(val) => setProvider(val as AIProvider)}
        searchable
        variant="outline"
        size="sm"
      />
    ),
    [provider, providerOptions]
  );

  return { provider, ProviderSelector };
}
