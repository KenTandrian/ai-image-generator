import { GoogleGenAI, type Part } from "@google/genai";
import { IMAGEN_MODELS, SUGGESTION_MODELS } from "../constants";

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
        responseModalities: ["IMAGE"],
      },
      model: model.id,
    });

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
        temperature: 1.6,
        topK: 40,
        topP: 0.95,
      },
      model: model.id,
    });
    return response.text ?? "";
  }
}
