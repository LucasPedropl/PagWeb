import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Wallet } from 'lucide-react';

export const Cadastro: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration logic
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md p-8 sm:p-10 space-y-8 bg-white rounded-xl shadow-lg border border-slate-100">
        
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-slate-800 mb-6">
            <Wallet size={32} />
            <span className="text-3xl font-bold">PagWeb</span>
          </div>
          <h2 className="text-xl font-semibold text-slate-700">
            Crie sua conta grátis
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Comece a gerenciar seu negócio hoje mesmo.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleRegister}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Nome Completo</label>
            <input
              type="text"
              id="name"
              className="block w-full px-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
              placeholder="Seu nome"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="block w-full px-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
              placeholder="voce@exemplo.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">Senha</label>
            <input
              type="password"
              id="password"
              className="block w-full px-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
              placeholder="Criar senha"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center h-12 py-2 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
          >
            Criar Conta
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-slate-600 mt-6">
          Já tem uma conta?{' '}
          <Link to="/login" className="font-medium text-slate-800 hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
};