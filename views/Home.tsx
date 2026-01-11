
import React, { useState, useEffect } from 'react';
import { AppState, LogEntry } from '../types';
import Navigation from '../components/Navigation';
import { generateWarmGreeting } from '../services/geminiService';
import { Heart, Info, Coffee, Sun, Moon, Smile, Frown, Meh, SmilePlus, Laugh } from 'lucide-react';

interface HomeProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
}

const moods = [
  { value: 1, icon: <Frown size={24} />, label: '难过' },
  { value: 2, icon: <Meh size={24} />, label: '一般' },
  { value: 3, icon: <Smile size={24} />, label: '还行' },
  { value: 4, icon: <SmilePlus size={24} />, label: '开心' },
  { value: 5, icon: <Laugh size={24} />, label: '超棒' },
];

const Home: React.FC<HomeProps> = ({ state, updateState }) => {
  const [greeting, setGreeting] = useState<string>('');
  const [showPopup, setShowPopup] = useState(false);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [mood, setMood] = useState<number>(3);

  const isCheckedInToday = () => {
    if (!state.lastCheckIn) return false;
    const last = new Date(state.lastCheckIn);
    const today = new Date();
    return (
      last.getDate() === today.getDate() &&
      last.getMonth() === today.getMonth() &&
      last.getFullYear() === today.getFullYear()
    );
  };

  const handleCheckIn = async () => {
    if (isCheckedInToday()) return;

    setIsCheckingIn(true);
    const aiGreeting = await generateWarmGreeting(state.nickname);
    setGreeting(aiGreeting);
    
    const now = Date.now();
    const newEntry: LogEntry = {
      timestamp: now,
      tags: selectedTags,
      note: note,
      happiness: mood
    };

    updateState({
      lastCheckIn: now,
      checkInStreak: state.checkInStreak + 1,
      logs: [newEntry, ...state.logs]
    });

    setIsCheckingIn(false);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 5000);
    
    // Clear log inputs
    setSelectedTags([]);
    setNote('');
    setMood(3);
  };

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: '早安，祝你有美好的一天', icon: <Sun className="text-orange-400" /> };
    if (hour < 18) return { text: '午后好，记得休息一下', icon: <Coffee className="text-amber-500" /> };
    return { text: '晚安，世界依然温暖', icon: <Moon className="text-indigo-400" /> };
  };

  const timeData = getTimeGreeting();

  return (
    <div className="flex flex-col min-h-screen px-6 pt-12 animate-in fade-in duration-500">
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          {timeData.icon}
          <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">{timeData.text}</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900">
          你好，{state.nickname || '朋友'}
        </h1>
      </header>

      <div className="flex-grow flex flex-col items-center justify-center -mt-8">
        <button
          onClick={handleCheckIn}
          disabled={isCheckedInToday() || isCheckingIn}
          className={`relative w-56 h-56 rounded-full flex flex-col items-center justify-center transition-all duration-500 transform active:scale-95 shadow-2xl ${
            isCheckedInToday() 
              ? 'bg-orange-50 cursor-default' 
              : 'bg-gradient-to-br from-orange-400 to-rose-400 hover:shadow-orange-200'
          }`}
        >
          {isCheckedInToday() ? (
            <div className="flex flex-col items-center text-orange-500">
              <Heart size={64} fill="currentColor" className="mb-4" />
              <span className="text-lg font-bold">今日已安好</span>
              <span className="text-xs mt-1 opacity-70">连续平安 {state.checkInStreak} 天</span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-white">
              <Heart size={64} className="mb-4 animate-pulse" />
              <span className="text-xl font-bold">我还活着</span>
              <span className="text-sm mt-1 opacity-90">(点击报平安)</span>
            </div>
          )}
        </button>

        {!isCheckedInToday() && (
          <div className="mt-8 w-full max-w-xs space-y-6">
            <div className="space-y-3">
              <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider">今日心情</p>
              <div className="flex justify-between px-2">
                {moods.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => setMood(m.value)}
                    className={`flex flex-col items-center gap-1 transition-all ${
                      mood === m.value ? 'text-orange-500 scale-110' : 'text-slate-300'
                    }`}
                  >
                    {m.icon}
                    <span className={`text-[10px] ${mood === m.value ? 'font-bold' : ''}`}>{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap gap-2 justify-center">
                {['一切顺利', '有点疲惫', '需要帮忙'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                    className={`px-4 py-1.5 rounded-full text-xs transition-colors ${
                      selectedTags.includes(tag) 
                      ? 'bg-orange-100 text-orange-600 border border-orange-200' 
                      : 'bg-slate-50 text-slate-500 border border-transparent'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="想说点什么吗？(可选)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full bg-white border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mb-24 flex items-center justify-center gap-2 text-slate-400 text-xs">
        <Info size={14} />
        <span>当前设置：每{state.frequency}天报一次平安</span>
      </div>

      {showPopup && (
        <div className="fixed top-10 left-6 right-6 z-[60] animate-in slide-in-from-top-4 duration-300">
          <div className="bg-white border border-orange-100 rounded-2xl p-4 shadow-xl flex items-start gap-3">
            <div className="bg-orange-100 p-2 rounded-full">
              <Heart size={20} className="text-orange-500" fill="currentColor" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-slate-900">今日安好～</p>
              <p className="text-sm text-slate-600 italic mt-1 leading-relaxed">"{greeting}"</p>
            </div>
          </div>
        </div>
      )}

      <Navigation />
    </div>
  );
};

export default Home;
