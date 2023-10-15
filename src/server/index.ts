import { privateProcedure, router } from "./trpc";
import { generateImageFn, generateImageInput } from "./routes/generateImage";
import { getImagesFn } from "./routes/getImages";
import { suggestionFn } from "./routes/suggestion";

export const appRouter = router({
  generateImage: privateProcedure
    .input(generateImageInput)
    .mutation(({ ctx, input }) => generateImageFn(ctx, input)),
  getImages: privateProcedure.query(() => getImagesFn()),
  suggestion: privateProcedure.query(() => suggestionFn()),
});

export type AppRouter = typeof appRouter;
