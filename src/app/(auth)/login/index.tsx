
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Wallet, Loader2, AlertCircle, Eye } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, signInGuest } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // AdminLogin é setado como false dentro do service, conforme solicitado
      await signIn({ email, password });
      
      // Redireciona para a tela de seleção de perfil
      navigate('/selecionar-perfil');
    } catch (err: any) {
      console.error(err);
      setError('Falha na autenticação. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestAccess = () => {
    // Simula login de visitante
    signInGuest();
    navigate('/selecionar-perfil');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md p-8 sm:p-10 space-y-8 bg-white rounded-xl shadow-lg border border-slate-100 relative">
        
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-slate-800 mb-6">
            <Wallet size={32} className="text-indigo-600" />
            <span className="text-3xl font-bold">PagWeb</span>
          </div>
          <h2 className="text-xl font-semibold text-slate-700">
            Acesse sua conta
          </h2>
          <p className="text-sm text-slate-500 mt-2">Entre com suas credenciais</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2 border border-red-100">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          
          <div className="space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center h-12 py-2 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : 'Entrar'}
            </button>

            <button
              type="button"
              onClick={handleGuestAccess}
              className="w-full flex justify-center items-center gap-2 h-12 py-2 px-4 border border-slate-200 rounded-lg shadow-sm text-base font-medium text-slate-600 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200 transition-colors"
            >
              <Eye size={18} />
              Entrar sem Login (Demo)
            </button>
          </div>
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
