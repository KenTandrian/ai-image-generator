import { describe, expect, it } from "vitest";
import {
  findModel,
  getModelName,
  IMAGEN_MODELS,
  type ImagenModel,
} from "./imagen-models";

describe("imagen-models lookup logic", () => {
  describe("ImagenModel type inference", () => {
    it("preserves exact string literal unions without widening to string", () => {
      type AssertExtends<T, U> = T extends U ? true : false;
      type AssertNotExtends<T, U> = T extends U ? false : true;

      // Assert that a known model value extends ImagenModel
      const validCheck: AssertExtends<"gemini-3.1-flash-image", ImagenModel> =
        true;
      expect(validCheck).toBe(true);

      // Assert that arbitrary string does NOT extend ImagenModel (proves it's not widened)
      const notWidenedCheck: AssertNotExtends<string, ImagenModel> = true;
      expect(notWidenedCheck).toBe(true);
    });
  });

  describe("getModelName", () => {
    it("retrieves the correct name when using a valid model id", () => {
      const sample = IMAGEN_MODELS[0];
      expect(sample).toBeDefined();
      expect(getModelName(sample.value)).toBe(sample.name);
    });

    it("returns undefined for an unknown model id", () => {
      expect(getModelName("non-existent-id")).toBeUndefined();
    });
  });

  describe("findModel", () => {
    it("retrieves the model and attaches vendor logo when using a valid model id", () => {
      const sample = IMAGEN_MODELS[0];
      const model = findModel(sample.value);

      expect(model).toBeDefined();
      expect(model?.name).toBe(sample.name);
      expect(model?.vendor).toBe(sample.vendor);
      expect(model?.logo).toBeDefined();
    });

    it("correctly resolves the parent model when queried by an alias", () => {
      const modelWithAlias = IMAGEN_MODELS.find(
        (m) => m.aliases && m.aliases.length > 0
      );
      expect(modelWithAlias).toBeDefined();

      if (modelWithAlias?.aliases?.[0]) {
        const alias = modelWithAlias.aliases[0];
        const found = findModel(alias);

        expect(found).toBeDefined();
        expect(found?.name).toBe(modelWithAlias.name);
        expect(found?.value).toBe(modelWithAlias.value);
        expect(found?.logo).toBeDefined();
      }
    });

    it("returns undefined for an unknown model id", () => {
      expect(findModel("non-existent-id")).toBeUndefined();
    });
  });
});
