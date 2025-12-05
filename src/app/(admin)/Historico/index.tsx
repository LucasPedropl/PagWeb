import React from 'react';
import { ActivityLog } from '../../../types';
import { UserPlus, Trash2, Edit, LogIn, AlertCircle, CheckCircle2 } from 'lucide-react';

const mockLogs: ActivityLog[] = [
  { id: '1', user: 'Admin User', action: 'Criou nova assinatura', target: 'Cliente: João da Silva', timestamp: '2023-10-25T14:30:00', type: 'create' },
  { id: '2', user: 'Admin User', action: 'Atualizou plano', target: 'Plano Premium', timestamp: '2023-10-25T11:15:00', type: 'update' },
  { id: '3', user: 'Sistema', action: 'Falha no pagamento recorrente', target: 'Assinatura #1092', timestamp: '2023-10-24T09:00:00', type: 'warning' },
  { id: '4', user: 'Admin User', action: 'Removeu cliente', target: 'Cliente: Teste Ltda', timestamp: '2023-10-23T16:45:00', type: 'delete' },
  { id: '5', user: 'Admin User', action: 'Login no sistema', target: 'IP: 192.168.1.1', timestamp: '2023-10-23T08:00:00', type: 'info' },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'create': return <UserPlus size={16} className="text-emerald-600" />;
    case 'delete': return <Trash2 size={16} className="text-red-600" />;
    case 'update': return <Edit size={16} className="text-blue-600" />;
    case 'warning': return <AlertCircle size={16} className="text-amber-600" />;
    default: return <LogIn size={16} className="text-slate-600" />;
  }
};

const getBgColor = (type: string) => {
    switch (type) {
      case 'create': return 'bg-emerald-100';
      case 'delete': return 'bg-red-100';
      case 'update': return 'bg-blue-100';
      case 'warning': return 'bg-amber-100';
      default: return 'bg-slate-100';
    }
  };

export const Historico: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Histórico de Atividades</h1>
        <p className="text-slate-500 mt-1">Log de auditoria e ações realizadas no sistema.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8">
        <div className="relative border-l-2 border-slate-100 ml-3 space-y-8">
          {mockLogs.map((log) => (
            <div key={log.id} className="relative pl-8">
              {/* Timeline Dot */}
              <div className={`absolute -left-[9px] top-1 w-5 h-5 rounded-full border-2 border-white shadow-sm flex items-center justify-center ${getBgColor(log.type)}`}>
                 <div className="transform scale-75">
                    {getIcon(log.type)}
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {log.user} <span className="font-normal text-slate-500"> — {log.action}</span>
                  </p>
                  <p className="text-xs font-medium text-slate-600 mt-1 bg-slate-50 inline-block px-2 py-1 rounded border border-slate-200">
                    {log.target}
                  </p>
                </div>
                <time className="text-xs text-slate-400 whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleDateString('pt-BR', { 
                    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' 
                  })}
                </time>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                Carregar mais atividades antigas
            </button>
        </div>
      </div>
    </div>
  );
};