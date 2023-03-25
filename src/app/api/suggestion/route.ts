export async function GET(request: Request) {
  // Connect to Cloud Function
  const response = await fetch(`${process.env.API_URL}/getChatGPTSuggestion`, {
    cache: "no-store",
  });
  const textData = await response.text();
  return new Response(JSON.stringify(textData.trim()), {
    status: 200,
  });
}
