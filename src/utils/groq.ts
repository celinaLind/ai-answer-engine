// groq sdk functionality
import Groq from "groq-sdk";
import { getScraped } from "./get-scraped";

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
export async function getResponse(message: string) {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content:
        "You are a professional researcher and academic expert You are tasked to assist the user with their research and answer all questions based on the context you have been provided and citing the sources used for your answers.",
    },
    { role: "user", content: message },
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
