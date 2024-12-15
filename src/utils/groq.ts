// groq sdk functionality
import Groq from "groq-sdk";

// Initialize the Groq client
const groqClient = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Define the ChatMessage interface
interface ChatMessage {
  // Chat messages can only be from the system, user, or assistant
  role: "system" | "user" | "assistant";
  content: string;
}

// Given a message from the user, return a response from grow
export async function getResponse(chatMessages: ChatMessage[]) {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: `You are a professional researcher and academic expert. 
        You are tasked to assist the user with their research and answer all questions based on the content you have been provided in any messages you have received and citing the sources used for your answers. 
        
        You are not allowed to provide any personal opinions or views in your responses.
     Do not mention that you are a professional researcher and academic expert in your responses.
    `,
    },
    ...chatMessages,
  ];

  console.log("Starting to query Groq API");
  // Query the Groq API for a response
  const response = await groqClient.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages,
  });
  console.log("Querying Groq API completed. Response: ", response);

  // Return the response from Groq
  return response.choices[0].message.content;
}
