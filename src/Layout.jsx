// src/Layout.jsx
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Github, Linkedin, BrainCircuit, Moon, Sun } from 'lucide-react';
import { useTheme } from './hooks/useTheme';

export default function Layout() {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const variations =[1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="min-h-dvh flex flex-col w-full relative pt-safe pb-safe transition-colors duration-300 bg-gray-50 dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 selection:bg-blue-500/30">
      
      {/* Header */}
      <header className="w-full z-50 p-4 flex justify-between items-center bg-white/70 dark:bg-black/70 backdrop-blur-md border-b border-gray-200 dark:border-white/10 sticky top-0 transition-colors duration-300">
        <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <BrainCircuit className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <span>NeuroCalc <span className="text-xs opacity-50 font-normal">v2.0</span></span>
        </div>
        
        <div className="flex items-center gap-6">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
          </button>
          <div className="text-sm font-medium hidden md:block">
            Made by <span className="font-bold border-b border-current">Ram Bapat</span>
          </div>
        </div>
      </header>

      {/* Navigation for Variations */}
      <nav className="w-full border-b border-gray-200 dark:border-white/10 bg-white dark:bg-[#111] flex justify-center py-3 px-4 gap-4 z-40 relative transition-colors duration-300">
        <Link 
          to="/utility"
          className={`px-6 py-1.5 rounded-full text-sm font-medium transition-all ${
            location.pathname === '/utility' || location.pathname === '/'
              ? 'bg-black text-white dark:bg-white dark:text-black shadow-md' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          Utility View
        </Link>
        <Link 
          to="/organic"
          className={`px-6 py-1.5 rounded-full text-sm font-medium transition-all ${
            location.pathname === '/organic'
              ? 'bg-[#2C2C2C] text-[#F9F8F6] dark:bg-[#E8E6E1] dark:text-[#181816] shadow-md' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          Organic View
        </Link>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full h-full overflow-hidden">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full p-4 flex justify-center items-center gap-6 bg-white dark:bg-black border-t border-gray-200 dark:border-white/10 z-50 transition-colors duration-300">
        <a href="https://linkedin.com/in/YOUR_LINKEDIN" target="_blank" rel="noreferrer" 
           className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <Linkedin className="w-5 h-5" /> Connect on LinkedIn
        </a>
        <a href="https://github.com/YOUR_GITHUB" target="_blank" rel="noreferrer"
           className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
          <Github className="w-5 h-5" /> View Source
        </a>
      </footer>
    </div>
  );
}