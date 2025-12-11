import React from 'react';
import { Database, UserPlus, FileText, Server, Lock } from 'lucide-react';
import { SystemStatus } from '../types';

interface SystemStatusPanelProps {
  status: SystemStatus;
}

export const SystemStatusPanel: React.FC<SystemStatusPanelProps> = ({ status }) => {
  return (
    <div className="hidden lg:block w-80 bg-slate-50 border-l border-gray-200 p-6 h-[calc(100vh-64px)] overflow-y-auto">
      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Status Arsitektur Agen</h2>

      <div className="space-y-6">
        {/* Registration Sub-agent */}
        <div className={`p-4 rounded-xl border transition-all duration-300 ${
          status.registrationAgent === 'active' 
            ? 'bg-white border-accent-500 shadow-md ring-1 ring-accent-500' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${status.registrationAgent === 'active' ? 'bg-accent-50 text-accent-600' : 'bg-gray-100 text-gray-500'}`}>
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Sub-agen Pendaftaran</h3>
              <p className="text-xs text-gray-500">Manajemen Demografi</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className={`w-2 h-2 rounded-full ${
              status.registrationAgent === 'active' ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
            }`} />
            <span className="text-xs font-medium text-gray-600">
              {status.registrationAgent === 'active' ? 'Memproses Data...' : 'Siaga'}
            </span>
          </div>
        </div>

        {/* Medical Records Agent (Mock) */}
        <div className="p-4 rounded-xl bg-white border border-gray-200 opacity-70">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gray-100 text-gray-500">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Sub-agen Rekam Medis</h3>
              <p className="text-xs text-gray-500">Diagnosa & Riwayat</p>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-400 italic border-t border-gray-100 pt-2">
            Akses dibatasi oleh Koordinator untuk keamanan.
          </div>
        </div>

        {/* System Backend Status */}
        <div className="p-4 rounded-xl bg-slate-900 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Server className="w-5 h-5 text-medical-500" />
            <span className="text-sm font-bold">Cloud Healthcare API</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">FHIR Store</span>
              <span className="text-green-400">Online</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">HL7v2 Adapter</span>
              <span className="text-green-400">Online</span>
            </div>
            <div className="flex items-center gap-2 text-xs bg-slate-800 p-2 rounded border border-slate-700 mt-2">
              <Lock className="w-3 h-3 text-yellow-500" />
              <span className="text-slate-300">SDP De-identification Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};