
import React, { useState, useCallback, useRef } from 'react';
import { Heart, Stars, Sparkles, Check, X, Rocket, Gift, Share2, Github, Globe, ShieldCheck, Copy, ChevronRight } from 'lucide-react';
import FallingHearts from './components/FallingHearts';
import PoppingHeart from './components/PoppingHeart';
import Envelope from './components/Envelope';
import { generateRomanticMessage } from './services/geminiService';
import { Question } from './types';

const QUESTIONS: Question[] = [
  { 
    id: 1, 
    text: "Will you be my Valentine?", 
    image: "", 
    bgImage: "https://images.unsplash.com/photo-1518199266791-739d6ff26ed5?auto=format&fit=crop&q=80&w=1920" 
  },
  { 
    id: 2, 
    text: "Buy me a diamond ring?", 
    image: "", 
    bgImage: "https://images.unsplash.com/photo-1598560917505-59a3ad5cb9ca?auto=format&fit=crop&q=80&w=1920" 
  },
  { 
    id: 3, 
    text: "Take me on a Euro trip?", 
    image: "", 
    bgImage: "https://images.unsplash.com/photo-1431274172761-fca41d93e114?auto=format&fit=crop&q=80&w=1920" 
  },
  { 
    id: 4, 
    text: "Give me all your hoodies?", 
    image: "", 
    bgImage: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1920" 
  },
  { 
    id: 5, 
    text: "Love me forever and ever?", 
    image: "", 
    bgImage: "https://images.unsplash.com/photo-1516589174184-c6852661bbfd?auto=format&fit=crop&q=80&w=1920" 
  },
];

