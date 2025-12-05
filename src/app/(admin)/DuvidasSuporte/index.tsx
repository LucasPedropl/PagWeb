import React from 'react';
import { LifeBuoy } from 'lucide-react';

export const DuvidasSuporte: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Dúvidas e Suporte</h1>
        <p className="text-slate-500 mt-1">Canal de comunicação direta e roadmap de evolução do sistema.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 flex flex-col items-center justify-center text-center">
          <div className="bg-slate-100 p-4 rounded-full mb-4">
            <LifeBuoy size={48} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900">Em manutenção</h3>
          <p className="text-slate-500 mt-2 max-w-sm">
            Esta área está sendo atualizada com novos canais de atendimento.
          </p>
      </div>
    </div>
  );
};