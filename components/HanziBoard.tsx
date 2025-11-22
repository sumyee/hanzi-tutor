import React, { useEffect, useRef, useState } from 'react';
import HanziWriter from 'hanzi-writer';
import { toast } from 'react-toastify';
import { WriteMode } from '../types';
import { RefreshCw, Play, PenTool } from 'lucide-react';

interface HanziBoardProps {
  character: string;
  mode: WriteMode;
  onModeChange: (mode: WriteMode) => void;
}

export const HanziBoard: React.FC<HanziBoardProps> = ({ character, mode, onModeChange }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<HanziWriter | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize HanziWriter
  useEffect(() => {
    if (!divRef.current || !character) return;

    setIsLoading(true);
    
    if (divRef.current) {
      divRef.current.innerHTML = '';
    }

    const writer = HanziWriter.create(divRef.current, character, {
      width: 320, // Slightly larger board
      height: 320,
      padding: 20,
      showOutline: true,
      strokeAnimationSpeed: 1.2,
      delayBetweenStrokes: 200,
      strokeColor: '#5D5F61', // Soft Grey
      outlineColor: '#E2E8F0', // Light Grey
      drawingWidth: 30, // Thicker strokes for kids
      showCharacter: mode === WriteMode.WATCH,
    });

    writerRef.current = writer;

    setTimeout(() => setIsLoading(false), 500);

    return () => {
      if (writerRef.current) {
        writerRef.current.cancelQuiz();
      }
    };
  }, [character]);

  useEffect(() => {
    if (!writerRef.current || isLoading) return;

    if (mode === WriteMode.WATCH) {
      writerRef.current.cancelQuiz();
      writerRef.current.showCharacter();
      writerRef.current.animateCharacter();
    } else {
      startQuiz();
    }
  }, [mode, isLoading]);

  const startQuiz = () => {
    if (!writerRef.current) return;
    
    writerRef.current.showOutline();
    writerRef.current.hideCharacter();
    
    writerRef.current.quiz({
      onMistake: function() {
        toast.info(
          <div className="!text-3xl !font-black !text-center !p-6 !flex !items-center !justify-center !font-sans">
            哎呀，笔画顺序不对哦 ~ 🍄
          </div>,
          {
            icon: false, // Hide default icon, we use text
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            theme: "light",
            className: "!w-auto !min-w-[340px] !rounded-[2.5rem] !border-[6px] !border-macaron-pink !bg-white !text-macaron-text !shadow-toy-pressed mx-4 mt-20",
          }
        );
      },
      onCorrectStroke: function() {
        // Subtle feedback
      },
      onComplete: function() {
        toast.success(
          <div className="!text-3xl !font-black !text-center !p-6 !flex !items-center !justify-center !font-sans">
            太棒了！你真聪明！⭐
          </div>,
          {
            icon: false,
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: true,
            closeButton: false,
            theme: "light",
            className: "!w-auto !min-w-[340px] !rounded-[2.5rem] !border-[6px] !border-macaron-green !bg-white !text-macaron-text !shadow-toy-pressed mx-4 mt-20",
          }
        );
        setTimeout(() => {
            onModeChange(WriteMode.WATCH); 
        }, 2500);
      }
    });
  };

  const handleReplay = () => {
     if (!writerRef.current) return;
     if (mode === WriteMode.WATCH) {
         writerRef.current.animateCharacter();
     } else {
         startQuiz();
     }
  };

  return (
    <div className="flex flex-col items-center">
      
      {/* Main Board Frame */}
      <div className="relative p-5 bg-white rounded-[3.5rem] shadow-toy mb-12 border-[6px] border-white ring-[10px] ring-macaron-blue ring-opacity-20 transition-transform duration-300 hover:scale-[1.02]">
        
        {/* Decorative Ears/Elements */}
        <div className="absolute -top-8 left-10 w-24 h-24 bg-macaron-yellow rounded-full -z-10 opacity-80"></div>
        <div className="absolute -bottom-8 right-10 w-28 h-28 bg-macaron-pink rounded-full -z-10 opacity-80"></div>

        {/* Writing Area with Cute Tianzige */}
        <div className="relative bg-macaron-bg rounded-[3rem] overflow-hidden w-[320px] h-[320px] flex items-center justify-center border-[5px] border-dashed border-macaron-blue/30">
             {/* Tianzige Grid */}
             <div className="absolute inset-0 pointer-events-none opacity-40">
                <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-macaron-text/20 transform -translate-x-1/2 border-r-[3px] border-dotted border-macaron-text/30"></div>
                <div className="absolute left-0 right-0 top-1/2 h-1 bg-macaron-text/20 transform -translate-y-1/2 border-b-[3px] border-dotted border-macaron-text/30"></div>
            </div>
            
            {/* Mode Indicator */}
            <div className="absolute top-5 right-5 z-20">
                {mode === WriteMode.WATCH ? 
                  <div className="bg-macaron-blue/20 text-macaron-blue px-4 py-2 rounded-full text-base font-bold flex items-center gap-2">
                    <Play size={16} className="fill-current"/> 演示中
                  </div> : 
                  <div className="bg-macaron-green/20 text-green-500 px-4 py-2 rounded-full text-base font-bold flex items-center gap-2">
                    <PenTool size={16} /> 练习中
                  </div>
                }
            </div>

            <div ref={divRef} className="cursor-crosshair relative z-10" />
        </div>
      </div>

      {/* Controls - Big Chunky Buttons */}
      <div className="flex gap-8 items-center">
        <button
          onClick={() => onModeChange(WriteMode.WATCH)}
          className={`group flex flex-col items-center gap-2 transition-all duration-300 ${mode === WriteMode.WATCH ? '-translate-y-3' : 'hover:-translate-y-2'}`}
        >
          <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center border-b-[6px] transition-all ${
            mode === WriteMode.WATCH 
              ? 'bg-macaron-blue text-white border-blue-300 shadow-toy-pressed' 
              : 'bg-white text-macaron-blue border-slate-100 shadow-toy'
          }`}>
            <Play size={36} className={mode === WriteMode.WATCH ? "fill-current" : ""} />
          </div>
          <span className="text-lg font-bold text-slate-400 group-hover:text-macaron-blue transition-colors">看一看</span>
        </button>

        <button
            onClick={handleReplay}
            className="w-24 h-24 bg-macaron-yellow text-orange-400 rounded-full flex items-center justify-center shadow-toy hover:shadow-toy-pressed border-b-[6px] border-orange-200 hover:scale-105 active:scale-95 transition-all duration-200"
            title="Replay"
        >
            <RefreshCw size={40} strokeWidth={3} />
        </button>

        <button
          onClick={() => onModeChange(WriteMode.PRACTICE)}
          className={`group flex flex-col items-center gap-2 transition-all duration-300 ${mode === WriteMode.PRACTICE ? '-translate-y-3' : 'hover:-translate-y-2'}`}
        >
           <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center border-b-[6px] transition-all ${
            mode === WriteMode.PRACTICE
              ? 'bg-macaron-green text-white border-green-300 shadow-toy-pressed' 
              : 'bg-white text-macaron-green border-slate-100 shadow-toy'
          }`}>
            <PenTool size={36} />
          </div>
          <span className="text-lg font-bold text-slate-400 group-hover:text-macaron-green transition-colors">写一写</span>
        </button>
      </div>
    </div>
  );
};