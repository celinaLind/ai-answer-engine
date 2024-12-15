import { Message } from "postcss";

export async function saveConversation(id: string, messages: Message[]) {
  try {
    console.info(`Saving conversation for ID: ${id}`);
    await redis.set(id, JSON.stringify(messages));
    // Set the expiration time for the conversation
    await redis.expire(id, CONVERSATION_TTL);
    console.info(
      `Conversation saved for ID: ${id} with ${messages.length} messages`
    );
  } catch (error) {
    console.error("Error saving conversation", id, ":", error);
    throw error;
  }
}
