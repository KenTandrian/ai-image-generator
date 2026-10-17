import { describe, expect, it } from "vitest";
import { generateImageInput } from "./generateImage";

describe("generateImageInput schema", () => {
  it("validates valid input with >= 20 characters prompt", () => {
    const input = {
      prompt: "A beautiful serene sunset over majestic mountains",
      model: "gemini-3.1-flash-image",
    };
    const parsed = generateImageInput.safeParse(input);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data).toEqual(input);
    }
  });

  it("fails when prompt has fewer than 20 characters", () => {
    const input = {
      prompt: "Too short prompt",
      model: "gemini-3.1-flash-image",
    };
    const parsed = generateImageInput.safeParse(input);
    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      expect(parsed.error.issues[0]?.message).toBe(
        "Prompt must be at least 20 characters long."
      );
    }
  });

  it("fails when prompt is empty or missing", () => {
    const withoutPrompt = {
      model: "gemini-3.1-flash-image",
    };
    expect(generateImageInput.safeParse(withoutPrompt).success).toBe(false);

    const emptyPrompt = {
      prompt: "",
      model: "gemini-3.1-flash-image",
    };
    expect(generateImageInput.safeParse(emptyPrompt).success).toBe(false);
  });

  it("fails when model is missing", () => {
    const input = {
      prompt: "A beautiful serene sunset over majestic mountains",
    };
    const parsed = generateImageInput.safeParse(input);
    expect(parsed.success).toBe(false);
  });

  it("fails when types are invalid", () => {
    const invalidTypes = {
      prompt: 12345,
      model: true,
    };
    const parsed = generateImageInput.safeParse(invalidTypes);
    expect(parsed.success).toBe(false);
  });
});
