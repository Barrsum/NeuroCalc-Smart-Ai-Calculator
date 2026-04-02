// src/services/aiService.js

const API_URL = "https://demoproxy-5pt4k6sthq-el.a.run.app";
const MODEL_NAME = "openai/gpt-oss-120b";

/**
 * Handles communication with the Serverless AI Proxy
 * @param {string} input - The natural language mathematical query
 * @returns {Promise<Response>} - The raw fetch Response object
 */
export async function callMathAI(input) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL_NAME,
      messages:[
        { 
          role: "system", 
          content: "You are an expert mathematical AI. Explain calculations step-by-step clearly." 
        },
        { 
          role: "user", 
          content: input 
        }
      ]
    })
  });

  return response;
}