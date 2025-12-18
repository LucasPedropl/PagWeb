
import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, User, Wallet, ArrowRight, CheckCircle2, Code2, Database } from 'lucide-react';

export const Welcome: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar Simples */}
      <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 lg:px-12">
        <div className="flex items-center gap-2 font-bold text-2xl text-slate-800">
          <Wallet className="w-8 h-8 text-indigo-600" />
          <span>PagWeb</span>
        </div>
        <div className="text-sm text-slate-500">
          Sistema de Gestão Financeira
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 lg:px-12 py-12 lg:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Como você deseja acessar?
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Selecione o seu perfil para ser redirecionado ao ambiente correto de gestão, consulta ou documentação técnica.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Card Empresa */}
          <Link 
            to="/login"
            className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-600 hover:shadow-xl transition-all duration-300 flex flex-col items-start"
          >
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Building2 size={28} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Sou Empresa</h2>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">
              Acesso administrativo para gerenciar clientes, planos, emitir cobranças e visualizar relatórios.
            </p>
            
            <div className="mt-auto space-y-2 w-full border-t border-slate-100 pt-4">
               <div className="flex items-center gap-2 text-xs text-slate-600">
                 <CheckCircle2 size={14} className="text-green-500" /> Gestão de Assinaturas
               </div>
               <div className="flex items-center gap-2 text-xs text-slate-600">
                 <CheckCircle2 size={14} className="text-green-500" /> Relatórios via IA
               </div>
            </div>
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600">
              <ArrowRight size={20} />
            </div>
          </Link>

          {/* Card Cliente */}
          <Link 
            to="/client/login"
            className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 flex flex-col items-start"
          >
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <User size={28} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Sou Cliente</h2>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">
              Área do assinante para visualizar faturas, pegar 2ª via de boletos e histórico de pagamentos.
            </p>

            <div className="mt-auto space-y-2 w-full border-t border-slate-100 pt-4">
               <div className="flex items-center gap-2 text-xs text-slate-600">
                 <CheckCircle2 size={14} className="text-emerald-500" /> 2ª Via de Faturas
               </div>
               <div className="flex items-center gap-2 text-xs text-slate-600">
                 <CheckCircle2 size={14} className="text-emerald-500" /> Histórico Financeiro
               </div>
            </div>
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500">
              <ArrowRight size={20} />
            </div>
          </Link>

          {/* Card Desenvolvedor */}
          <Link 
            to="/dev-docs"
            className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500 hover:shadow-cyan-500/10 hover:shadow-xl transition-all duration-300 flex flex-col items-start text-white"
          >
            <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-6 group-hover:bg-cyan-500 group-hover:text-slate-900 transition-colors">
              <Code2 size={28} />
            </div>
            <h2 className="text-xl font-bold mb-2">Desenvolvedor</h2>
            <p className="text-slate-400 mb-6 text-sm leading-relaxed">
              Documentação técnica, endpoints da API e esquemas de objetos para integração com o Backend.
            </p>

            <div className="mt-auto space-y-2 w-full border-t border-slate-800 pt-4">
               <div className="flex items-center gap-2 text-xs text-slate-400">
                 <Database size={14} className="text-cyan-400" /> Estrutura de Objetos
               </div>
               <div className="flex items-center gap-2 text-xs text-slate-400">
                 <Code2 size={14} className="text-cyan-400" /> Endpoints REST
               </div>
            </div>
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400">
              <ArrowRight size={20} />
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
