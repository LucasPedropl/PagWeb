import React from 'react';
import { User, Mail, Phone, MapPin, Lock, Shield, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ClientConfiguracoes: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Minha Conta</h1>
        <p className="text-slate-500 mt-1">Gerencie seus dados pessoais e preferências de acesso.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card Summary */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4 border-4 border-white shadow-md">
                    <User size={40} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">João da Silva</h2>
                <p className="text-sm text-slate-500 mb-4">Cliente desde Ago/2023</p>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                    Assinatura Ativa
                </span>
            </div>

            <button 
                onClick={() => navigate('/')}
                className="w-full flex items-center justify-center gap-2 p-4 text-red-600 font-medium bg-red-50 hover:bg-red-100 border border-red-100 rounded-xl transition-colors"
            >
                <LogOut size={18} />
                Sair da Conta
            </button>
        </div>

        {/* Forms Area */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Dados Pessoais */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200 bg-slate-50">
                    <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                        <User size={18} className="text-slate-500" />
                        Dados Pessoais
                    </h3>
                </div>
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
                            <input 
                                type="text" 
                                defaultValue="João da Silva" 
                                className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">CPF</label>
                            <input 
                                type="text" 
                                defaultValue="123.456.789-00" 
                                disabled
                                className="w-full px-3 py-2 bg-slate-100 text-slate-500 border border-slate-200 rounded-lg cursor-not-allowed"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 text-slate-400" size={16} />
                                <input 
                                    type="email" 
                                    defaultValue="joao@email.com" 
                                    className="w-full pl-10 pr-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Celular</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-2.5 text-slate-400" size={16} />
                                <input 
                                    type="text" 
                                    defaultValue="(11) 99999-9999" 
                                    className="w-full pl-10 pr-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Endereço</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-2.5 text-slate-400" size={16} />
                            <input 
                                type="text" 
                                defaultValue="Rua das Flores, 123 - Centro, São Paulo/SP" 
                                className="w-full pl-10 pr-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div className="pt-2 text-right">
                        <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                            Salvar Alterações
                        </button>
                    </div>
                </div>
            </div>

            {/* Segurança */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200 bg-slate-50">
                    <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                        <Shield size={18} className="text-slate-500" />
                        Segurança
                    </h3>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Nova Senha</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 text-slate-400" size={16} />
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                className="w-full pl-10 pr-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">Confirmar Nova Senha</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 text-slate-400" size={16} />
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                className="w-full pl-10 pr-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                     <div className="pt-2 text-right">
                        <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
                            Atualizar Senha
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
