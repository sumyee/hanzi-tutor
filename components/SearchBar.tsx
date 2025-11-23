import React, { useState } from 'react';
import { Search, X, Sparkles } from 'lucide-react';

interface SearchBarProps {
  onSearch: (char: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const firstChar = input.trim().charAt(0);
      if (/[\u4e00-\u9fa5]/.test(firstChar)) {
        onSearch(firstChar);
        setInput(firstChar);
      } else {
        alert("请输入一个汉字哦 ~ 🍊");
        setInput('');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm relative group z-20 mb-10">
      <div className="relative transition-all duration-300 transform group-hover:scale-105">
          
          <div className="absolute -top-6 -left-6 text-macaron-pink animate-bounce-slow">
             <Sparkles size={32} />
          </div>

          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <Search className="h-8 w-8 text-macaron-blue group-hover:text-macaron-accent transition-colors" strokeWidth={3} />
          </div>
          
          <input
            type="text"
            className="block w-full pl-16 pr-16 py-5 bg-white border-4 border-macaron-blue/20 rounded-full text-macaron-text font-sans font-bold text-4xl text-center placeholder:text-slate-300 placeholder:text-2xl placeholder:font-bold shadow-toy focus:outline-none focus:border-macaron-blue focus:ring-4 focus:ring-macaron-blue/10 transition-all"
            placeholder="输入汉字..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            maxLength={1}
          />

          {input && (
            <button
              type="button"
              onClick={() => setInput('')}
              className="absolute inset-y-0 right-0 pr-6 flex items-center cursor-pointer"
            >
              <div className="bg-slate-100 hover:bg-macaron-pink text-slate-300 hover:text-white rounded-full p-2 transition-colors">
                <X className="h-6 w-6" strokeWidth={3} />
              </div>
            </button>
          )}
      </div>
    </form>
  );
};