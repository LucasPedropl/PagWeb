
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Wallet, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { authService } from '../../../services/authService';

export const AtivarConta: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Tenta pegar o email do state da navegação anterior (do cadastro)
  const initialEmail = location.state?.email || '';

  const [email, setEmail] = useState(initialEmail);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.activateUser({ email, token });
      setSuccess(true);
      
      // Redireciona para login após sucesso
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      console.error(err);
      setError('Falha na ativação. Verifique o token ou o e-mail e tente novamente.');
    } finally {
      setLoading(false);
    }
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
            Ativar Conta
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Insira o código enviado para o seu e-mail.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2 border border-red-100">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 text-emerald-600 p-3 rounded-lg text-sm flex items-center gap-2 border border-emerald-100">
            <CheckCircle2 size={16} />
            Conta ativada com sucesso! Redirecionando...
          </div>
        )}

        {/* Form */}
        <form className="space-y-6" onSubmit={handleActivate}>
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
            <label htmlFor="token" className="block text-sm font-medium text-slate-700 mb-2">Token de Ativação</label>
            <input
              type="text"
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="block w-full px-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all tracking-widest text-center text-lg"
              placeholder="000000"
              maxLength={6}
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || success}
            className="w-full flex justify-center items-center h-12 py-2 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : 'Ativar Conta'}
          </button>
        </form>
      </div>
    </div>
  );
};
