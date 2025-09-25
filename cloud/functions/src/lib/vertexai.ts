import { GoogleGenAI } from "@google/genai";
import { IMAGEN_MODELS } from "../constants";

/** Google Cloud Vertex AI Service */
export default class VertexAIService {
  private client: GoogleGenAI;
  private defaultImagen = IMAGEN_MODELS[0];
  private location = "asia-southeast1";
  private project = process.env.GCLOUD_PROJECT;

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
    const result = response.generatedImages?.[0]?.image;
    return {
      bytes: result?.imageBytes ?? "",
      model: model.id,
    };
  }
}
