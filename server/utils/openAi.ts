export const openaiAPI = async (model: string, input: any) => {
  const { openaiToken } = useRuntimeConfig(); // Ensure this contains your OpenAI token

  // Verify that the token exists
  if (!openaiToken) {
    console.error("OpenAI token is missing from runtime config.");
    return { error: "OpenAI token is missing." };
  }

  // Set the OpenAI API endpoint
  const openaiEndpoint = `https://api.openai.com/v1/chat/completions`;

  // Prepare the request payload for the OpenAI API
  const requestBody = {
    model: model, // Specify the model (e.g., "gpt-4")
    messages: input.messages, // The message array for chat completions
    max_tokens: input.max_tokens || 1000, // Optional: adjust token limit
    temperature: input.temperature || 0.7, // Optional: adjust temperature for randomness
  };

  try {
    const aiResponse = await fetch(openaiEndpoint, {
      headers: {
        Authorization: `Bearer ${openaiToken}`, // Attach OpenAI token for authentication
        "Content-Type": "application/json", // Ensure the content type is JSON
      },
      method: "POST", // Use POST for sending the request
      body: JSON.stringify(requestBody), // Convert the request body to a JSON string
    });

    // If the response status is not OK, log the error and return the status message
    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("OpenAI API response error:", aiResponse.status, errorText);
      return { error: `OpenAI API error: ${aiResponse.status} - ${errorText}` };
    }

    // Parse the response as JSON
    const response = await aiResponse.json();
    return response;
  } catch (error) {
    // Log any network or other errors
    console.error("Error while fetching from OpenAI API:", error);
    return { error: "Failed to fetch AI response" };
  }
};
