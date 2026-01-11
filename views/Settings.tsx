
import React, { useState } from 'react';
import { AppState, CheckInFrequency, EmergencyContact } from '../types';
import Navigation from '../components/Navigation';
import { User, Shield, Bell, Trash2, LogOut, ChevronRight, Plus, X, Phone, Mail } from 'lucide-react';

interface SettingsProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
}

const Settings: React.FC<SettingsProps> = ({ state, updateState }) => {
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [newContact, setNewContact] = useState<EmergencyContact>({ name: '', phone: '', email: '' });

  const toggleFrequency = () => {
    updateState({
      frequency: state.frequency === CheckInFrequency.DAILY ? CheckInFrequency.TWO_DAYS : CheckInFrequency.DAILY
    });
  };

  const handleAddContact = () => {
    if (!newContact.name || (!newContact.phone && !newContact.email)) return;
    
    updateState({
      emergencyContacts: [...state.emergencyContacts, newContact]
    });
    setNewContact({ name: '', phone: '', email: '' });
    setIsAddingContact(false);
  };

  const clearData = () => {
    if (confirm('确定要清空所有记录吗？此操作不可恢复。')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col min-h-screen px-6 pt-12 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">设置</h1>
      </header>

      <section className="mb-8">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">个人信息</h3>
        <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b border-slate-50">
            <div className="flex items-center gap-3">
              <User size={18} className="text-slate-400" />
              <span className="text-sm">昵称</span>
            </div>
            <input 
              className="text-sm text-right font-medium text-slate-600 outline-none w-32"
              value={state.nickname}
              onChange={(e) => updateState({ nickname: e.target.value })}
            />
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield size={18} className="text-slate-400" />
              <span className="text-sm">真实姓名 (仅预警用)</span>
            </div>
            <input 
              className="text-sm text-right font-medium text-slate-600 outline-none w-32"
              placeholder="未填写"
              value={state.realName}
              onChange={(e) => updateState({ realName: e.target.value })}
            />
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">预警管理</h3>
        <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden">
          <button onClick={toggleFrequency} className="w-full p-4 flex items-center justify-between border-b border-slate-50 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <Bell size={18} className="text-slate-400" />
              <span className="text-sm">签到频率</span>
            </div>
            <span className="text-sm font-bold text-orange-500">{state.frequency === CheckInFrequency.DAILY ? '1天1次' : '2天1次'}</span>
          </button>
          
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">紧急联系人</span>
              <button 
                onClick={() => setIsAddingContact(true)}
                disabled={state.emergencyContacts.length >= 2}
                className="text-xs font-bold text-orange-500 flex items-center gap-1 disabled:opacity-30"
              >
                <Plus size={14} /> 添加
              </button>
            </div>
            
            {state.emergencyContacts.length === 0 ? (
              <p className="text-center py-4 text-xs text-slate-400 italic">尚未设置紧急联系人</p>
            ) : (
              state.emergencyContacts.map((contact, idx) => (
                <div key={idx} className="bg-slate-50 rounded-2xl p-3 flex items-center justify-between group animate-in slide-in-from-left-4 duration-300">
                  <div>
                    <p className="text-sm font-bold text-slate-800">{contact.name}</p>
                    <p className="text-[10px] text-slate-400">{contact.phone || contact.email}</p>
                  </div>
                  <button 
                    onClick={() => {
                      const next = [...state.emergencyContacts];
                      next.splice(idx, 1);
                      updateState({ emergencyContacts: next });
                    }}
                    className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="mb-24">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">危险区域</h3>
        <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden">
          <button onClick={clearData} className="w-full p-4 flex items-center gap-3 text-rose-500 hover:bg-rose-50 transition-colors">
            <Trash2 size={18} />
            <span className="text-sm font-medium">清空所有数据</span>
          </button>
        </div>
        <p className="text-[10px] text-slate-400 mt-4 text-center">活着么 v1.0.0 · 守护每一份孤独</p>
      </section>

      {/* Add Contact Modal */}
      {isAddingContact && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-white rounded-t-[32px] p-8 animate-in slide-in-from-bottom-full duration-500 pb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">添加联系人</h2>
              <button onClick={() => setIsAddingContact(false)} className="p-2 text-slate-400">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="联系人姓名"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-orange-200 outline-none text-sm"
                  value={newContact.name}
                  onChange={e => setNewContact({...newContact, name: e.target.value})}
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="tel"
                  placeholder="手机号 (用于短信)"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-orange-200 outline-none text-sm"
                  value={newContact.phone}
                  onChange={e => setNewContact({...newContact, phone: e.target.value})}
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  placeholder="电子邮箱 (用于邮件)"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-orange-200 outline-none text-sm"
                  value={newContact.email}
                  onChange={e => setNewContact({...newContact, email: e.target.value})}
                />
              </div>
            </div>

            <button
              onClick={handleAddContact}
              disabled={!newContact.name || (!newContact.phone && !newContact.email)}
              className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold hover:bg-orange-600 disabled:opacity-50 transition-all"
            >
              保存联系人
            </button>
          </div>
        </div>
      )}

      <Navigation />
    </div>
  );
};

export default Settings;
