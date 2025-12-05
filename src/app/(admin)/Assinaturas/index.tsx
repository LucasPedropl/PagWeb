import React, { useState } from 'react';
import { Subscription } from '../../../types';
import { Plus, Search, Filter, MoreVertical, X, AlertTriangle, CreditCard, Calendar, FileText, ArrowRight } from 'lucide-react';

// Mock Data for linking
const mockClients = [
    { id: '1', name: 'João da Silva' },
    { id: '2', name: 'Maria Oliveira' },
    { id: '3', name: 'Carlos Ferreira' },
];

const mockPlans = [
    { id: '1', name: 'Plano Básico', price: 49 },
    { id: '2', name: 'Plano Premium', price: 99 },
];

const initialSubscriptions: Subscription[] = [
    { 
        id: '101', 
        clientId: '1', 
        clientName: 'João da Silva', 
        planId: '2', 
        planName: 'Plano Premium', 
        price: 99, 
        status: 'Ativa', 
        startDate: '2023-08-15',
        endDate: '2024-08-15',
        paymentMethod: 'Cartão',
        isRecurring: true,
        period: 12,
        discount: 10 // 10%
    },
    { 
        id: '102', 
        clientId: '3', 
        clientName: 'Carlos Ferreira', 
        planId: '2', 
        planName: 'Plano Premium', 
        price: 99, 
        status: 'Pendente', 
        startDate: '2023-09-10',
        endDate: '2024-09-10',
        paymentMethod: 'Boleto',
        period: 12,
        discount: 0
    }
];

