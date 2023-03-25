import * as functions from "firebase-functions";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const getChatGPTSuggestion = functions.https.onRequest(
  (request, response) => {
    functions.logger.info(
      `HTTP Function processed request for URL ${request.url}`,
      { structuredData: true }
    );
    response.send("Hello from Firebase!");
  }
);
