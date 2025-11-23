import React, { useState, useEffect } from 'react';
import { HanziBoard } from './components/HanziBoard';
import { SearchBar } from './components/SearchBar';
import { WriteMode } from './types';
import { ToastContainer } from 'react-toastify';
import { Cloud, Sun } from 'lucide-react';

function App() {
  const [currentChar, setCurrentChar] = useState<string>('爱');
  const [mode, setMode] = useState<WriteMode>(WriteMode.WATCH);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  useEffect(() => {
    handleSearch('爱');
  }, []);

  const handleSearch = async (char: string) => {
    setIsSearchLoading(true);
    setCurrentChar(char);
    setMode(WriteMode.WATCH);
    setTimeout(() => setIsSearchLoading(false), 300);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 relative overflow-hidden font-sans selection:bg-macaron-yellow selection:text-macaron-text">
      
      {/* Cute Background Elements */}
      <div className="absolute top-10 right-10 text-macaron-yellow animate-spin-slow opacity-80">
         <Sun size={100} fill="currentColor" className="animate-[spin_10s_linear_infinite]" />
      </div>
      <div className="absolute top-20 left-10 text-macaron-blue opacity-60 animate-bounce-slow">
         <Cloud size={80} fill="currentColor" strokeWidth={0} />
      </div>
       <div className="absolute top-40 right-1/4 text-macaron-pink opacity-40 animate-bounce-slow" style={{animationDelay: '1s'}}>
         <Cloud size={50} fill="currentColor" strokeWidth={0} />
      </div>

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center w-full max-w-xl">
        
        {/* Header */}
        <header className="mb-12 text-center relative">
            <div className="relative inline-block">
                <h1 className="text-7xl font-sans font-black text-macaron-text tracking-widest z-10 relative drop-shadow-sm">
                    <span className="text-macaron-blue">汉</span>
                    <span className="text-macaron-pink">字</span>
                    <span className="text-macaron-green">乐</span>
                    <span className="text-macaron-yellow text-shadow">园</span>
                </h1>
                <div className="absolute -bottom-3 left-0 w-full h-6 bg-macaron-yellow/50 -z-10 rounded-full transform -rotate-1"></div>
            </div>
            <p className="text-slate-400 font-bold mt-6 text-xl tracking-widest bg-white/80 px-6 py-2 rounded-full inline-block shadow-sm">
                开心写字 · 快乐成长
            </p>
        </header>

        <div className="w-full flex flex-col items-center">
            <SearchBar onSearch={handleSearch} isLoading={isSearchLoading} />
            
            <HanziBoard 
                character={currentChar} 
                mode={mode} 
                onModeChange={setMode} 
            />
        </div>

      </div>
      
      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full h-6 bg-gradient-to-r from-macaron-pink via-macaron-yellow to-macaron-blue opacity-50"></div>

      <ToastContainer 
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default App;