
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, User, Wallet, ArrowRight, CheckCircle2, Code2, Database, LogOut, Plus, X, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { companyService } from '../services/companyService';
import { EmpresaCreateDto } from '../types';
import { maskCNPJ, maskPhone, unmask } from '../utils/masks';

export const ProfileSelection: React.FC = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  
  // Estado do Modal de Criação de Empresa
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<EmpresaCreateDto>({
    nome: '',
    cnpj: '',
    email: '',
    password: '',
    telefone: '',
    idAdmin: 0 // Default conforme especificação da API
  });

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    let formattedValue = value;

    if (id === 'cnpj') formattedValue = maskCNPJ(value);
    if (id === 'telefone') formattedValue = maskPhone(value);

    setFormData(prev => ({ ...prev, [id]: formattedValue }));
  };

  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload: EmpresaCreateDto = {
        ...formData,
        cnpj: unmask(formData.cnpj),
        telefone: unmask(formData.telefone),
        idAdmin: 0
      };

      await companyService.create(payload);
      
      // Fecha modal e redireciona para dashboard (assumindo que a criação já libera o acesso)
      setIsModalOpen(false);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError('Erro ao criar empresa. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 lg:px-12">
        <div className="flex items-center gap-2 font-bold text-2xl text-slate-800">
          <Wallet className="w-8 h-8 text-indigo-600" />
          <span>PagWeb</span>
        </div>
        <button 
          onClick={handleLogout}
          className="text-sm text-slate-500 hover:text-red-600 flex items-center gap-2 transition-colors"
        >
          <LogOut size={16} />
          Sair
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-4 lg:px-12 py-12 lg:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Como você deseja acessar?
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Selecione o perfil de acesso ou crie uma nova organização.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Card Empresa */}
          <div className="flex flex-col gap-4">
            <Link 
              to="/admin/dashboard"
              className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-600 hover:shadow-xl transition-all duration-300 flex flex-col items-start h-full"
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
                  <CheckCircle2 size={14} className="text-green-500" /> Painel Administrativo
                </div>
              </div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600">
                <ArrowRight size={20} />
              </div>
            </Link>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-50 text-indigo-700 rounded-xl font-medium hover:bg-indigo-100 transition-colors text-sm border border-indigo-200"
            >
              <Plus size={16} />
              Cadastrar Nova Empresa
            </button>
          </div>

          {/* Card Cliente */}
          <Link 
            to="/client/dashboard"
            className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 flex flex-col items-start h-full"
          >
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <User size={28} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Sou Cliente</h2>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">
              Área do assinante para visualizar faturas, pegar 2ª via de boletos e histórico.
            </p>

            <div className="mt-auto space-y-2 w-full border-t border-slate-100 pt-4">
               <div className="flex items-center gap-2 text-xs text-slate-600">
                 <CheckCircle2 size={14} className="text-emerald-500" /> Minhas Faturas
               </div>
            </div>
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500">
              <ArrowRight size={20} />
            </div>
          </Link>

          {/* Card Desenvolvedor */}
          <Link 
            to="/dev-docs"
            className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500 hover:shadow-cyan-500/10 hover:shadow-xl transition-all duration-300 flex flex-col items-start text-white h-full"
          >
            <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-6 group-hover:bg-cyan-500 group-hover:text-slate-900 transition-colors">
              <Code2 size={28} />
            </div>
            <h2 className="text-xl font-bold mb-2">Desenvolvedor</h2>
            <p className="text-slate-400 mb-6 text-sm leading-relaxed">
              Documentação técnica, endpoints da API e esquemas de objetos.
            </p>

            <div className="mt-auto space-y-2 w-full border-t border-slate-800 pt-4">
               <div className="flex items-center gap-2 text-xs text-slate-400">
                 <Database size={14} className="text-cyan-400" /> Docs API
               </div>
            </div>
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400">
              <ArrowRight size={20} />
            </div>
          </Link>
        </div>
      </main>

      {/* Modal de Cadastro de Empresa */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">Cadastrar Nova Empresa</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateCompany} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-slate-700 mb-1">Nome da Empresa</label>
                <input
                  type="text"
                  id="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  placeholder="Minha Empresa Ltda"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cnpj" className="block text-sm font-medium text-slate-700 mb-1">CNPJ</label>
                  <input
                    type="text"
                    id="cnpj"
                    value={formData.cnpj}
                    onChange={handleInputChange}
                    maxLength={18}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    placeholder="00.000.000/0000-00"
                  />
                </div>
                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium text-slate-700 mb-1">Telefone</label>
                  <input
                    type="text"
                    id="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    maxLength={15}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Corporativo</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  placeholder="contato@empresa.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Senha de Acesso</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  placeholder="••••••••"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-70"
                >
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  Cadastrar Empresa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
