export const openAIApi = async (
  model: any,
  messages: any,
  inboxConfig: any,
  options = {}
) => {
  const { openaiToken } = inboxConfig;

  try {
    const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiToken}`,
      },
      body: JSON.stringify({
        model,
        messages,
        ...options,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `OpenAI API request failed with status ${response.status}: ${errorText}`
      );
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error; // Re-throw to handle it further up the call stack
  }
};
