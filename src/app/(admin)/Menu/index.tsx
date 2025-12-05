import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UserPlus, 
  FilePlus, 
  DollarSign, 
  FileBarChart, 
  Activity, 
  Settings, 
  LogOut, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const Menu: React.FC = () => {
  return (
    <div className="pb-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Menu</h1>
        <p className="text-slate-500 text-sm">Acesso rápido e configurações.</p>
      </div>

      {/* Ações Rápidas */}
      <section>
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Ações Rápidas</h2>
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-slate-800 text-white p-4 rounded-xl flex flex-col items-center justify-center gap-2 shadow-sm hover:bg-slate-900 transition-colors">
            <div className="bg-white/10 p-2 rounded-full">
              <UserPlus size={24} />
            </div>
            <span className="font-medium text-sm">Novo Cliente</span>
          </button>
          <button className="bg-white border border-slate-200 text-slate-700 p-4 rounded-xl flex flex-col items-center justify-center gap-2 shadow-sm hover:bg-slate-50 transition-colors">
            <div className="bg-slate-100 p-2 rounded-full">
              <FilePlus size={24} />
            </div>
            <span className="font-medium text-sm">Novo Plano</span>
          </button>
        </div>
      </section>

      {/* Navegação Secundária */}
      <section>
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Gestão</h2>
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <Link to="/admin/pagamentos" className="flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                <DollarSign size={20} />
              </div>
              <span className="font-medium text-slate-700">Pagamentos</span>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </Link>
          <Link to="/admin/relatorios" className="flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                <FileBarChart size={20} />
              </div>
              <span className="font-medium text-slate-700">Relatórios</span>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </Link>
          <Link to="/admin/historico" className="flex items-center justify-between p-4 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                <Activity size={20} />
              </div>
              <span className="font-medium text-slate-700">Histórico</span>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </Link>
        </div>
      </section>

      {/* Configurações */}
      <section>
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Sistema</h2>
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <Link to="/admin/configuracoes" className="flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="bg-slate-100 text-slate-600 p-2 rounded-lg">
                <Settings size={20} />
              </div>
              <span className="font-medium text-slate-700">Configurações Gerais</span>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </Link>
          <div className="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 text-orange-600 p-2 rounded-lg">
                <ShieldCheck size={20} />
              </div>
              <span className="font-medium text-slate-700">Privacidade e Segurança</span>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </div>
        </div>
      </section>

      {/* Logout */}
      <button className="w-full flex items-center justify-center gap-2 p-4 text-red-600 font-medium bg-red-50 hover:bg-red-100 rounded-xl transition-colors">
        <LogOut size={20} />
        Sair da conta
      </button>
    </div>
  );
};