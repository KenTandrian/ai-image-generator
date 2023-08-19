import { generateImage } from "./handlers/generateImage";
import { getChatGPTSuggestion } from "./handlers/getChatGPTSuggestion";
import { getImages } from "./handlers/getImages";

exports.getChatGPTSuggestion = getChatGPTSuggestion;
exports.generateImage = generateImage;
exports.getImages = getImages;