export const Assinaturas: React.FC = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions);
    const [isFormOpen, setIsFormOpen] = useState(false);
    
    // Form state
    const [newSub, setNewSub] = useState<Partial<Subscription>>({ 
        status: 'Ativa',
        isRecurring: false,
        discount: 0,
        period: 12
    });

    const handleOpenCreate = () => {
        const today = new Date().toISOString().split('T')[0];
        // Calculate default end date (12 months from today)
        const d = new Date(today);
        d.setMonth(d.getMonth() + 12);
        const defaultEnd = d.toISOString().split('T')[0];

        setNewSub({ 
            status: 'Ativa', 
            startDate: today,
            endDate: defaultEnd,
            isRecurring: true,
            period: 12,
            discount: 0
        });
        setIsFormOpen(true);
    };

    // --- Logic for Date Interconnectivity ---

    const addMonthsToDate = (dateStr: string, months: number): string => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        // Add months
        d.setMonth(d.getMonth() + months);
        // Handle overflow (e.g., Jan 31 + 1 month -> Feb 28/29) automatically by JS Date, but keeping it simple for now
        return d.toISOString().split('T')[0];
    };

    const calculateMonthDiff = (startStr: string, endStr: string): number => {
        if (!startStr || !endStr) return 0;
        const d1 = new Date(startStr);
        const d2 = new Date(endStr);
        
        let months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth();
        months += d2.getMonth();
        
        // Adjust for days (if day of month of end is less than start, it's not a full month yet)
        // Simplification: Keeping it strictly month-based for the prompt requirement
        return months > 0 ? months : 0;
    };

    const handlePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const months = parseInt(e.target.value) || 0;
        const updatedSub = { ...newSub, period: months };
        
        // Recalculate End Date if Start Date exists
        if (updatedSub.startDate) {
            updatedSub.endDate = addMonthsToDate(updatedSub.startDate, months);
        }
        
        setNewSub(updatedSub);
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const start = e.target.value;
        const updatedSub = { ...newSub, startDate: start };

        // Recalculate End Date based on existing Period
        if (updatedSub.period !== undefined) {
             updatedSub.endDate = addMonthsToDate(start, updatedSub.period);
        }

        setNewSub(updatedSub);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const end = e.target.value;
        const updatedSub = { ...newSub, endDate: end };

        // Recalculate Period based on Start Date
        if (updatedSub.startDate) {
            updatedSub.period = calculateMonthDiff(updatedSub.startDate, end);
        }

        setNewSub(updatedSub);
    };

    // --- End Logic ---

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        
        const selectedClient = mockClients.find(c => c.id === newSub.clientId);
        const selectedPlan = mockPlans.find(p => p.id === newSub.planId);

        if (!selectedClient || !selectedPlan) return;

        const sub: Subscription = {
            id: Date.now().toString(),
            clientId: newSub.clientId!,
            clientName: selectedClient.name,
            planId: newSub.planId!,
            planName: selectedPlan.name,
            price: selectedPlan.price,
            status: newSub.status as any,
            startDate: newSub.startDate || '',
            endDate: newSub.endDate,
            period: newSub.period,
            isRecurring: newSub.isRecurring,
            discount: newSub.discount,
            paymentMethod: newSub.paymentMethod,
            observation: newSub.observation
        };

        setSubscriptions([...subscriptions, sub]);
        setIsFormOpen(false);
    };

    const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = parseInt(e.target.value.replace(/\D/g, ''));
        if (isNaN(val)) val = 0;
        if (val > 100) val = 100;
        setNewSub({ ...newSub, discount: val });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Assinaturas</h1>
                    <p className="text-slate-500 mt-1">Gerencie os planos ativos dos seus clientes.</p>
                </div>
                <button 
                    onClick={handleOpenCreate}
                    className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-900 transition-colors shadow-sm"
                >
                    <Plus size={18} />
                    Nova Assinatura
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex flex-wrap items-center justify-between gap-4">
                <div className="relative max-w-sm w-full">
                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Buscar por cliente..." 
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
                                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Cliente</th>
                                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Plano</th>
                                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Período</th>
                                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Valor Mensal</th>
                                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {subscriptions.map((sub) => {
                                const finalPrice = sub.discount ? sub.price * (1 - sub.discount / 100) : sub.price;
                                
                                return (
                                    <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="py-4 px-6 font-medium text-slate-900">
                                            {sub.clientName}
                                            <div className="text-xs text-slate-400 mt-0.5">{sub.paymentMethod || 'Não definido'}</div>
                                        </td>
                                        <td className="py-4 px-6 text-slate-600">
                                            <span className="font-medium text-slate-700">{sub.planName}</span>
                                            <div className="text-xs text-slate-400 mt-0.5">R$ {sub.price.toFixed(2)}</div>
                                        </td>
                                        <td className="py-4 px-6 text-slate-600 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-slate-400"/>
                                                {sub.period} meses
                                            </div>
                                            <div className="text-[10px] text-slate-400 mt-1">
                                                {new Date(sub.startDate).toLocaleDateString('pt-BR')} <ArrowRight size={10} className="inline mx-0.5" /> {sub.endDate ? new Date(sub.endDate).toLocaleDateString('pt-BR') : '?'}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="text-slate-900 font-semibold">
                                                R$ {finalPrice.toFixed(2)}
                                            </div>
                                            {sub.discount ? (
                                                <span className="text-xs text-green-600 font-medium bg-green-50 px-1.5 py-0.5 rounded inline-block mt-1">
                                                    {sub.discount}% OFF
                                                </span>
                                            ) : null}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center
                                                ${sub.status === 'Ativa' ? 'bg-emerald-100 text-emerald-700' : 
                                                sub.status === 'Cancelada' ? 'bg-red-100 text-red-700' : 
                                                sub.status === 'Pendente' ? 'bg-amber-100 text-amber-700' :
                                                'bg-slate-100 text-slate-700'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 
                                                    ${sub.status === 'Ativa' ? 'bg-emerald-500' : 
                                                    sub.status === 'Cancelada' ? 'bg-red-500' : 
                                                    sub.status === 'Pendente' ? 'bg-amber-500' :
                                                    'bg-slate-500'}`}></span>
                                                {sub.status}
                                            </span>
                                            {sub.isRecurring && (
                                                 <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                                                    <CreditCard size={10} /> Recorrente
                                                 </div>
                                            )}
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100">
                                                <MoreVertical size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                {subscriptions.length === 0 && (
                     <div className="p-8 text-center text-slate-500">
                         Nenhuma assinatura ativa encontrada.
                     </div>
                )}
            </div>

            {/* Create Subscription Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                        <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-slate-50">
                            <h3 className="font-semibold text-slate-900">Nova Assinatura</h3>
                            <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="p-6 space-y-6 overflow-y-auto">
                            
                            {/* Cliente e Plano */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Selecionar Cliente</label>
                                    <select 
                                        required
                                        value={newSub.clientId || ''}
                                        onChange={e => setNewSub({...newSub, clientId: e.target.value})}
                                        className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                    >
                                        <option value="" disabled>Selecione...</option>
                                        {mockClients.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Selecionar Plano</label>
                                    <select 
                                        required
                                        value={newSub.planId || ''}
                                        onChange={e => setNewSub({...newSub, planId: e.target.value})}
                                        className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                    >
                                        <option value="" disabled>Selecione...</option>
                                        {mockPlans.map(p => (
                                            <option key={p.id} value={p.id}>{p.name} - R$ {p.price}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Período e Recorrência */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Período (Meses)</label>
                                    <input 
                                        type="number" 
                                        min="1"
                                        value={newSub.period || ''}
                                        onChange={handlePeriodChange}
                                        className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                        placeholder="Ex: 12"
                                    />
                                </div>
                                <div className="flex items-center h-[42px]">
                                     <label className="flex items-center cursor-pointer select-none">
                                        <input 
                                            type="checkbox" 
                                            checked={newSub.isRecurring || false}
                                            onChange={e => setNewSub({...newSub, isRecurring: e.target.checked})}
                                            className="w-4 h-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500"
                                        />
                                        <span className="ml-2 text-sm text-slate-700">Assinatura Recorrente</span>
                                    </label>
                                </div>
                            </div>

                            {/* Datas */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">DT Aquisição</label>
                                    <div className="relative">
                                        <input 
                                            type="date"
                                            required
                                            value={newSub.startDate || ''}
                                            onChange={handleStartDateChange}
                                            className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                        />
                                        <Calendar className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" size={16} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">DT Finalizar</label>
                                    <div className="relative">
                                        <input 
                                            type="date"
                                            value={newSub.endDate || ''}
                                            onChange={handleEndDateChange}
                                            className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                        />
                                        <Calendar className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" size={16} />
                                    </div>
                                </div>
                            </div>

                            {/* Financeiro */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Forma de Pagamento</label>
                                    <select 
                                        value={newSub.paymentMethod || ''}
                                        onChange={e => setNewSub({...newSub, paymentMethod: e.target.value as any})}
                                        className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                    >
                                        <option value="" disabled>Selecione...</option>
                                        <option value="Boleto">Boleto</option>
                                        <option value="Pix">Pix</option>
                                        <option value="Cartão">Cartão</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Desconto (%)</label>
                                    <div className="relative">
                                        <input 
                                            type="text"
                                            value={newSub.discount || 0}
                                            onChange={handleDiscountChange}
                                            className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                            placeholder="0"
                                        />
                                        <span className="absolute right-3 top-2 text-slate-500 font-medium">%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Observação */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Observação</label>
                                <textarea 
                                    rows={3}
                                    value={newSub.observation || ''}
                                    onChange={e => setNewSub({...newSub, observation: e.target.value})}
                                    className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none"
                                    placeholder="Detalhes adicionais sobre a assinatura..."
                                />
                            </div>

                            <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 mt-6">
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
                                    Criar Assinatura
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};