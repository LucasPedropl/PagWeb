import React from 'react';
import { Company } from '../../types';
import { MoreVertical, Search, Filter, Plus } from 'lucide-react';

const companies: Company[] = [
  { id: '1', name: 'Tech Solutions Ltd', status: 'Ativo', plan: 'Enterprise', usersCount: 120 },
  { id: '2', name: 'Acme Corp', status: 'Ativo', plan: 'Pro', usersCount: 45 },
  { id: '3', name: 'Global Logistics', status: 'Inativo', plan: 'Básico', usersCount: 12 },
  { id: '4', name: 'StartUp Inc', status: 'Pendente', plan: 'Básico', usersCount: 5 },
  { id: '5', name: 'HealthPlus', status: 'Ativo', plan: 'Pro', usersCount: 67 },
];

export const Empresas: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Empresas</h1>
          <p className="text-slate-500 mt-1">Gerencie as organizações cadastradas.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
          <Plus size={18} />
          Nova Empresa
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar empresas..." 
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Filter size={16} />
            Filtros
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3">Nome da Empresa</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Plano</th>
                <th scope="col" className="px-6 py-3">Usuários</th>
                <th scope="col" className="px-6 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id} className="bg-white border-b hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{company.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium
                      ${company.status === 'Ativo' ? 'bg-emerald-100 text-emerald-800' : 
                        company.status === 'Inativo' ? 'bg-red-100 text-red-800' : 
                        'bg-amber-100 text-amber-800'}`}>
                      {company.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-800 text-xs font-medium px-2.5 py-0.5 rounded border border-slate-200">
                      {company.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">{company.usersCount}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-sm text-slate-500">
          <span>Mostrando 1-5 de 20 resultados</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-300 rounded bg-white disabled:opacity-50" disabled>Anterior</button>
            <button className="px-3 py-1 border border-slate-300 rounded bg-white hover:bg-slate-50">Próximo</button>
          </div>
        </div>
      </div>
    </div>
  );
};