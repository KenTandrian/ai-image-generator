import OpenAI from "openai";

/** OpenAI Service */
class OpenAIService {
  private openai: OpenAI;

  /** Initialize OpenAI Service */
  constructor() {
    this.openai = new OpenAI({
      organization: process.env.OPENAI_ORGANIZATION,
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  /** Get OpenAI completions service */
  get completions() {
    return this.openai.completions;
  }

  /** Get OpenAI images service */
  get images() {
    return this.openai.images;
  }
}

export default OpenAIService;
