import { callableFn } from "@/services/firebase";
import { z } from "zod";
import { APIResp, type Context } from "../trpc";

export const generateImageInput = z.object({
  prompt: z.string(),
});
type Input = z.infer<typeof generateImageInput>;

export async function generateImageFn(ctx: Context, input: Input) {
  const prompt = input.prompt;
  const response = await callableFn("generateImage")({
    prompt,
    metadata: { ip: ctx.ip, geo: ctx.geo },
  });
  if (Object.hasOwn(response.data as object, "error")) {
    const data = response.data as { error: { message: string } };
    return new APIResp(data.error.message, false);
  }
  const textData = response.data as string;
  return new APIResp(textData, true);
}
