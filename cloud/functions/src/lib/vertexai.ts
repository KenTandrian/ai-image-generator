import { PredictionServiceClient, helpers } from "@google-cloud/aiplatform";
import { IMAGEN_MODELS } from "../constants";

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
  private defaultImagen = IMAGEN_MODELS[0];

  /** Initialize Vertex AI Service */
  constructor() {
    this.client = new PredictionServiceClient({
      apiEndpoint: `${this.location}-aiplatform.googleapis.com`,
    });
  }

  /** Generate image */
  async imagen({ prompt, modelId }: { prompt: string; modelId: string }) {
    // Validate Imagen model resource ID
    const model =
      IMAGEN_MODELS.find((m) => m.id === modelId) ?? this.defaultImagen;

    if (model.location !== this.location) {
      this.client = new PredictionServiceClient({
        apiEndpoint: `${model.location}-aiplatform.googleapis.com`,
      });
    }

    // Generate image
    const [response] = await this.client.predict({
      endpoint: `projects/${this.project}/locations/${model.location}/publishers/${this.publisher}/models/${model.id}`,
      instances: [helpers.toValue({ prompt })!],
      parameters: helpers.toValue({
        sampleCount: 1,
      }),
    });
    if (!response.predictions?.[0]) return "";
    const result = helpers.fromValue(
      response.predictions[0] as protobuf.common.IValue
    ) as ImgPredictionResult;
    return {
      bytes: result.bytesBase64Encoded ?? "",
      model: model.id,
    };
  }
}
