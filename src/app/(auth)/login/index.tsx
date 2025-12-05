import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Wallet, ArrowLeft } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md p-8 sm:p-10 space-y-8 bg-white rounded-xl shadow-lg border border-slate-100 relative">
        
        <Link to="/" className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>

        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-slate-800 mb-6">
            <Wallet size={32} className="text-indigo-600" />
            <span className="text-3xl font-bold">PagWeb</span>
          </div>
          <h2 className="text-xl font-semibold text-slate-700">
            Acesso Administrativo
          </h2>
          <p className="text-sm text-slate-500 mt-2">Gerencie sua empresa</p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3 text-xs text-indigo-800 mb-4">
            <strong>Modo Demo:</strong> Clique em entrar sem precisar digitar senha.
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Corporativo</label>
            <input
              type="email"
              id="email"
              className="block w-full px-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="admin@empresa.com"
              defaultValue="admin@pagweb.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">Senha</label>
            <input
              type="password"
              id="password"
              className="block w-full px-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              defaultValue="123456"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center h-12 py-2 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Entrar como Administrador
          </button>
        </form>

        <p className="text-sm text-center text-slate-600 mt-6">
          Não tem uma conta?{' '}
          <Link to="/cadastro" className="font-medium text-indigo-600 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
};