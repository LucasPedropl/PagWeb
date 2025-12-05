import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, User, Wallet, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Welcome: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar Simples */}
      <header className="h-20 border-b border-slate-100 flex items-center justify-between px-4 lg:px-12">
        <div className="flex items-center gap-2 font-bold text-2xl text-slate-800">
          <Wallet className="w-8 h-8 text-indigo-600" />
          <span>PagWeb</span>
        </div>
        <div className="text-sm text-slate-500">
          Sistema de Gestão Financeira
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 lg:px-12 py-16 lg:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Como você deseja acessar?
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Selecione o seu perfil para ser redirecionado ao ambiente correto de gestão ou consulta.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card Empresa */}
          <Link 
            to="/login"
            className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-indigo-600 hover:shadow-xl transition-all duration-300 flex flex-col items-start"
          >
            <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Building2 size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Sou Empresa</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Acesso administrativo para gerenciar clientes, planos, emitir cobranças e visualizar relatórios financeiros.
            </p>
            
            <div className="mt-auto space-y-3 w-full border-t border-slate-100 pt-6">
               <div className="flex items-center gap-2 text-sm text-slate-600">
                 <CheckCircle2 size={16} className="text-green-500" /> Gestão de Assinaturas
               </div>
               <div className="flex items-center gap-2 text-sm text-slate-600">
                 <CheckCircle2 size={16} className="text-green-500" /> Relatórios via IA
               </div>
            </div>

            <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600">
              <ArrowRight size={24} />
            </div>
          </Link>

          {/* Card Cliente */}
          <Link 
            to="/client/login"
            className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 flex flex-col items-start"
          >
            <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <User size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Sou Cliente</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Área do assinante para visualizar faturas, pegar 2ª via de boletos, histórico de pagamentos e alterar dados.
            </p>

            <div className="mt-auto space-y-3 w-full border-t border-slate-100 pt-6">
               <div className="flex items-center gap-2 text-sm text-slate-600">
                 <CheckCircle2 size={16} className="text-emerald-500" /> 2ª Via de Faturas
               </div>
               <div className="flex items-center gap-2 text-sm text-slate-600">
                 <CheckCircle2 size={16} className="text-emerald-500" /> Histórico Financeiro
               </div>
            </div>

            <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500">
              <ArrowRight size={24} />
            </div>
          </Link>
        </div>

        <div className="text-center mt-12 text-slate-500 text-sm">
          Ainda não tem conta empresa? <Link to="/cadastro" className="text-indigo-600 font-semibold hover:underline">Criar conta grátis</Link>
        </div>
      </main>
    </div>
  );
};