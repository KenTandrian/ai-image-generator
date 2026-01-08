import { GoogleGenAI, type Part } from "@google/genai";
import { IMAGEN_MODELS } from "../constants";

/** Google Cloud Vertex AI Service */
export default class VertexAIService {
  private readonly client: GoogleGenAI;
  private readonly defaultImagen = IMAGEN_MODELS[0];
  private readonly location = "us-central1";
  private readonly project = process.env.GCLOUD_PROJECT;

  /** Initialize Vertex AI Service */
  constructor() {
    this.client = new GoogleGenAI({
      location: this.location,
      project: this.project,
      vertexai: true,
    });
  }

  /** Generate image */
  async imagen({ prompt, modelId }: { prompt: string; modelId: string }) {
    // Validate Imagen model resource ID
    const model =
      IMAGEN_MODELS.find((m) => m.id === modelId) ?? this.defaultImagen;

    // Generate image
    const response = await this.client.models.generateImages({
      config: {
        numberOfImages: 1,
      },
      model: model.id,
      prompt: prompt,
    });

    // Check if image generation failed
    const generatedImage = response.generatedImages?.[0];
    if (!generatedImage?.image?.imageBytes) {
      if (generatedImage?.raiFilteredReason) {
        throw new Error(
          "Generated images violated Google's Responsible AI practices. Try rephrasing the prompt."
        );
      } else {
        throw new Error("Image generation failed");
      }
    }
    return {
      bytes: generatedImage.image.imageBytes,
      model: model.id,
    };
  }

  async suggestion({ modelId }: { modelId: string }) {
    const context =
      "You are going to chat with Google Imagen, an AI that generates images from text prompts. Always start the prompt with a capital letter.";
    const example =
      "For example, if you are asked to 'Write a random text prompt under 50 words for DALL·E to generate an image, this prompt will be shown to the user, include details such as the genre and what type of painting it should be, options can include: oil painting, watercolor, photo-realistic, 4k, abstract, modern, black and white, etc.', the response could be 'Create a modern, oil painting of a futuristic city skyline at night, with a high-tech transportation system and neon lights illuminating the bustling streets below'";
    const q =
      "Now, please write one sentence of a random text prompt under 50 words for DALL·E to generate an image, this prompt will be shown to the user, include details such as the genre and what type of painting it should be, options can include: oil painting, watercolor, photo-realistic, 4k, abstract, modern, black and white, etc.";
    const textPart: Part = {
      text: [context, example, q].join(" "),
    };

    const response = await this.client.models.generateContent({
      contents: [{ role: "user", parts: [textPart] }],
      config: {
        maxOutputTokens: 256,
        temperature: 1.6,
        topK: 40,
        topP: 0.95,
      },
      model: modelId,
    });
    return response.text ?? "";
  }
}
