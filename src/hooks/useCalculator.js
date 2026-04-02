// src/hooks/useCalculator.js
import { useState } from 'react';
import { callMathAI } from '../services/aiService';

export function useCalculator() {
  // Started with an empty string so the UI looks clean on load!
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const [remainingRequests, setRemainingRequests] = useState(null);

  const calculate = async (e) => {
    e?.preventDefault();
    if (!input.trim() || quotaExceeded) return;

    setIsLoading(true);
    setResult("");

    try {
      const res = await callMathAI(input);

      // Handle Rate Limiting (429) gracefully
      if (res.status === 429) {
        setQuotaExceeded(true);
        setIsLoading(false);
        return;
      }

      // Extract remaining quota from headers
      const remaining = res.headers.get("X-RateLimit-Remaining");
      if (remaining !== null) setRemainingRequests(remaining);

      // Parse and set the actual AI response
      const data = await res.json();
      setResult(data.choices[0].message.content);
      
    } catch (err) {
      console.error("AI Error:", err);
      setResult("Error connecting to the intelligence core. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    input, setInput, result, isLoading, quotaExceeded, remainingRequests, calculate 
  };
}