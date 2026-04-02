# 🧠 NeuroCalc - Smart AI Calculator

![License](https://img.shields.io/badge/License-MIT-blue.svg) ![React](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-Fast-yellow) ![AI](https://img.shields.io/badge/AI-GPT--OSS--120B-green)

**Day 02 / 30 - April Vibe Coding Challenge**

## Try the live demo - [Demo](https://neurocalc-your-link.vercel.app)

NeuroCalc is a premium, natural-language mathematical solver powered by **GPT-OSS-120B**, a highly proficient mathematical LLM. Instead of punching rigid numbers into a traditional calculator, simply type your problem exactly as it sounds in your head, and watch the AI break down the logic step-by-step.

Built with a highly refined **"Organic"** aesthetic, it features fluid shapes, elegant editorial typography, and flawless rendering of complex LaTeX math equations.

## Screenshots

![Project Screenshot](/public/home-01.png) 
![Project Screenshot](/public/home-02.png) 
![Project Screenshot](/public/home-03.png) 

## ✨ Features

*   **🗣️ Natural Language Input:** Ask questions like *"What is 20% growth on 34, then 34% on that?"* without knowing the formulas.
*   **📐 Beautiful Math Rendering:** Full support for Markdown tables and LaTeX math formatting (`rehype-katex`) for crystal clear, step-by-step visual resolutions.
*   **🎨 Premium Organic Theme:** A stunning, fluid UI with a seamless Light/Dark mode toggle that feels like a high-end editorial magazine.
*   **🎲 Dynamic Suggestions:** Generates random, highly-stylized prompt cards on every load to demonstrate the engine's power instantly.
*   **⚡ Real-Time Quota Tracking:** Gracefully handles 429 rate limits and displays remaining daily API calls directly in the UI.

## 🛠️ Tech Stack

*   **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Lucide React.
*   **Markdown Parsing:** React-Markdown, Remark-Math, Rehype-Katex.
*   **Backend Proxy:** Serverless Cloud Function (Node.js).
*   **AI Model:** `openai/gpt-oss-120b` (Optimized for mathematical and logical reasoning).

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Barrsum/NeuroCalc-Smart-Ai-Calculator.git
cd NeuroCalc-Smart-Ai-Calculator
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment & Backend Setup
To protect API keys, this frontend communicates with a secure proxy backend.

**Option A: Use the Open Source Proxy (Recommended for local dev)**
I have provided a simple Node.js proxy server in a separate repo.
1. Get your API Key from your preferred AI provider.
2. Set up the proxy locally on port 3000.

Refer to this repo's Readme for the backend setup:
[Backend Node Server Repo](https://github.com/Barrsum/Simple-Node-Backend-Server-For-Nvidia-AI-Processing)

**Option B: Configure Frontend to point to your Proxy**
Open `src/services/aiService.js` and update the `API_URL` to point to your running local proxy or production backend:
```javascript
const API_URL = "http://localhost:3000/api/chat"; 
// Update this!
```

### 4. Run the App
```bash
npm run dev
```
The app will launch on `http://localhost:5173`.

## 🛡️ Architecture & Security

This app uses a **Facade Pattern** architecture. The frontend never holds or exposes the AI API keys.
1.  **Frontend** sends the natural language query -> **Secure Proxy**.
2.  **Proxy** validates Rate Limits (IP-based) & CORS constraints.
3.  **Proxy** injects the hidden API Key and communicates with the LLM.
4.  **Result** is returned, pre-processed by the frontend via Regex, and rendered natively as LaTeX.

*Note: The demo backend is heavily rate-limited to 50 requests/IP per day to prevent abuse.*

## 👤 Author

**Ram Bapat**
*   [LinkedIn](https://www.linkedin.com/in/ram-bapat-barrsum-diamos)
*   [GitHub](https://github.com/Barrsum)

---
*Part of the April 2026 Vibe Coding Challenge.*