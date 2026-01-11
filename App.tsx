
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './views/Home';
import Settings from './views/Settings';
import Logs from './views/Logs';
import Onboarding from './views/Onboarding';
import { AppState, CheckInFrequency } from './types';

const STORAGE_KEY = 'alive_app_state';

const defaultState: AppState = {
  isFirstTime: true,
  nickname: '',
  realName: '',
  emergencyContacts: [],
  frequency: CheckInFrequency.DAILY,
  lastCheckIn: null,
  checkInStreak: 0,
  logs: [],
  pausedUntil: null,
  isNotificationsEnabled: true
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateState = (updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  return (
    <Router>
      <div className="min-h-screen max-w-md mx-auto relative bg-[#FDFCFB] shadow-sm flex flex-col">
        <main className="flex-grow pb-24">
          <Routes>
            {state.isFirstTime ? (
              <Route path="*" element={<Onboarding state={state} updateState={updateState} />} />
            ) : (
              <>
                <Route path="/" element={<Home state={state} updateState={updateState} />} />
                <Route path="/logs" element={<Logs state={state} />} />
                <Route path="/settings" element={<Settings state={state} updateState={updateState} />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
