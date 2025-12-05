import React from 'react';
import { User, Shield, Bell, Lock, Mail, Globe, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Configuracoes: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Configurações</h1>
        <p className="text-slate-500 mt-1">Gerencie suas preferências e segurança da conta.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sidebar de Navegação (Visual apenas para este exemplo) */}
        <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <nav className="flex flex-col p-2">
                    <button className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 font-medium rounded-lg text-sm text-left">
                        <User size={18} />
                        Meu Perfil
                    </button>
                    <button className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 font-medium rounded-lg text-sm text-left transition-colors">
                        <Shield size={18} />
                        Segurança
                    </button>
                    <button className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 font-medium rounded-lg text-sm text-left transition-colors">
                        <Bell size={18} />
                        Notificações
                    </button>
                </nav>
            </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Card: Perfil */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-slate-900">Informações Pessoais</h2>
                    <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Editar</button>
                </div>
                <div className="p-6 space-y-6">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 overflow-hidden border-2 border-white shadow-md">
                             <img src="https://placehold.co/80x80/E2E8F0/475569?text=A" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <button className="text-sm font-medium text-slate-700 border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50 bg-white shadow-sm transition-colors">
                                Alterar Foto
                            </button>
                            <p className="text-xs text-slate-400 mt-2">JPG ou PNG. Max 1MB.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 text-slate-400" size={16} />
                                <input type="text" value="Admin User" readOnly className="w-full pl-10 pr-3 py-2 bg-slate-50 text-slate-600 border border-slate-200 rounded-lg text-sm focus:outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 text-slate-400" size={16} />
                                <input type="email" value="admin@pagweb.com" readOnly className="w-full pl-10 pr-3 py-2 bg-slate-50 text-slate-600 border border-slate-200 rounded-lg text-sm focus:outline-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Card: Segurança */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                    <h2 className="text-lg font-semibold text-slate-900">Segurança da Conta</h2>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
                                <Lock size={20} />
                            </div>
                            <div>
                                <p className="font-medium text-slate-900">Senha</p>
                                <p className="text-sm text-slate-500">Última alteração há 3 meses</p>
                            </div>
                        </div>
                        <button className="px-3 py-1.5 text-sm font-medium text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 bg-white">
                            Alterar
                        </button>
                    </div>
                    <div className="border-t border-slate-100 my-2"></div>
                    <div className="flex items-center justify-between py-2">
                         <div className="flex items-center gap-3">
                            <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
                                <Shield size={20} />
                            </div>
                            <div>
                                <p className="font-medium text-slate-900">Autenticação em 2 fatores</p>
                                <p className="text-sm text-slate-500">Adicione uma camada extra de segurança</p>
                            </div>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300"/>
                            <label htmlFor="toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-slate-300 cursor-pointer"></label>
                        </div>
                    </div>
                </div>
            </div>

             {/* Logout Zone */}
             <div className="flex justify-end pt-4">
                <button 
                    onClick={() => navigate('/login')}
                    className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-2 px-4 py-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                    Sair da Conta
                </button>
             </div>
        </div>
      </div>
    </div>
  );
};