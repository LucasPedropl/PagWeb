import React from 'react';
import { 
  Lightbulb, 
  Palette, 
  Code2, 
  Briefcase, 
  CheckCircle2, 
  MessageSquare,
  ArrowRight,
  Trash2
} from 'lucide-react';

export const DuvidasSuporte: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Dúvidas e Suporte</h1>
        <p className="text-slate-500 mt-1">Canal de comunicação direta e roadmap de evolução do sistema.</p>
      </div>

      {/* Seção de Resposta / Chat */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-indigo-50 p-4 border-b border-indigo-100 flex items-center gap-3">
          <div className="bg-indigo-600 text-white p-2 rounded-lg">
            <MessageSquare size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-indigo-900">Resposta da IA</h3>
            <p className="text-xs text-indigo-600">Em resposta à sua solicitação sobre melhorias para o sistema.</p>
          </div>
        </div>
        
        <div className="p-6 sm:p-8 space-y-8">
            {/* Aviso de Reestruturação */}
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-200 mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <Trash2 className="text-amber-600" size={24} />
                    <h3 className="font-bold text-slate-800">Atenção: Limpeza de Arquivos Necessária</h3>
                </div>
                <p className="text-slate-700 mb-4">
                    Devido à reestruturação do sistema para suportar os módulos "Empresa" e "Cliente" separadamente, 
                    realizamos uma migração de pastas. Para manter o projeto limpo, por favor, exclua os seguintes arquivos/pastas antigos:
                </p>
                <div className="bg-white p-4 rounded-lg border border-amber-100 font-mono text-sm text-red-600">
                    <ul className="list-disc pl-5 space-y-1">
                        <li>src/app/(app)/ (A pasta inteira e todo seu conteúdo)</li>
                    </ul>
                </div>
                <p className="text-slate-500 text-sm mt-4">
                    Todo o conteúdo desta pasta foi migrado com segurança para <strong>src/app/(admin)/</strong>.
                </p>
            </div>


          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 leading-relaxed">
              Analisei a estrutura atual do <strong>PagWeb Dashboard</strong>. O sistema já possui uma base sólida de CRUDs e uma interface limpa. 
              Para elevá-lo ao nível de um SaaS comercial robusto (MVP para Produção), aqui estão minhas sugestões categorizadas:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Categoria 1: Interface & UX */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <Palette className="text-purple-600" size={24} />
                <h3 className="font-bold text-slate-800">Interface & Experiência (UX)</h3>
              </div>
              <ul className="space-y-3">
                <SuggestionItem 
                  title="Dark Mode (Modo Escuro)" 
                  desc="Essencial para dashboards modernos. Implementar um toggle no header ou configurações."
                />
                <SuggestionItem 
                  title="Dashboard Personalizável" 
                  desc="Permitir que o usuário arraste (drag & drop) e redimensione os widgets da tela inicial."
                />
                <SuggestionItem 
                  title="Breadcrumbs (Trilhas de Navegação)" 
                  desc="Adicionar navegação no topo (Ex: Home > Clientes > Editar) para melhor orientação."
                />
                <SuggestionItem 
                  title="Skeleton Loading" 
                  desc="Substituir spinners simples por 'esqueletos' da interface durante o carregamento de dados."
                />
              </ul>
            </div>

            {/* Categoria 2: Regras de Negócio */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="text-emerald-600" size={24} />
                <h3 className="font-bold text-slate-800">Funcionalidades de Negócio</h3>
              </div>
              <ul className="space-y-3">
                <SuggestionItem 
                  title="Central de Notificações Real-Time" 
                  desc="Alertas de pagamentos falhos ou novos clientes via WebSocket ou Polling."
                />
                <SuggestionItem 
                  title="Controle de Acesso (RBAC)" 
                  desc="Diferenciar permissões entre 'Admin', 'Financeiro' e 'Suporte' nas configurações."
                />
                <SuggestionItem 
                  title="Geração de Documentos" 
                  desc="Botão para gerar PDF de faturas, recibos e relatórios para impressão."
                />
                <SuggestionItem 
                  title="Integração de Gateway Real" 
                  desc="Simular webhooks de Stripe/Mercado Pago para atualizar status de pagamento automaticamente."
                />
              </ul>
            </div>

             {/* Categoria 3: Engenharia & Código */}
             <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="text-blue-600" size={24} />
                <h3 className="font-bold text-slate-800">Engenharia & Arquitetura</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  <SuggestionItem 
                    title="Validação de Formulários (Zod)" 
                    desc="Substituir validações manuais por bibliotecas como React Hook Form + Zod para maior robustez."
                  />
                  <SuggestionItem 
                    title="Gerenciamento de Estado Global" 
                    desc="Implementar Context API ou Zustand para compartilhar dados do usuário/sessão entre componentes sem 'prop drilling'."
                  />
                </ul>
                <ul className="space-y-3">
                  <SuggestionItem 
                    title="Tratamento de Erros Global" 
                    desc="Criar 'Error Boundaries' e toasts de notificação (sucesso/erro) padronizados."
                  />
                  <SuggestionItem 
                    title="Mock Service Worker (MSW)" 
                    desc="Para simular um backend real com delay de rede, tornando o desenvolvimento frontend mais realista."
                  />
                </ul>
              </div>
            </div>

          </div>

          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100 flex justify-between items-center">
             <span className="text-indigo-900 font-medium">Qual dessas melhorias você gostaria de priorizar na próxima iteração?</span>
             <button className="flex items-center gap-2 text-indigo-700 font-bold hover:text-indigo-900 transition-colors text-sm">
                Responder no Chat <ArrowRight size={16} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SuggestionItem = ({ title, desc }: { title: string, desc: string }) => (
  <li className="flex items-start gap-3">
    <CheckCircle2 className="text-slate-400 mt-1 flex-shrink-0" size={16} />
    <div>
      <span className="block font-semibold text-slate-700 text-sm">{title}</span>
      <span className="block text-slate-500 text-xs leading-relaxed">{desc}</span>
    </div>
  </li>
);