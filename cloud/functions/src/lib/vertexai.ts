import {
  FinishReason,
  GoogleGenAI,
  HarmBlockThreshold,
  HarmCategory,
  type Part,
  type SafetySetting,
} from "@google/genai";
import { IMAGEN_MODELS, SUGGESTION_MODELS } from "../constants";

const SAFETY_SETTINGS: SafetySetting[] = [
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

const IMAGE_SAFETY_SETTINGS: SafetySetting[] = [
  ...SAFETY_SETTINGS,
  {
    category: HarmCategory.HARM_CATEGORY_IMAGE_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_IMAGE_HATE,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_IMAGE_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_IMAGE_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

const SAFETY_FINISH_REASONS = new Set<FinishReason>([
  FinishReason.SAFETY,
  FinishReason.PROHIBITED_CONTENT,
  FinishReason.BLOCKLIST,
  FinishReason.SPII,
  FinishReason.IMAGE_SAFETY,
  FinishReason.IMAGE_PROHIBITED_CONTENT,
  FinishReason.NO_IMAGE,
]);

/** Error thrown when a prompt or generated image is blocked by safety filters */
export class SafetyBlockError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SafetyBlockError";
  }
}

/** Google Cloud Vertex AI Service */
export default class VertexAIService {
  private readonly project = process.env.GCLOUD_PROJECT;

  /** Create a Google GenAI client for a specific location */
  private getClient(location: string) {
    return new GoogleGenAI({
      location,
      project: this.project,
      vertexai: true,
    });
  }

  /** Generate image */
  async imagen({ prompt, modelId }: { prompt: string; modelId: string }) {
    const model = IMAGEN_MODELS.find((m) => m.id === modelId);
    if (!model) {
      throw new Error(`Invalid image generation model ID: ${modelId}`);
    }

    const client = this.getClient(model.location);

    const response = await client.models.generateContent({
      contents: prompt,
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        },
        responseModalities: ["IMAGE"],
        safetySettings: IMAGE_SAFETY_SETTINGS,
      },
      model: model.id,
    });

    if (response.promptFeedback?.blockReason) {
      throw new SafetyBlockError(
        `Prompt blocked: ${response.promptFeedback.blockReason}`
      );
    }

    for (const candidate of response.candidates ?? []) {
      for (const part of candidate.content?.parts ?? []) {
        if (part.inlineData?.data) {
          return {
            bytes: part.inlineData.data,
            model: model.id,
          };
        }
      }
    }

    const blockedCandidate = response.candidates?.find(
      (c) => c.finishReason && SAFETY_FINISH_REASONS.has(c.finishReason)
    );
    if (blockedCandidate) {
      throw new SafetyBlockError(
        `Image generation blocked: ${blockedCandidate.finishReason}`
      );
    }

    throw new Error("Image generation failed");
  }

  async suggestion({ modelId }: { modelId: string }) {
    const model = SUGGESTION_MODELS.find((m) => m.id === modelId);
    if (!model) {
      throw new Error(`Invalid suggestion model ID: ${modelId}`);
    }

    const client = this.getClient(model.location);

    const context =
      "You are going to chat with Google Gemini Image, an AI that generates images from text prompts. Always start the prompt with a capital letter.";
    const example =
      "For example, if you are asked to 'Write a random text prompt under 50 words for Gemini Image to generate an image, this prompt will be shown to the user, include details such as the genre and what type of painting it should be, options can include: oil painting, watercolor, photo-realistic, 4k, abstract, modern, black and white, etc.', the response could be 'Create a modern, oil painting of a futuristic city skyline at night, with a high-tech transportation system and neon lights illuminating the bustling streets below'";
    const q =
      "Now, please write one sentence of a random text prompt under 50 words for Gemini Image to generate an image, this prompt will be shown to the user, include details such as the genre and what type of painting it should be, options can include: oil painting, watercolor, photo-realistic, 4k, abstract, modern, black and white, etc.";
    const textPart: Part = {
      text: [context, example, q].join(" "),
    };

    const response = await client.models.generateContent({
      contents: [{ role: "user", parts: [textPart] }],
      config: {
        maxOutputTokens: 256,
        safetySettings: SAFETY_SETTINGS,
        temperature: 1.6,
        topK: 40,
        topP: 0.95,
      },
      model: model.id,
    });
    return response.text ?? "";
  }
}
