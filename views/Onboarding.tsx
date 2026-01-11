
import React, { useState } from 'react';
import { AppState, CheckInFrequency } from '../types';
import { ShieldCheck, ArrowRight, User, Phone, Mail } from 'lucide-react';

interface OnboardingProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ state, updateState }) => {
  const [step, setStep] = useState(1);
  const [nickname, setNickname] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  const nextStep = () => {
    if (step === 3) {
      updateState({
        isFirstTime: false,
        nickname: nickname,
        emergencyContacts: [{
          name: contactName,
          phone: contactPhone,
          email: contactEmail
        }]
      });
    } else {
      setStep(step + 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4">
            <div className="w-24 h-24 bg-orange-100 rounded-3xl flex items-center justify-center mb-8 rotate-3">
              <ShieldCheck size={48} className="text-orange-500" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">活着么</h1>
            <p className="text-slate-600 leading-relaxed mb-12">
              独居人士的安全兜底工具。<br />
              每日一键平安，逾期紧急预警。<br />
              温暖，从极简操作开始。
            </p>
            <div className="p-4 bg-orange-50 rounded-2xl mb-12 text-left">
              <h3 className="text-sm font-bold text-orange-800 mb-2">隐私承诺</h3>
              <p className="text-xs text-orange-700 leading-relaxed">
                我们不收集您的地理位置、通讯录或麦克风权限。所有数据加密存储，仅在紧急情况下通知您的联系人。
              </p>
            </div>
            <button onClick={nextStep} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 group">
              开始设置 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        );
      case 2:
        return (
          <div className="animate-in fade-in slide-in-from-right-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">如何称呼您？</h2>
            <p className="text-slate-500 mb-8">我们将以此昵称在通知中识别您的状态。</p>
            <div className="relative mb-12">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="您的昵称"
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-orange-200 outline-none"
              />
            </div>
            <button
              onClick={nextStep}
              disabled={!nickname.trim()}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold disabled:opacity-50"
            >
              下一步
            </button>
          </div>
        );
      case 3:
        return (
          <div className="animate-in fade-in slide-in-from-right-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">设置紧急联系人</h2>
            <p className="text-slate-500 mb-8">当您超过规定时间未签到，我们将尝试联系对方。</p>
            <div className="space-y-4 mb-12">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="联系人姓名"
                  className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-orange-200 outline-none"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="手机号 (用于短信预警)"
                  className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-orange-200 outline-none"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="邮箱地址 (推荐)"
                  className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-orange-200 outline-none"
                />
              </div>
              <p className="text-[10px] text-slate-400 text-center px-4 leading-relaxed">
                点击“开启守护”即表示您同意我们的隐私政策。数据仅用于安全预警。
              </p>
            </div>
            <button
              onClick={nextStep}
              disabled={!contactName || (!contactPhone && !contactEmail)}
              className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold disabled:opacity-50 hover:bg-orange-600 transition-colors"
            >
              开启守护
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-sm">
        {renderStep()}
        {step > 1 && (
          <div className="flex gap-1 justify-center mt-8">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1.5 rounded-full transition-all ${i === step ? 'w-8 bg-orange-500' : 'w-2 bg-slate-200'}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
