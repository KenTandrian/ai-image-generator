import {
  VertexAI,
  type GenerativeModel,
  type Part,
} from "@google-cloud/vertexai";

/** Google Cloud Gemini API Service */
export default class GeminiService {
  private client: GenerativeModel;
  private project = process.env.GCLOUD_PROJECT;
  private location = "asia-southeast1";
  private model = "gemini-1.5-flash-002";

  /** Initialize Gemini API Service */
  constructor() {
    const vertexAI = new VertexAI({
      project: this.project!,
      location: this.location,
    });
    this.client = vertexAI.getGenerativeModel({
      model: this.model,
    });
  }

  /** Get prompt suggestion */
  async suggestion() {
    const context =
      "You are going to chat with DALL·E, an AI that generates images from text prompts. Always start the prompt with a capital letter.";
    const example =
      "For example, if you are asked to 'Write a random text prompt under 50 words for DALL·E to generate an image, this prompt will be shown to the user, include details such as the genre and what type of painting it should be, options can include: oil painting, watercolor, photo-realistic, 4k, abstract, modern, black and white, etc.', the response could be 'Create a modern, oil painting of a futuristic city skyline at night, with a high-tech transportation system and neon lights illuminating the bustling streets below'";
    const q =
      "Now, please write one sentence of a random text prompt under 50 words for DALL·E to generate an image, this prompt will be shown to the user, include details such as the genre and what type of painting it should be, options can include: oil painting, watercolor, photo-realistic, 4k, abstract, modern, black and white, etc.";
    const textPart: Part = {
      text: [context, example, q].join(" "),
    };

    const responseStream = await this.client.generateContentStream({
      contents: [{ role: "user", parts: [textPart] }],
      generationConfig: {
        maxOutputTokens: 256,
        temperature: 1.6,
        topK: 40,
        topP: 0.95,
      },
    });

    // Wait for the response stream to complete
    const aggResp = await responseStream.response;
    const prediction = aggResp.candidates?.[0].content.parts[0].text;
    return prediction ?? "";
  }
}
