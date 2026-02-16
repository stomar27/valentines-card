
import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
}

const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    // Delay the actual state change to allow the flap animation to play
    setTimeout(onOpen, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen z-50 p-4">
      <div 
        className={`relative w-72 h-48 md:w-96 md:h-64 bg-rose-100 rounded-b-lg shadow-2xl cursor-pointer transition-transform duration-700 ${isOpening ? 'scale-110 -translate-y-12 opacity-0' : 'hover:scale-105'}`}
        onClick={handleOpen}
      >
        {/* Envelope Body */}
        <div className="absolute inset-0 bg-rose-100 rounded-b-lg overflow-hidden border-b-2 border-rose-200">
           {/* Fold lines for the envelope back */}
           <div className="absolute inset-0 flex">
              <div className="w-1/2 h-full border-r border-rose-200/50 skew-x-[20deg] origin-bottom-left bg-rose-50/30"></div>
              <div className="w-1/2 h-full border-l border-rose-200/50 -skew-x-[20deg] origin-bottom-right bg-rose-50/30"></div>
           </div>
        </div>

        {/* The Flap */}
        <div 
          className={`absolute top-0 left-0 w-full h-full bg-rose-200 origin-top transition-transform duration-1000 z-20`}
          style={{ 
            clipPath: 'polygon(0 0, 50% 50%, 100% 0)',
            transform: isOpening ? 'rotateX(180deg)' : 'rotateX(0deg)',
          }}
        ></div>

        {/* The Seal */}
        {!isOpening && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 animate-pulse">
            <div className="bg-rose-600 p-3 rounded-full shadow-lg border-2 border-rose-400">
              <Heart fill="white" className="text-white" size={32} />
            </div>
          </div>
        )}

        {/* Opening Hint */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-rose-600 font-romantic text-2xl whitespace-nowrap animate-bounce">
          You have a secret message...
        </div>
      </div>
      
      {/* Background glow for the envelope */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-rose-50 to-rose-200"></div>
      
      <style>{`
        .perspective {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default Envelope;
