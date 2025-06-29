import { IMAGEN_MODELS, type ImagenModel } from "@/data/imagen-models";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";

function Selector({
  onChange,
  model,
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  model: ImagenModel;
}) {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;

  const models = IMAGEN_MODELS.filter(
    (x) => x.status === "PUBLIC" || (x.status === "PRIVATE" && isLoggedIn)
  );

  return (
    <div className="flex flex-col items-center justify-between rounded border border-gray-200 px-4 py-2 dark:border-zinc-700 sm:flex-row">
      <h3 className="font-medium text-zinc-900 dark:text-zinc-200">
        Image Generator
      </h3>

      <div className="flex gap-4">
        {models.map((p, i) => (
          <div className="flex items-center" key={i}>
            <input
              id={p.value}
              type="radio"
              value={p.value}
              name="model"
              className="h-4 w-4 border-zinc-300 bg-zinc-100 text-violet-600 accent-violet-600 dark:border-zinc-600 dark:bg-zinc-700"
              onChange={onChange}
              checked={p.value === model}
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

export default function useModelSelector() {
  const [model, setModel] = useState<ImagenModel>(
    "imagen-3.0-fast-generate-001"
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModel(event.target.value as ImagenModel);
  };

  const ModelSelector = useCallback(
    () => <Selector onChange={onChange} model={model} />,
    [model]
  );

  return { model, ModelSelector };
}
