import React from 'react';
import { CharData } from '../types';
import { BookOpen, Quote, Sparkles } from 'lucide-react';

interface InfoCardProps {
  data: CharData | null;
  isLoading: boolean;
}

export const InfoCard: React.FC<InfoCardProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mt-12 p-8 bg-white/60 backdrop-blur-sm rounded-[2rem] border border-white shadow-lg animate-pulse">
        <div className="h-12 bg-slate-200 rounded-xl w-1/4 mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-slate-200 rounded-full w-3/4"></div>
          <div className="h-4 bg-slate-200 rounded-full w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="w-full max-w-2xl mt-12 bg-white/80 backdrop-blur-sm rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white overflow-hidden transition-all duration-500 ease-out transform hover:-translate-y-1">
      <div className="p-8 sm:p-10 relative">
        
        {/* Decorative background circle */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-gradient-to-br from-candy-yellow to-candy-green rounded-full opacity-20 blur-2xl"></div>

        <div className="flex flex-col sm:flex-row sm:items-baseline gap-6 mb-8 border-b border-slate-100 pb-8 relative z-10">
            <div className="relative">
                <h2 className="text-7xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-800 to-slate-600 z-10 relative">{data.character}</h2>
                <div className="absolute -bottom-2 -right-2 text-candy-purple opacity-20">
                    <Sparkles size={40} />
                </div>
            </div>
            <div className="flex flex-col">
                <span className="text-3xl text-candy-purple font-serif font-bold italic tracking-wide">{data.pinyin}</span>
                <span className="text-xs text-slate-400 font-extrabold uppercase tracking-widest mt-1">Pinyin</span>
            </div>
        </div>
        
        <div className="space-y-8 relative z-10">
            <div>
                <div className="flex items-center gap-2 text-candy-blue mb-3">
                    <BookOpen size={18} className="fill-current opacity-50" />
                    <span className="text-xs font-bold uppercase tracking-widest">Definition</span>
                </div>
                <p className="text-xl text-slate-700 leading-relaxed font-medium">
                    {data.definition}
                </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-3xl p-8 shadow-sm relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-candy-pink/50 rounded-l-3xl"></div>
                <div className="flex items-center gap-2 text-candy-pink mb-4">
                    <Quote size={18} className="fill-current opacity-50" />
                    <span className="text-xs font-bold uppercase tracking-widest">Example</span>
                </div>
                <p className="text-2xl text-slate-800 font-serif mb-3 group-hover:text-candy-purple transition-colors duration-300">{data.exampleSentence}</p>
                <p className="text-slate-500 font-medium">{data.exampleTranslation}</p>
            </div>
        </div>
      </div>
    </div>
  );
};