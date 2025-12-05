import React, { useState } from 'react';
import { Transaction } from '../../../types';
import { Search, Filter, Download, ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';

const mockTransactions: Transaction[] = [
  { id: '1', clientId: '1', clientName: 'João da Silva', amount: 99.00, status: 'Pago', date: '2023-10-25', method: 'Cartão', reference: '#TRX-9821' },
  { id: '2', clientId: '2', clientName: 'Maria Oliveira', amount: 49.00, status: 'Pendente', date: '2023-10-24', method: 'Boleto', reference: '#TRX-9822' },
  { id: '3', clientId: '3', clientName: 'Carlos Ferreira', amount: 149.00, status: 'Falha', date: '2023-10-23', method: 'Cartão', reference: '#TRX-9823' },
  { id: '4', clientId: '1', clientName: 'João da Silva', amount: 99.00, status: 'Pago', date: '2023-09-25', method: 'Cartão', reference: '#TRX-8100' },
  { id: '5', clientId: '4', clientName: 'Ana Souza', amount: 1200.00, status: 'Pago', date: '2023-10-20', method: 'Pix', reference: '#TRX-9824' },
];

export const Pagamentos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = mockTransactions.filter(t => 
    t.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Pagamentos</h1>
          <p className="text-slate-500 mt-1">Histórico financeiro e transações.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
          <Download size={18} />
          Exportar Relatório
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Receita Aprovada (Mês)</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-2xl font-bold text-slate-900">R$ 12.450,00</h3>
            <span className="flex items-center text-emerald-600 text-sm font-medium bg-emerald-50 px-2 py-1 rounded">
              <ArrowUpRight size={14} className="mr-1" /> +12%
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Pendente</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-2xl font-bold text-slate-900">R$ 1.280,00</h3>
            <span className="text-sm text-slate-400">12 transações</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Falhas / Estornos</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-2xl font-bold text-slate-900">R$ 340,00</h3>
            <span className="flex items-center text-red-600 text-sm font-medium bg-red-50 px-2 py-1 rounded">
              <ArrowDownRight size={14} className="mr-1" /> -2%
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar por cliente ou ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>
        <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Filter size={16} />
            Status
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            Data
            </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">
                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Referência</th>
                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Cliente</th>
                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Data</th>
                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Método</th>
                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Valor</th>
                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 text-sm font-mono text-slate-500">{trx.reference}</td>
                  <td className="py-4 px-6 text-sm font-medium text-slate-900">{trx.clientName}</td>
                  <td className="py-4 px-6 text-sm text-slate-500">
                    {new Date(trx.date).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">{trx.method}</td>
                  <td className="py-4 px-6 text-sm font-semibold text-slate-900">
                    R$ {trx.amount.toFixed(2).replace('.', ',')}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center
                      ${trx.status === 'Pago' ? 'bg-emerald-100 text-emerald-700' : 
                        trx.status === 'Falha' ? 'bg-red-100 text-red-700' : 
                        trx.status === 'Reembolsado' ? 'bg-indigo-100 text-indigo-700' : 
                        'bg-amber-100 text-amber-700'}`}>
                       <span className={`w-1.5 h-1.5 rounded-full mr-1.5 
                        ${trx.status === 'Pago' ? 'bg-emerald-500' : 
                          trx.status === 'Falha' ? 'bg-red-500' : 
                          trx.status === 'Reembolsado' ? 'bg-indigo-500' : 
                          'bg-amber-500'}`}></span>
                      {trx.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-100 transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredTransactions.length === 0 && (
            <div className="p-8 text-center text-slate-500">
                Nenhuma transação encontrada.
            </div>
        )}
      </div>
    </div>
  );
};