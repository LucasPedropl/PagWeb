import React from 'react';
import { 
  Download, 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  CalendarDays,
  ArrowRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data para gráfico simples
const spendingData = [
  { name: 'Jan', value: 99 },
  { name: 'Fev', value: 99 },
  { name: 'Mar', value: 99 },
  { name: 'Abr', value: 149 },
  { name: 'Mai', value: 99 },
  { name: 'Jun', value: 99 },
];

export const ClientDashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Visão Geral</h1>
          <p className="text-slate-500 mt-1">Bem-vindo ao seu painel financeiro.</p>
        </div>
        <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Assinatura Ativa
            </span>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
                <CreditCard size={16} />
                Pagar Fatura
            </button>
        </div>
      </div>

      {/* Stats Grid - Identical to Admin Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start z-10 relative">
                <div>
                    <p className="text-sm font-medium text-slate-500">Próxima Fatura</p>
                    <h3 className="text-3xl font-bold text-slate-900 mt-2">15 Out</h3>
                    <p className="text-sm text-slate-400 mt-1">Vence em 5 dias</p>
                </div>
                <div className="bg-indigo-50 text-indigo-600 p-2.5 rounded-lg">
                    <CalendarDays size={20} />
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50">
                <button className="text-sm text-indigo-600 font-medium hover:underline flex items-center gap-1">
                    Ver detalhes <ArrowRight size={14} />
                </button>
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-slate-500">Valor Atual</p>
                    <h3 className="text-3xl font-bold text-slate-900 mt-2">R$ 99,00</h3>
                    <p className="text-sm text-emerald-600 flex items-center mt-1">
                        <CheckCircle2 size={16} className="mr-1" />
                        <span>Fatura Aberta</span>
                    </p>
                </div>
                <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-lg">
                    <CreditCard size={20} />
                </div>
            </div>
             <div className="mt-4 pt-4 border-t border-slate-50">
                <button className="text-sm text-slate-500 font-medium hover:text-slate-700 flex items-center gap-1">
                   Copiar código de barras
                </button>
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-slate-500">Plano Contratado</p>
                    <h3 className="text-2xl font-bold text-slate-900 mt-2">Premium</h3>
                    <p className="text-sm text-slate-400 mt-1">Desde Ago/2023</p>
                </div>
                <div className="bg-purple-50 text-purple-600 p-2.5 rounded-lg">
                    <TrendingUp size={20} />
                </div>
            </div>
             <div className="mt-4 pt-4 border-t border-slate-50">
                <button className="text-sm text-slate-500 font-medium hover:text-slate-700 flex items-center gap-1">
                   Gerenciar plano
                </button>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column: Invoices Table */}
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                    <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                        <FileText size={18} className="text-slate-500" />
                        Histórico de Faturas
                    </h3>
                    <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800">Ver todas</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-3 font-medium text-slate-500">Referência</th>
                                <th className="px-6 py-3 font-medium text-slate-500">Vencimento</th>
                                <th className="px-6 py-3 font-medium text-slate-500">Valor</th>
                                <th className="px-6 py-3 font-medium text-slate-500">Status</th>
                                <th className="px-6 py-3 font-medium text-slate-500 text-right">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {[
                                { ref: 'Out/2024', due: '15/10/2024', val: '99,00', status: 'Aberto' },
                                { ref: 'Set/2024', due: '15/09/2024', val: '99,00', status: 'Pago' },
                                { ref: 'Ago/2024', due: '15/08/2024', val: '99,00', status: 'Pago' },
                                { ref: 'Jul/2024', due: '15/07/2024', val: '99,00', status: 'Pago' },
                            ].map((item, i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-slate-900">{item.ref}</td>
                                    <td className="px-6 py-4 text-slate-500">{item.due}</td>
                                    <td className="px-6 py-4 text-slate-700">R$ {item.val}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium border
                                            ${item.status === 'Pago' 
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                                                : 'bg-amber-50 text-amber-700 border-amber-100'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-indigo-600 transition-colors" title="Baixar PDF">
                                            <Download size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {/* Side Column: Chart & Info */}
        <div className="space-y-6">
            {/* Spending Chart */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-slate-800 mb-4">Evolução de Gastos</h3>
                <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={spendingData}>
                            <defs>
                                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                            />
                            <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorSpend)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Support Card */}
            <div className="bg-slate-900 text-white rounded-xl p-6 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <AlertCircle size={100} />
                </div>
                <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-2">Precisa de ajuda?</h3>
                    <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                        Encontrou algum problema na sua fatura ou precisa alterar dados cadastrais?
                    </p>
                    <button className="w-full bg-white text-slate-900 font-medium py-2.5 rounded-lg text-sm hover:bg-slate-100 transition-colors">
                        Falar com Suporte
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};