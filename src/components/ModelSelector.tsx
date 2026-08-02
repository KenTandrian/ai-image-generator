import { useSession } from "next-auth/react";
import { useCallback, useMemo, useState } from "react";
import {
  ModelSelector as AssistantModelSelector,
  type ModelOption,
} from "@/components/ui/model-selector";
import {
  findModel,
  IMAGEN_MODELS,
  type ImagenModel,
} from "@/data/imagen-models";

export default function useModelSelector() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  const [model, setModel] = useState<ImagenModel>(
    "gemini-3.1-flash-lite-image"
  );

  const modelOptions = useMemo<ModelOption[]>(() => {
    return IMAGEN_MODELS.filter(
      (x) => x.status === "PUBLIC" || (x.status === "PRIVATE" && isLoggedIn)
    ).map((x) => {
      const info = findModel(x.value as ImagenModel);
      const Logo = info?.logo;
      return {
        id: x.value,
        name: x.name,
        description: x.value,
        icon: Logo ? <Logo className="size-3.5" /> : undefined,
        keywords: [x.vendor, x.name, x.value],
      };
    });
  }, [isLoggedIn]);

  const ModelSelector = useCallback(
    () => (
      <AssistantModelSelector
        models={modelOptions}
        value={model}
        onValueChange={(val) => setModel(val as ImagenModel)}
        searchable
        variant="outline"
        size="sm"
      />
    ),
    [model, modelOptions]
  );

  return { model, ModelSelector };
}
