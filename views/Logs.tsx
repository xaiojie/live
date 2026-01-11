
import React from 'react';
import { AppState } from '../types';
import Navigation from '../components/Navigation';
import { Calendar as CalendarIcon, Clock, ChevronRight, Frown, Meh, Smile, SmilePlus, Laugh } from 'lucide-react';

interface LogsProps {
  state: AppState;
}

const getMoodIcon = (val?: number) => {
  switch (val) {
    case 1: return <Frown size={18} className="text-slate-400" />;
    case 2: return <Meh size={18} className="text-slate-400" />;
    case 3: return <Smile size={18} className="text-orange-400" />;
    case 4: return <SmilePlus size={18} className="text-orange-500" />;
    case 5: return <Laugh size={18} className="text-rose-500" />;
    default: return <Smile size={18} className="text-slate-300" />;
  }
};

const Logs: React.FC<LogsProps> = ({ state }) => {
  const formatDate = (ts: number) => {
    const d = new Date(ts);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  };

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col min-h-screen px-6 pt-12 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">平安日志</h1>
        <p className="text-slate-500 mt-1">记录你每一个安好的瞬间</p>
      </header>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-orange-50 p-4 rounded-2xl">
          <p className="text-xs text-orange-600 font-bold uppercase tracking-wide mb-1">累计签到</p>
          <p className="text-2xl font-bold text-orange-900">{state.logs.length} <span className="text-sm font-normal">天</span></p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-2xl">
          <p className="text-xs text-indigo-600 font-bold uppercase tracking-wide mb-1">当前连续</p>
          <p className="text-2xl font-bold text-indigo-900">{state.checkInStreak} <span className="text-sm font-normal">天</span></p>
        </div>
      </div>

      <div className="space-y-4 mb-24">
        {state.logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <CalendarIcon size={48} className="mb-4 opacity-20" />
            <p>暂无签到记录，从今天开始吧</p>
          </div>
        ) : (
          state.logs.map((log, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center justify-between hover:border-orange-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="bg-slate-50 p-3 rounded-xl flex items-center justify-center">
                  {getMoodIcon(log.happiness)}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{formatDate(log.timestamp)}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    {formatTime(log.timestamp)} · {log.tags.length > 0 ? log.tags.join(', ') : '平安安好'}
                  </p>
                  {log.note && <p className="text-xs text-slate-600 mt-1 italic line-clamp-1">"{log.note}"</p>}
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-300" />
            </div>
          ))
        )}
      </div>

      <Navigation />
    </div>
  );
};

export default Logs;
