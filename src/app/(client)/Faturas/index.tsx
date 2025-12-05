import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  Clock,
  ArrowUpRight,
  CreditCard
} from 'lucide-react';

interface Invoice {
  id: string;
  reference: string;
  dueDate: string;
  amount: number;
  status: 'Pago' | 'Aberto' | 'Atrasado';
  paymentDate?: string;
  barcode?: string;
}

const mockInvoices: Invoice[] = [
  { id: '1', reference: 'Outubro/2023', dueDate: '2023-10-15', amount: 99.00, status: 'Aberto', barcode: '83620000000-5 99000000000-0 00000000000-0 00000000000-0' },
  { id: '2', reference: 'Setembro/2023', dueDate: '2023-09-15', amount: 99.00, status: 'Pago', paymentDate: '2023-09-14' },
  { id: '3', reference: 'Agosto/2023', dueDate: '2023-08-15', amount: 99.00, status: 'Pago', paymentDate: '2023-08-15' },
  { id: '4', reference: 'Julho/2023', dueDate: '2023-07-15', amount: 99.00, status: 'Pago', paymentDate: '2023-07-10' },
  { id: '5', reference: 'Junho/2023', dueDate: '2023-06-15', status: 'Atrasado', amount: 102.50 }, // Com juros
];

export const ClientFaturas: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInvoices = mockInvoices.filter(inv => 
    inv.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Minhas Faturas</h1>
          <p className="text-slate-500 mt-1">Consulte histórico e emita segunda via de boletos.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
          <CreditCard size={18} />
          Pagar Fatura Atual
        </button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Em Aberto</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">R$ 99,00</h3>
              <p className="text-sm text-slate-400 mt-1">Vence em 15/10</p>
            </div>
            <div className="bg-amber-100 text-amber-600 p-2.5 rounded-lg">
              <Clock size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Último Pagamento</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">R$ 99,00</h3>
              <p className="text-sm text-emerald-600 flex items-center mt-1">
                <CheckCircle2 size={14} className="mr-1" />
                <span>Confirmado em 14/09</span>
              </p>
            </div>
            <div className="bg-emerald-100 text-emerald-600 p-2.5 rounded-lg">
              <CheckCircle2 size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Pago (Ano)</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">R$ 891,00</h3>
              <p className="text-sm text-indigo-600 flex items-center mt-1">
                <ArrowUpRight size={14} className="mr-1" />
                <span>Em dia</span>
              </p>
            </div>
            <div className="bg-indigo-100 text-indigo-600 p-2.5 rounded-lg">
              <FileText size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar por mês (ex: Outubro)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
          <Filter size={16} />
          Filtrar Status
        </button>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">
                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Referência</th>
                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Vencimento</th>
                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Valor</th>
                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="py-4 px-6 text-sm font-medium text-slate-900">{inv.reference}</td>
                  <td className="py-4 px-6 text-sm text-slate-600">
                    {new Date(inv.dueDate).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="py-4 px-6 text-sm font-semibold text-slate-900">
                    R$ {inv.amount.toFixed(2).replace('.', ',')}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center
                      ${inv.status === 'Pago' ? 'bg-emerald-100 text-emerald-700' : 
                        inv.status === 'Atrasado' ? 'bg-red-100 text-red-700' : 
                        'bg-amber-100 text-amber-700'}`}>
                      {inv.status === 'Pago' && <CheckCircle2 size={12} className="mr-1" />}
                      {inv.status === 'Atrasado' && <AlertCircle size={12} className="mr-1" />}
                      {inv.status === 'Aberto' && <Clock size={12} className="mr-1" />}
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                        {inv.status !== 'Pago' && (
                           <button className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded hover:bg-indigo-100 font-medium transition-colors">
                              Copiar Pix
                           </button>
                        )}
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded transition-colors" title="Baixar PDF">
                            <Download size={18} />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};