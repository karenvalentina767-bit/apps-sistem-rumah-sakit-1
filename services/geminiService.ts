import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

// Initialize the client
// NOTE: In a real production build for Netlify/GitHub, ensure the environment variable 
// VITE_API_KEY (or REACT_APP_API_KEY depending on bundler) is set in the CI/CD settings.
// For this code structure, we rely on process.env.API_KEY as per the instructions.
const apiKey = process.env.API_KEY || ''; 

let client: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (!apiKey) {
    console.error("API Key is missing. Please set process.env.API_KEY");
  }

  // Always create a new client to ensure key freshness if it changes (though usually static)
  client = new GoogleGenAI({ apiKey });

  chatSession = client.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7, // Balance between professional and natural
      maxOutputTokens: 500, // Keep responses concise as requested
    },
  });

  return chatSession;
};

export const sendMessageStream = async function* (message: string) {
  if (!chatSession) {
    initializeChat();
  }

  if (!chatSession) {
    throw new Error("Failed to initialize chat session");
  }

  try {
    const result = await chatSession.sendMessageStream({ message });
    
    for await (const chunk of result) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};