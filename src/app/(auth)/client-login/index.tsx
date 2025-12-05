import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, ArrowLeft } from 'lucide-react';

export const ClientLogin: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/client/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md p-8 sm:p-10 space-y-8 bg-white rounded-xl shadow-lg border border-slate-100 relative">
        
        <Link to="/" className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>

        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mx-auto mb-6 text-emerald-600">
            <User size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            Área do Cliente
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Acesse suas faturas e histórico
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 text-xs text-emerald-800 mb-4">
            <strong>Modo Demo:</strong> Acesso liberado sem senha.
          </div>

          <div>
            <label htmlFor="cpf" className="block text-sm font-medium text-slate-700 mb-2">CPF ou Email</label>
            <input
              type="text"
              id="cpf"
              className="block w-full px-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="Digite seu CPF ou email"
              defaultValue="cliente@exemplo.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">Senha</label>
            <input
              type="password"
              id="password"
              className="block w-full px-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              defaultValue="123456"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center h-12 py-2 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
          >
            Acessar Minha Conta
          </button>
        </form>

        <div className="text-center mt-6">
             <a href="#" className="text-sm text-slate-500 hover:text-emerald-600 transition-colors">Esqueci minha senha</a>
        </div>
      </div>
    </div>
  );
};