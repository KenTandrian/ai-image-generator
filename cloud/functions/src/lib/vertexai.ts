import { PredictionServiceClient, helpers } from "@google-cloud/aiplatform";

type ImgPredictionResult = {
  mimeType: "image/png";
  bytesBase64Encoded: string;
};

/** Google Cloud Vertex AI Service */
export default class VertexAIService {
  private client: PredictionServiceClient;
  private project = process.env.GCLOUD_PROJECT;
  private location = "asia-southeast1";
  private publisher = "google";
  private defaultImagen = "imagegeneration@006";

  /** Initialize Vertex AI Service */
  constructor() {
    this.client = new PredictionServiceClient({
      apiEndpoint: `${this.location}-aiplatform.googleapis.com`,
    });
  }

  /** Generate image */
  async imagen({ prompt, model }: { prompt: string; model: string }) {
    // Validate Imagen model resource ID
    const IMAGEN_MODELS = [
      "imagegeneration@006",
      "imagen-3.0-fast-generate-001",
      "imagen-3.0-generate-001",
    ];
    const modelName = IMAGEN_MODELS.includes(model)
      ? model
      : this.defaultImagen;

    // Generate image
    const [response] = await this.client.predict({
      endpoint: `projects/${this.project}/locations/${this.location}/publishers/${this.publisher}/models/${modelName}`,
      instances: [helpers.toValue({ prompt })!],
      parameters: helpers.toValue({
        sampleCount: 1,
      }),
    });
    if (!response.predictions?.[0]) return "";
    const result = helpers.fromValue(
      response.predictions[0] as protobuf.common.IValue
    ) as ImgPredictionResult;
    return result.bytesBase64Encoded ?? "";
  }
}
