import React, { useState } from 'react';
import { Plan } from '../../../types';
import { Check, Edit2, Trash2, Plus, X, AlertTriangle } from 'lucide-react';

const initialPlans: Plan[] = [
  { 
    id: '1', 
    name: 'Plano Básico', 
    price: 49, 
    features: ['Gestão de até 50 clientes', 'Relatórios básicos'] 
  },
  { 
    id: '2', 
    name: 'Plano Premium', 
    price: 99, 
    isPopular: true,
    features: ['Todas as do Básico', 'Gestão ilimitada', 'Relatórios IA Avançados'] 
  },
];

export const Planos: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<Partial<Plan>>({});
  const [featuresInput, setFeaturesInput] = useState('');
  const [planToDelete, setPlanToDelete] = useState<string | null>(null);

  const handleOpenCreate = () => {
    setCurrentPlan({});
    setFeaturesInput('');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (plan: Plan) => {
    setCurrentPlan({ ...plan });
    setFeaturesInput(plan.features.join('\n'));
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const featuresArray = featuresInput.split('\n').filter(f => f.trim() !== '');
    
    if (currentPlan.id) {
      // Edit
      setPlans(plans.map(p => p.id === currentPlan.id ? { ...p, ...currentPlan, features: featuresArray } as Plan : p));
    } else {
      // Create
      const newPlan: Plan = {
        ...currentPlan,
        id: Date.now().toString(),
        features: featuresArray,
        price: Number(currentPlan.price) || 0
      } as Plan;
      setPlans([...plans, newPlan]);
    }
    setIsFormOpen(false);
  };

  const handleOpenDelete = (id: string) => {
    setPlanToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (planToDelete) {
      setPlans(plans.filter(p => p.id !== planToDelete));
      setIsDeleteModalOpen(false);
      setPlanToDelete(null);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const numericValue = Number(rawValue) / 100;
    setCurrentPlan({ ...currentPlan, price: numericValue });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Catálogo de Planos</h1>
          <p className="text-slate-500 mt-1">Defina os produtos e serviços que sua empresa oferece.</p>
        </div>
        <button 
          onClick={handleOpenCreate}
          className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-900 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Novo Plano
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.id}
            className={`
              relative flex flex-col h-full bg-white p-6 rounded-xl border transition-all hover:shadow-md
              ${plan.isPopular ? 'border-2 border-slate-800 shadow-md' : 'border-slate-200'}
            `}
          >
            {plan.isPopular && (
              <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 text-white text-xs font-semibold px-3 py-1 rounded-full">
                POPULAR
              </span>
            )}
            
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-slate-800">{plan.name}</h3>
                <div className="flex gap-1">
                    <button onClick={() => handleOpenEdit(plan)} className="p-1.5 text-slate-400 hover:text-slate-800 rounded hover:bg-slate-100 transition-colors">
                        <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleOpenDelete(plan.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <p className="text-3xl font-bold mt-2 text-slate-900">
              R$ {plan.price.toFixed(2).replace('.', ',')}<span className="text-lg font-normal text-slate-500">/mês</span>
            </p>

            <ul className="text-left space-y-3 mt-6 text-slate-600 mb-6 flex-1">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <Check size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Empty State / Add New Card Shortcut */}
        <button 
          onClick={handleOpenCreate}
          className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all group min-h-[300px]"
        >
            <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center text-slate-400 group-hover:text-slate-600 mb-4 transition-colors">
                <Plus size={24} />
            </div>
            <h3 className="font-medium text-slate-600 group-hover:text-slate-800">Adicionar Novo Plano</h3>
        </button>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900">
                {currentPlan.id ? 'Editar Plano' : 'Novo Plano'}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Plano</label>
                <input 
                  type="text" 
                  required
                  value={currentPlan.name || ''}
                  onChange={e => setCurrentPlan({...currentPlan, name: e.target.value})}
                  className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  placeholder="Ex: Plano Enterprise"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Preço Mensal</label>
                    <input 
                      type="text" 
                      required
                      value={formatCurrency(currentPlan.price || 0)}
                      onChange={handlePriceChange}
                      className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      placeholder="R$ 0,00"
                    />
                </div>
                <div className="flex items-center pt-6">
                    <label className="flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={currentPlan.isPopular || false}
                            onChange={e => setCurrentPlan({...currentPlan, isPopular: e.target.checked})}
                            className="w-4 h-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500"
                        />
                        <span className="ml-2 text-sm text-slate-700">Marcar como Popular</span>
                    </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Funcionalidades <span className="text-slate-400 font-normal text-xs">(uma por linha)</span>
                </label>
                <textarea 
                  rows={4}
                  value={featuresInput}
                  onChange={e => setFeaturesInput(e.target.value)}
                  className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  placeholder="Suporte 24h&#10;Acesso ilimitado&#10;..."
                />
              </div>

              <div className="pt-4 flex justify-end gap-2">
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
                  Salvar
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
                  Tem certeza que deseja remover este plano?
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