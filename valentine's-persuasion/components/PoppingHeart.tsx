
import React from 'react';
import { Heart } from 'lucide-react';

interface PoppingHeartProps {
  keyTrigger: number;
}

const PoppingHeart: React.FC<PoppingHeartProps> = ({ keyTrigger }) => {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center mx-auto mb-8">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-rose-200 rounded-full blur-2xl opacity-50 animate-pulse"></div>
      
      {/* The main heart with pop animation tied to keyTrigger */}
      <div 
        key={keyTrigger}
        className="relative z-10 animate-pop"
      >
        <Heart 
          size={120} 
          fill="#e11d48" 
          className="text-rose-600 drop-shadow-2xl"
        />
        
        {/* Little decorative hearts that pop out */}
        <div className="absolute -top-4 -right-4 animate-bounce delay-75">
          <Heart size={24} fill="#fb7185" className="text-rose-400" />
        </div>
        <div className="absolute -bottom-2 -left-4 animate-bounce delay-150">
          <Heart size={32} fill="#fda4af" className="text-rose-300" />
        </div>
      </div>

      <style>{`
        @keyframes pop {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop {
          animation: pop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
};

export default PoppingHeart;