const App: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [noStyle, setNoStyle] = useState<React.CSSProperties>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDeployGuide, setShowDeployGuide] = useState(false);
  const [guideStep, setGuideStep] = useState(1);
  
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname.includes('idx.google.com');

  const moveNoButton = useCallback(() => {
    const x = Math.random() * (window.innerWidth - 140);
    const y = Math.random() * (window.innerHeight - 80);
    
    setNoStyle({
      position: 'fixed',
      left: `${x}px`,
      top: `${y}px`,
      zIndex: 999,
      transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)'
    });
    
    setYesScale(prev => Math.min(prev + 0.4, 15)); 
  }, []);

  const handleYes = async () => {
    setIsLoading(true);
    try {
      const msg = await generateRomanticMessage(QUESTIONS[currentIdx].text);
      setAiMessage(msg);
    } catch (e) {
      setAiMessage("You're the absolute best! ❤️");
    }
    setIsLoading(false);

    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setYesScale(1);
      setNoStyle({});
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setYesScale(1);
    setNoStyle({});
    setIsCompleted(false);
    setAiMessage("");
    setIsOpened(false);
  };

  if (!isOpened) {
    return <Envelope onOpen={() => setIsOpened(true)} />;
  }

  const currentBg = isCompleted 
    ? "https://images.unsplash.com/photo-1518199266791-739d6ff26ed5?auto=format&fit=crop&q=80&w=1920" 
    : QUESTIONS[currentIdx].bgImage;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative bg-rose-50 overflow-hidden transition-all duration-1000 animate-fade-in-slow">
      
      <div 
        className="fixed inset-0 z-0 transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${currentBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px) brightness(0.7)',
          transform: 'scale(1.1)', 
        }}
      />
      
      <FallingHearts />

      {/* Beginner Guide Button */}
      {isLocal && (
        <button 
          onClick={() => { setShowDeployGuide(true); setGuideStep(1); }}
          className="fixed top-6 left-6 z-50 bg-white hover:bg-rose-50 text-rose-600 px-6 py-3 rounded-2xl font-bold shadow-xl flex items-center gap-2 border-2 border-rose-200 animate-bounce transition-all active:scale-95"
        >
          <Rocket size={20} />
          START DEPLOYMENT GUIDE
        </button>
      )}

      <main className="z-10 w-full max-w-xl">
        {!isCompleted ? (
          <div className="flex flex-col items-center">
            <div className="flex gap-2 mb-6 bg-black/20 backdrop-blur-md p-2 px-4 rounded-full border border-white/10">
              {QUESTIONS.map((_, i) => (
                <Heart 
                  key={i} 
                  size={16} 
                  fill={i <= currentIdx ? "#e11d48" : "transparent"} 
                  className={i <= currentIdx ? "text-rose-500 animate-pulse" : "text-white/30"} 
                />
              ))}
            </div>

            <div className="bg-white/85 backdrop-blur-2xl rounded-[3rem] shadow-2xl p-8 md:p-12 text-center border border-white/40 relative flex flex-col items-center justify-center min-h-[480px] w-full">
              <PoppingHeart keyTrigger={currentIdx} />

              <h1 className="text-3xl md:text-4xl font-romantic text-rose-700 mb-8 px-4 leading-tight drop-shadow-sm">
                {QUESTIONS[currentIdx].text}
              </h1>

              {aiMessage && (
                <div className="mb-6 px-6 py-3 bg-rose-50 rounded-2xl text-rose-600 font-medium italic animate-fade-in border border-rose-100 shadow-inner">
                  "{aiMessage}"
                </div>
              )}

              <div className="flex flex-wrap items-center justify-center gap-8 mt-auto w-full min-h-[120px]">
                <button
                  onClick={handleYes}
                  disabled={isLoading}
                  style={{ 
                    transform: `scale(${yesScale})`,
                    transition: 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-black py-4 px-12 rounded-full shadow-2xl z-20 flex items-center gap-3 active:scale-95 border-2 border-white/30"
                >
                  {isLoading ? <Sparkles className="animate-spin" /> : <Check size={24} />} YES!
                </button>

                <button
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  style={noStyle}
                  className="bg-white hover:bg-rose-50 text-gray-400 font-bold py-3 px-8 rounded-full shadow-lg z-10 border border-gray-100 transition-colors whitespace-nowrap"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white/95 backdrop-blur-3xl rounded-[3.5rem] shadow-2xl p-12 text-center border-4 border-rose-400 animate-pop-in relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400 animate-pulse" />
            
            <div className="mb-10 flex justify-center space-x-4">
              <Stars className="text-yellow-500 animate-spin-slow" size={48} />
              <div className="bg-rose-100 p-6 rounded-full shadow-inner">
                <Gift className="text-rose-600 animate-bounce" size={56} />
              </div>
              <Stars className="text-yellow-500 animate-spin-slow" size={48} />
            </div>
            
            <h2 className="text-6xl font-romantic text-rose-700 mb-8 drop-shadow-sm">
              Happy Valentine's Day! ❤️
            </h2>
            
            <p className="text-2xl text-rose-800 italic mb-10 max-w-md mx-auto font-medium leading-relaxed">
              "{aiMessage || "You've made me the luckiest person! I'm holding you to all those promises. Love you!"}"
            </p>

            <button
              onClick={handleReset}
              className="bg-rose-100 hover:bg-rose-200 text-rose-600 font-bold py-4 px-10 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 mx-auto"
            >
              Start Over
            </button>
          </div>
        )}
      </main>

      {/* Beginners Deployment Guide Modal */}
      {showDeployGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
           <div className="bg-white rounded-[3rem] p-10 max-w-2xl w-full shadow-2xl relative animate-pop-in border-4 border-rose-500 max-h-[90vh] overflow-y-auto">
              <button onClick={() => setShowDeployGuide(false)} className="absolute top-6 right-6 text-gray-400 hover:text-rose-500 transition-colors">
                <X size={36} />
              </button>
              
              <div className="text-center mb-10">
                <div className="bg-rose-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Rocket size={40} className="text-rose-600" />
                </div>
                <h3 className="text-4xl font-bold font-romantic text-rose-700">Cupid's Deployment Guide</h3>
                <p className="text-gray-500">Let's put your website on the internet!</p>
              </div>

              {/* Progress Steps */}
              <div className="flex justify-between mb-12 relative">
                <div className="absolute top-5 left-0 w-full h-1 bg-gray-100 -z-10"></div>
                {[1, 2, 3].map(s => (
                  <div 
                    key={s}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all ${guideStep >= s ? 'bg-rose-600 text-white' : 'bg-white border-2 border-gray-200 text-gray-400'}`}
                  >
                    {s}
                  </div>
                ))}
              </div>

              <div className="space-y-8">
                {guideStep === 1 && (
                  <div className="animate-fade-in">
                    <div className="flex items-center gap-3 mb-4 text-rose-600 font-bold text-xl">
                      <Github size={28} /> Step 1: Upload to GitHub
                    </div>
                    <ul className="space-y-4 text-gray-700 list-disc pl-6 text-lg">
                      <li>Create an account on <a href="https://github.com" target="_blank" className="text-rose-600 underline font-bold">GitHub.com</a>.</li>
                      <li>Click "New Repository" and name it <strong>my-valentine</strong>.</li>
                      <li>Upload all files from your computer to this repository.</li>
                    </ul>
                  </div>
                )}

                {guideStep === 2 && (
                  <div className="animate-fade-in">
                    <div className="flex items-center gap-3 mb-4 text-rose-600 font-bold text-xl">
                      <Globe size={28} /> Step 2: Link to Vercel
                    </div>
                    <ul className="space-y-4 text-gray-700 list-disc pl-6 text-lg">
                      <li>Login to <a href="https://vercel.com" target="_blank" className="text-rose-600 underline font-bold">Vercel.com</a> using GitHub.</li>
                      <li>Click "Add New" → "Project".</li>
                      <li>Select your <strong>my-valentine</strong> repository and click "Import".</li>
                    </ul>
                  </div>
                )}

                {guideStep === 3 && (
                  <div className="animate-fade-in">
                    <div className="flex items-center gap-3 mb-4 text-rose-600 font-bold text-xl">
                      <ShieldCheck size={28} /> Step 3: Add Your AI Key
                    </div>
                    <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 text-gray-700">
                      <p className="mb-4 text-lg">Before clicking "Deploy" on Vercel, look for <strong>Environment Variables</strong>:</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded-lg border border-amber-300 font-mono text-sm">NAME: <strong>API_KEY</strong></div>
                        <div className="bg-white p-3 rounded-lg border border-amber-300 font-mono text-sm">VALUE: <strong>(Your Gemini Key)</strong></div>
                      </div>
                      <p className="mt-4 text-sm text-amber-600 italic">This allows the "AI Sweet Talk" feature to work safely.</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-12 pt-8 border-t border-gray-100">
                {guideStep > 1 && (
                  <button 
                    onClick={() => setGuideStep(guideStep - 1)}
                    className="text-gray-500 font-bold px-6 py-2"
                  >
                    Back
                  </button>
                )}
                {guideStep < 3 ? (
                  <button 
                    onClick={() => setGuideStep(guideStep + 1)}
                    className="ml-auto bg-rose-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-rose-700 transition-all"
                  >
                    Next <ChevronRight size={20} />
                  </button>
                ) : (
                  <button 
                    onClick={() => setShowDeployGuide(false)}
                    className="ml-auto bg-green-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-green-700 transition-all shadow-xl"
                  >
                    Ready to Deploy! <Check size={20} />
                  </button>
                )}
              </div>
           </div>
        </div>
      )}

      <footer className="fixed bottom-6 text-white/40 text-xs font-bold z-10 uppercase tracking-[0.2em]">
        Designed for a perfect yes
      </footer>

      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fade-in-slow { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pop-in { 0% { transform: scale(0.7); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        .animate-fade-in-slow { animation: fade-in-slow 1s ease-in-out forwards; }
        .animate-pop-in { animation: pop-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
      `}</style>
    </div>
  );
};

export default App;
