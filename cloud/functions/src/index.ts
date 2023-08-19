import { setGlobalOptions } from "firebase-functions/v2";
import { generateImage } from "./handlers/generateImage";
import { getChatGPTSuggestion } from "./handlers/getChatGPTSuggestion";
import { getImages } from "./handlers/getImages";

setGlobalOptions({ region: "asia-southeast1" });
exports.getChatGPTSuggestion = getChatGPTSuggestion;
exports.generateImage = generateImage;
exports.getImages = getImages;
