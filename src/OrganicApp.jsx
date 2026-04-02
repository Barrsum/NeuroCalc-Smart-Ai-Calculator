// src/OrganicApp.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { BrainCircuit, Moon, Sun, Github, Linkedin, Sparkles, Code2 } from 'lucide-react';

import { useCalculator } from './hooks/useCalculator';
import { useTheme } from './hooks/useTheme';
import { getRandomPrompts } from './data/prompts';

export default function OrganicApp() {
  // Notice: isDemo and setIsDemo are completely removed!
  const { input, setInput, result, isLoading, quotaExceeded, remainingRequests, calculate } = useCalculator();
  const { isDark, toggleTheme } = useTheme();
  const [activePrompts, setActivePrompts] = useState([]);

  // Load 3 random prompts on initial mount
  useEffect(() => {
    setActivePrompts(getRandomPrompts(3));
  },[]);

  // PRE-PROCESSOR: Converts LLM LaTeX syntax (\[ \]) into Markdown Math syntax ($$ $$)
  const formatMath = (content) => {
    if (!content) return "";
    return content
      .replace(/\\\[([\s\S]*?)\\\]/g, '$$$$$1$$$$')
      .replace(/\\\(([\s\S]*?)\\\)/g, '$$$1$$');
  };

  return (
    <div className="min-h-dvh flex flex-col w-full relative pt-safe pb-safe transition-colors duration-500 bg-[#F9F8F6] dark:bg-[#181816] text-[#2C2C2C] dark:text-[#E8E6E1] font-sans selection:bg-[#2C2C2C] selection:text-[#F9F8F6] dark:selection:bg-[#E8E6E1] dark:selection:text-[#181816]">
      
      {/* Organic Header */}
      <header className="w-full px-6 py-8 flex justify-between items-center z-50">
        <div className="flex items-center gap-3 font-editorial italic text-xl md:text-2xl">
          <BrainCircuit className="w-6 h-6 opacity-80" />
          <span>NeuroCalc</span>
        </div>
        
        <div className="flex items-center gap-4">
          {remainingRequests && (
             <span className="text-xs font-semibold tracking-widest uppercase opacity-50 hidden md:block">
               {remainingRequests} Compute Cycles Left
             </span>
          )}
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            {isDark ? <Sun className="w-5 h-5 opacity-80" /> : <Moon className="w-5 h-5 opacity-80" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 md:px-12 pb-12 w-full max-w-5xl mx-auto">
        
        {!result && !isLoading && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 mt-4 md:mt-8">
            <h1 className="text-5xl md:text-6xl font-editorial italic mb-6">Ask naturally.</h1>
            <p className="text-lg md:text-xl font-light opacity-70 leading-relaxed max-w-2xl mx-auto">
              Mathematics doesn't have to be rigid. Type your question exactly as it sounds in your head, and watch the logic unfold.
            </p>
          </motion.div>
        )}

        {/* Fluid Input Area */}
        <div 
          className={`w-full max-w-4xl bg-white/60 dark:bg-[#22221F]/60 backdrop-blur-md p-8 shadow-sm transition-all duration-500 focus-within:shadow-xl focus-within:bg-white dark:focus-within:bg-[#22221F] ${result || isLoading ? 'mt-0' : ''}`}
          style={{ borderRadius: '30px 40px 30px 40px' }}
        >
          <textarea 
            className="w-full bg-transparent text-center text-xl md:text-2xl font-light focus:outline-none resize-none min-h-[120px] leading-relaxed placeholder:opacity-30"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Speak your numbers..."
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); calculate(); } }}
          />
          <div className="flex justify-center mt-6">
            <button 
              onClick={calculate} disabled={isLoading || quotaExceeded || !input.trim()}
              className="border border-current px-12 py-3 rounded-[30px] font-medium hover:bg-[#2C2C2C] hover:text-[#F9F8F6] dark:hover:bg-[#E8E6E1] dark:hover:text-[#181816] transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-current"
            >
              {isLoading ? 'Unfolding...' : quotaExceeded ? 'Daily Quota Exceeded' : 'Resolve'}
            </button>
          </div>
        </div>

        {/* POLISHED UI: Elegant Random Suggestion Cards */}
        {!result && !isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="w-full max-w-4xl mt-12">
            <div className="flex items-center gap-2 mb-4 opacity-50 justify-center md:justify-start pl-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm tracking-widest uppercase font-semibold">Try these examples</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activePrompts.map((p, idx) => (
                <button 
                  key={idx} onClick={() => setInput(p)}
                  className="text-left p-6 rounded-3xl bg-white/40 dark:bg-[#2A2A26]/40 hover:bg-white dark:hover:bg-[#33332E] border border-current/5 hover:border-current/20 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between min-h-[120px]"
                >
                  <span className="text-sm md:text-base font-light leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">"{p}"</span>
                  <span className="text-xs font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-50 transition-opacity mt-4">Calculate →</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Output Area with Markdown & Math Support */}
        <div className="w-full max-w-4xl mt-12 mb-10">
          {isLoading && <div className="text-center opacity-50 italic text-lg animate-pulse">Deducing the path...</div>}
          
          {result && !isLoading && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="w-full bg-white/40 dark:bg-[#22221F]/40 backdrop-blur-sm p-8 md:p-12 shadow-sm border border-current/5"
              style={{ borderRadius: '40px 30px 40px 30px' }}
            >
              <div className="prose prose-lg dark:prose-invert prose-headings:font-editorial prose-headings:italic prose-p:font-light prose-p:leading-loose prose-a:text-current prose-strong:font-medium prose-td:border-current/20 prose-th:border-current/20 max-w-none text-[#2C2C2C] dark:text-[#E8E6E1]">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {formatMath(result)}
                </ReactMarkdown>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* POLISHED UI: Prominent Creator Footer */}
      <footer className="w-full px-6 py-10 mt-auto border-t border-current/10 flex flex-col md:flex-row justify-between items-center gap-8 z-50 bg-white/30 dark:bg-black/20 backdrop-blur-md">
        
        {/* Creator Identity */}
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5 text-center md:text-left">
          <span className="text-lg md:text-xl font-editorial italic">
            Engineered & Designed by <span className="font-bold not-italic tracking-wide">Ram Bapat</span>
          </span>
          <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-current opacity-30"></span>
          <span className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20">
            <Code2 className="w-3 h-3" /> Open Source
          </span>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a 
            href="https://www.linkedin.com/in/ram-bapat-barrsum-diamos" 
            target="_blank" rel="noreferrer" 
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <Linkedin className="w-4 h-4" /> Connect
          </a>
          <a 
            href="https://github.com/Barrsum/NeuroCalc-Smart-Ai-Calculator" 
            target="_blank" rel="noreferrer" 
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2C2C2C] dark:bg-white hover:bg-black dark:hover:bg-gray-200 text-white dark:text-black text-sm font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <Github className="w-4 h-4" /> Source Code
          </a>
        </div>
      </footer>

    </div>
  );
}