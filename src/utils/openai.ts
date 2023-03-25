import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export default openai;
