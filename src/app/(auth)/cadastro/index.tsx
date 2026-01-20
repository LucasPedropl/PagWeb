
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Wallet, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { authService } from '../../../services/authService';
import { UserRegisterDto } from '../../../types';
import { maskCPF, maskPhone, unmask } from '../../../utils/masks';

export const Cadastro: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<UserRegisterDto>({
    nome: '',
    sobreNome: '',
    cpf: '',
    email: '',
    password: '',
    telefone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    let formattedValue = value;

    // Aplica máscaras visuais
    if (id === 'cpf') {
      formattedValue = maskCPF(value);
    } else if (id === 'telefone') {
      formattedValue = maskPhone(value);
    }

    setFormData(prev => ({ ...prev, [id]: formattedValue }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Remove formatação para enviar à API (apenas números)
      const payload: UserRegisterDto = {
        ...formData,
        cpf: unmask(formData.cpf),
        telefone: unmask(formData.telefone)
      };

      await authService.registerUser(payload);
      
      setSuccess(true);
      // Redireciona para a tela de ativação passando o email
      setTimeout(() => {
        navigate('/ativar', { state: { email: formData.email } });
      }, 1500);
      
    } catch (err: any) {
      console.error(err);
      setError('Erro ao criar conta. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md p-8 sm:p-10 space-y-8 bg-white rounded-xl shadow-lg border border-slate-100 relative">
        
        <Link to="/login" className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>

        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-slate-800 mb-6">
            <Wallet size={32} className="text-indigo-600" />
            <span className="text-3xl font-bold">PagWeb</span>
          </div>
          <h2 className="text-xl font-semibold text-slate-700">
            Criar Nova Conta
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Preencha seus dados para acessar o sistema.
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
            <Wallet size={16} />
            Cadastro realizado! Redirecionando para ativação...
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleRegister}>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-slate-700 mb-1">Nome</label>
              <input
                type="text"
                id="nome"
                value={formData.nome}
                onChange={handleChange}
                className="block w-full px-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Pedro"
                required
              />
            </div>
            <div>
              <label htmlFor="sobreNome" className="block text-sm font-medium text-slate-700 mb-1">Sobrenome</label>
              <input
                type="text"
                id="sobreNome"
                value={formData.sobreNome}
                onChange={handleChange}
                className="block w-full px-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Mota"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="cpf" className="block text-sm font-medium text-slate-700 mb-1">CPF</label>
            <input
              type="text"
              id="cpf"
              value={formData.cpf}
              onChange={handleChange}
              maxLength={14}
              className="block w-full px-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="000.000.000-00"
              required
            />
          </div>
          
          <div>
            <label htmlFor="telefone" className="block text-sm font-medium text-slate-700 mb-1">Celular/Telefone</label>
            <input
              type="text"
              id="telefone"
              value={formData.telefone}
              onChange={handleChange}
              maxLength={15}
              className="block w-full px-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="(00) 00000-0000"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full px-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Sua senha segura"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full flex justify-center items-center h-12 py-2 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : 'Criar Conta'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-slate-600 mt-6">
          Já tem uma conta?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
};
