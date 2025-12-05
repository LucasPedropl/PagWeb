import React, { useState } from 'react';
import { Client } from '../../../types';
import { Edit2, Trash2, Plus, X, AlertTriangle, Search, Filter } from 'lucide-react';

const initialClients: Client[] = [
  { 
    id: '1', 
    firstName: 'João', 
    lastName: 'da Silva', 
    cpf: '123.456.789-00', 
    email: 'joao@empresa.com', 
    phone: '(11) 99999-9999', 
    address: 'Rua das Flores, 123 - São Paulo, SP', 
    status: 'Ativo', 
    joinDate: '15/08/2023' 
  },
  { 
    id: '2', 
    firstName: 'Maria', 
    lastName: 'Oliveira', 
    cpf: '987.654.321-11', 
    email: 'maria@loja.com', 
    phone: '(21) 98888-8888', 
    address: 'Av. Paulista, 1000 - São Paulo, SP', 
    status: 'Inativo', 
    joinDate: '01/03/2023' 
  },
  { 
    id: '3', 
    firstName: 'Carlos', 
    lastName: 'Ferreira', 
    cpf: '456.789.123-22', 
    email: 'carlos@tech.com', 
    phone: '(31) 97777-7777', 
    address: 'Rua da Tecnologia, 500 - Belo Horizonte, MG', 
    status: 'Ativo', 
    joinDate: '10/09/2023' 
  },
];

// Helper functions for masks
const formatCPF = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

const formatPhone = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
};

export const Empresas: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState<Partial<Client>>({});
  const [clientToDelete, setClientToDelete] = useState<string | null>(null);

  // Handlers
  const handleOpenCreate = () => {
    setCurrentClient({ status: 'Ativo' }); // Default status for new clients
    setIsFormOpen(true);
  };

  const handleOpenEdit = (client: Client) => {
    setCurrentClient({ ...client });
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentClient.id) {
      // Edit
      setClients(clients.map(c => c.id === currentClient.id ? { ...c, ...currentClient } as Client : c));
    } else {
      // Create
      const newClient: Client = {
        ...currentClient,
        id: Date.now().toString(),
        joinDate: new Date().toLocaleDateString('pt-BR'),
      } as Client;
      setClients([...clients, newClient]);
    }
    setIsFormOpen(false);
  };

  const handleOpenDelete = (id: string) => {
    setClientToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (clientToDelete) {
      setClients(clients.filter(c => c.id !== clientToDelete));
      setIsDeleteModalOpen(false);
      setClientToDelete(null);
    }
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setCurrentClient({ ...currentClient, cpf: formatted });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setCurrentClient({ ...currentClient, phone: formatted });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Gestão de Clientes</h1>
          <p className="text-slate-500 mt-1">Cadastro de pessoas físicas.</p>
        </div>
        <button 
          onClick={handleOpenCreate}
          className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-900 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Novo Cliente
        </button>
      </div>
      
      {/* Filters Bar */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar por nome ou CPF..." 
            className="w-full pl-10 pr-4 py-2 text-sm bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-slate-500 focus:border-slate-500 outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
          <Filter size={16} />
          Filtros
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">
                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nome Completo</th>
                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">CPF</th>
                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contato</th>
                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Data Cadastro</th>
                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-900">
                    {client.firstName} {client.lastName}
                  </td>
                  <td className="py-4 px-6 text-slate-600 font-mono text-sm">{client.cpf}</td>
                  <td className="py-4 px-6 text-slate-600">
                    <div className="text-sm">{client.email}</div>
                    <div className="text-xs text-slate-400">{client.phone}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center
                      ${client.status === 'Ativo' ? 'bg-emerald-100 text-emerald-700' : 
                        client.status === 'Inativo' ? 'bg-red-100 text-red-700' : 
                        'bg-amber-100 text-amber-700'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 
                        ${client.status === 'Ativo' ? 'bg-emerald-500' : 
                          client.status === 'Inativo' ? 'bg-red-500' : 
                          'bg-amber-500'}`}></span>
                      {client.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-500 text-sm">{client.joinDate}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                        <button 
                            onClick={() => handleOpenEdit(client)}
                            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"
                            title="Editar"
                        >
                            <Edit2 size={16} />
                        </button>
                        <button 
                            onClick={() => handleOpenDelete(client.id)}
                            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Excluir"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {clients.length === 0 && (
             <div className="p-8 text-center text-slate-500">
                 Nenhum cliente encontrado.
             </div>
        )}
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900">
                {currentClient.id ? 'Editar Dados do Cliente' : 'Novo Cliente'}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 overflow-y-auto">
              <div className="space-y-6">
                
                {/* Dados Pessoais */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">Dados Pessoais</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Nome</label>
                      <input 
                        type="text" 
                        required
                        value={currentClient.firstName || ''}
                        onChange={e => setCurrentClient({...currentClient, firstName: e.target.value})}
                        className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                        placeholder="Primeiro nome"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Sobrenome</label>
                      <input 
                        type="text" 
                        required
                        value={currentClient.lastName || ''}
                        onChange={e => setCurrentClient({...currentClient, lastName: e.target.value})}
                        className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                        placeholder="Sobrenome"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">CPF</label>
                      <input 
                        type="text" 
                        required
                        value={currentClient.cpf || ''}
                        onChange={handleCPFChange}
                        maxLength={14}
                        className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                        placeholder="000.000.000-00"
                      />
                    </div>
                  </div>
                </div>

                {/* Contato */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider border-t border-slate-100 pt-4">Contato & Endereço</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        required
                        value={currentClient.email || ''}
                        onChange={e => setCurrentClient({...currentClient, email: e.target.value})}
                        className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                        placeholder="email@exemplo.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Telefone</label>
                      <input 
                        type="text" 
                        required
                        value={currentClient.phone || ''}
                        onChange={handlePhoneChange}
                        maxLength={15}
                        className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Endereço Completo</label>
                      <input 
                        type="text" 
                        required
                        value={currentClient.address || ''}
                        onChange={e => setCurrentClient({...currentClient, address: e.target.value})}
                        className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                        placeholder="Rua, Número, Bairro, Cidade - UF"
                      />
                    </div>
                  </div>
                </div>

                {/* Status - Only visible when editing */}
                {currentClient.id && (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider border-t border-slate-100 pt-4">Controle Interno</h4>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Status do Cadastro</label>
                      <select 
                        value={currentClient.status || 'Ativo'}
                        onChange={e => setCurrentClient({...currentClient, status: e.target.value as any})}
                        className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      >
                        <option value="Ativo">Ativo</option>
                        <option value="Inativo">Inativo</option>
                        <option value="Pendente">Pendente</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-8 flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-900"
                >
                  {currentClient.id ? 'Salvar Alterações' : 'Cadastrar Cliente'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                  <AlertTriangle className="text-red-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-center text-slate-900 mb-2">Confirmar Exclusão</h3>
              <p className="text-sm text-center text-slate-500 mb-6">
                  Tem certeza que deseja remover este cliente? Todos os dados pessoais serão apagados permanentemente.
              </p>
              <div className="flex gap-3">
                  <button 
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={confirmDelete}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    Excluir
                  </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};