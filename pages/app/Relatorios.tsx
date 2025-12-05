import React, { useState } from 'react';
import { generateReportAnalysis } from '../../services/geminiService';
import { FileText, Sparkles, Loader2, Download } from 'lucide-react';
import { ReportType } from '../../types';

export const Relatorios: React.FC = () => {
  const [selectedType, setSelectedType] = useState<ReportType | ''>('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string>('');
  const [contextData, setContextData] = useState('');

  const handleGenerate = async () => {
    if (!selectedType || !contextData) return;
    setLoading(true);
    setAnalysis('');
    
    // Simulate API latency slightly if key is instant, but mostly wait for Gemini
    const result = await generateReportAnalysis(selectedType, contextData);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Relatórios Inteligentes</h1>
          <p className="text-slate-500 mt-1">Utilize IA para gerar insights sobre seus dados.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 h-fit">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText size={20} className="text-indigo-600"/>
            Configuração do Relatório
          </h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Relatório</label>
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as ReportType)}
              className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              <option value="">Selecione um tipo...</option>
              {Object.values(ReportType).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Contexto de Dados 
              <span className="text-xs font-normal text-slate-400 ml-2">(Cole CSV, JSON ou texto simples)</span>
            </label>
            <textarea 
              value={contextData}
              onChange={(e) => setContextData(e.target.value)}
              rows={6}
              className="w-full rounded-lg border-slate-300 border p-3 focus:ring-indigo-500 focus:border-indigo-500 text-sm font-mono"
              placeholder="Ex: Receita Jan: 10k, Fev: 12k. Despesas Jan: 5k..."
            />
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading || !selectedType || !contextData}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white py-2.5 rounded-lg font-medium transition-all"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
            {loading ? 'Analisando...' : 'Gerar Análise com IA'}
          </button>
        </div>

        {/* Output Section */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">Resultado</h2>
            {analysis && (
               <button className="text-slate-500 hover:text-indigo-600 transition-colors">
                 <Download size={20} />
               </button>
            )}
          </div>

          <div className="flex-1 bg-slate-50 rounded-lg p-4 border border-slate-100 overflow-y-auto">
             {!analysis && !loading && (
               <div className="h-full flex flex-col items-center justify-center text-slate-400">
                 <Sparkles size={48} className="mb-4 text-slate-300" />
                 <p>Configure e gere um relatório para ver a análise aqui.</p>
               </div>
             )}
             
             {loading && (
                <div className="h-full flex flex-col items-center justify-center text-indigo-600">
                  <Loader2 size={48} className="animate-spin mb-4" />
                  <p className="text-sm font-medium">A IA está processando seus dados...</p>
                </div>
             )}

             {analysis && (
               <div className="prose prose-sm prose-indigo max-w-none text-slate-700 whitespace-pre-line">
                 {analysis}
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};