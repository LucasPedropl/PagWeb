import React, { useState } from 'react';
import { generateReportAnalysis } from '../../../services/geminiService';
import { FileText, UserPlus, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { ReportType } from '../../../types';

export const Relatorios: React.FC = () => {
  const [selectedType, setSelectedType] = useState<ReportType | ''>('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string>('');

  const handleGenerate = async (type: ReportType) => {
    setSelectedType(type);
    setLoading(true);
    
    // Simulate data context for the demo
    const contextData = type === ReportType.FINANCIAL 
        ? "Faturamento Jan: 20k, Fev: 22k, Mar: 25k. Tendência de alta." 
        : "Novos clientes Jan: 10, Fev: 15, Mar: 12. Custo de aquisição estável.";

    const result = await generateReportAnalysis(type, contextData);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Relatórios Inteligentes</h1>
        <p className="text-slate-500 mt-1">Gere insights instantâneos com nossa IA.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Financial Report Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col items-start hover:border-slate-300 transition-colors">
          <div className="bg-slate-100 text-slate-600 p-2.5 rounded-lg">
            <FileText size={24} />
          </div>
          <h3 className="text-lg font-semibold mt-4 text-slate-800">Faturamento Mensal</h3>
          <p className="text-sm text-slate-500 mt-1 mb-4">
            Visão detalhada do faturamento e previsões.
          </p>
          <button 
            onClick={() => handleGenerate(ReportType.FINANCIAL)}
            className="mt-auto text-sm font-semibold text-slate-800 hover:text-black flex items-center group"
          >
            Gerar Análise <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Growth Report Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col items-start hover:border-slate-300 transition-colors">
          <div className="bg-slate-100 text-slate-600 p-2.5 rounded-lg">
            <UserPlus size={24} />
          </div>
          <h3 className="text-lg font-semibold mt-4 text-slate-800">Novos Clientes</h3>
          <p className="text-sm text-slate-500 mt-1 mb-4">
            Acompanhe o crescimento da base.
          </p>
          <button 
            onClick={() => handleGenerate(ReportType.GROWTH)}
            className="mt-auto text-sm font-semibold text-slate-800 hover:text-black flex items-center group"
          >
            Gerar Análise <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Analysis Output Area */}
      {(loading || analysis) && (
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm mt-8 animate-fade-in">
            <div className="flex items-center gap-2 mb-4 text-indigo-600 font-semibold">
                <Sparkles size={20} />
                <h3>Análise IA - {selectedType}</h3>
            </div>
            
            {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 size={32} className="animate-spin text-slate-400 mb-2" />
                    <p className="text-slate-500 text-sm">Processando dados...</p>
                </div>
            ) : (
                <div className="prose prose-slate max-w-none">
                    <div className="whitespace-pre-line text-slate-700 leading-relaxed">
                        {analysis}
                    </div>
                </div>
            )}
        </div>
      )}
    </div>
  );
};