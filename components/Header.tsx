import React from 'react';
import { Activity, ShieldCheck, Cpu } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-medical-600 p-2 rounded-lg">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">SIMRS Pintar</h1>
            <p className="text-xs text-medical-600 font-medium">Sistem Integrasi Rumah Sakit</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
            <Cpu className="w-4 h-4 text-accent-500" />
            <span>AI Powered: Gemini 2.5 Flash</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span>SDP Compliant</span>
          </div>
        </div>
      </div>
    </header>
  );
};