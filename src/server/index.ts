import { generateImageFn, generateImageInput } from "./routes/generateImage";
import { getImagesFn } from "./routes/getImages";
import { suggestionFn, suggestionInput } from "./routes/suggestion";
import { privateProcedure, router } from "./trpc";

export const appRouter = router({
  generateImage: privateProcedure
    .input(generateImageInput)
    .mutation(({ ctx, input }) => generateImageFn(ctx, input)),
  getImages: privateProcedure.query(() => getImagesFn()),
  suggestion: privateProcedure
    .input(suggestionInput)
    .query(({ input }) => suggestionFn(input)),
});

export type AppRouter = typeof appRouter;
