import { PredictionServiceClient, helpers } from "@google-cloud/aiplatform";

type PredictionResult = {
  candidates: { content: string; author: string }[];
  citationMetadata: { citations: [] }[];
  safetyAttributes: {
    categories: string[];
    blocked: boolean;
    scores: number[];
  }[];
};

/** Google Cloud Vertex AI Service */
export default class VertexAIService {
  private client: PredictionServiceClient;
  private project = process.env.GCLOUD_PROJECT;
  private location = "us-central1";
  private publisher = "google";
  private model = "chat-bison@002";

  /** Initialize Vertex AI Service */
  constructor() {
    this.client = new PredictionServiceClient({
      apiEndpoint: "us-central1-aiplatform.googleapis.com",
    });
  }

  /** Get prompt suggestion */
  async suggestion() {
    const prompt = {
      context:
        "You are going to chat with DALL·E, an AI that generates images from text prompts. Always start the prompt with a capital letter.",
      examples: [
        {
          input: {
            content:
              "Write a random text prompt under 50 words for DALL·E to generate an image, this prompt will be shown to the user, include details such as the genre and what type of painting it should be, options can include: oil painting, watercolor, photo-realistic, 4k, abstract, modern, black and white, etc.",
          },
          output: {
            content:
              "Create a modern, oil painting of a futuristic city skyline at night, with a high-tech transportation system and neon lights illuminating the bustling streets below.",
          },
        },
      ],
      messages: [
        {
          author: "user",
          content:
            "Write a random text prompt under 50 words for DALL·E to generate an image, this prompt will be shown to the user, include details such as the genre and what type of painting it should be, options can include: oil painting, watercolor, photo-realistic, 4k, abstract, modern, black and white, etc.",
        },
      ],
    };
    const [response] = await this.client.predict({
      // eslint-disable-next-line max-len
      endpoint: `projects/${this.project}/locations/${this.location}/publishers/${this.publisher}/models/${this.model}`,
      instances: [helpers.toValue(prompt)!],
      parameters: helpers.toValue({
        temperature: 0.8,
        maxOutputTokens: 200,
        topP: 0.95,
        topK: 40,
      }),
    });
    if (!response.predictions?.[0]) return "";
    const result = helpers.fromValue(
      response.predictions[0] as protobuf.common.IValue
    ) as PredictionResult;
    const prediction = result.candidates[0].content;
    return prediction ?? "";
  }
}
