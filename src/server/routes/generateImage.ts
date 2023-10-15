import { z } from "zod";
import { APIResp, type Context } from "../trpc";
import { callableFn } from "@/services/firebase";

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
  const textData = response.data as string;
  return new APIResp(textData, true);
}
