
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Calendar, Settings as SettingsIcon } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-md border-t border-orange-100 flex justify-around items-center py-3 px-6 safe-area-bottom z-50">
      <Link to="/" className={`flex flex-col items-center gap-1 ${isActive('/') ? 'text-orange-500' : 'text-slate-400'}`}>
        <Heart size={24} fill={isActive('/') ? 'currentColor' : 'none'} />
        <span className="text-xs font-medium">平安</span>
      </Link>
      <Link to="/logs" className={`flex flex-col items-center gap-1 ${isActive('/logs') ? 'text-orange-500' : 'text-slate-400'}`}>
        <Calendar size={24} />
        <span className="text-xs font-medium">记录</span>
      </Link>
      <Link to="/settings" className={`flex flex-col items-center gap-1 ${isActive('/settings') ? 'text-orange-500' : 'text-slate-400'}`}>
        <SettingsIcon size={24} />
        <span className="text-xs font-medium">设置</span>
      </Link>
    </nav>
  );
};

export default Navigation;
