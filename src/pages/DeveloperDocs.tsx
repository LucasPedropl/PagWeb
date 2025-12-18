
import React, { useState } from 'react';
import { 
  Code2, 
  Database, 
  ArrowLeft, 
  Globe, 
  FileJson,
  Layers,
  ShieldCheck,
  Zap,
  Tag,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  scope: 'Auth' | 'Admin/Empresa' | 'Cliente' | 'Global';
  payload?: any;
  response?: any;
}

const endpoints: Endpoint[] = [
  // --- AUTH ---
  { 
    method: 'POST', 
    path: '/api/v1/auth/login', 
    description: 'Autenticação centralizada com JWT', 
    scope: 'Auth', 
    payload: { email: 'string', password: 'string', type: 'admin | client' },
    response: { token: 'string', user: { id: 'uuid', role: 'string' } }
  },
  { 
    method: 'POST', 
    path: '/api/v1/auth/register', 
    description: 'Criação de conta Empresa (Tenant)', 
    scope: 'Auth', 
    payload: { companyName: 'string', adminEmail: 'string', password: 'string' } 
  },
  { 
    method: 'POST', 
    path: '/api/v1/auth/forgot-password', 
    description: 'Solicitação de reset de senha via email', 
    scope: 'Auth', 
    payload: { email: 'string' } 
  },

  // --- ADMIN / EMPRESAS (GESTÃO DE CLIENTES) ---
  { 
    method: 'GET', 
    path: '/api/v1/admin/clients', 
    description: 'Listagem paginada de clientes PF', 
    scope: 'Admin/Empresa' 
  },
  { 
    method: 'POST', 
    path: '/api/v1/admin/clients', 
    description: 'Cadastro de novo cliente PF (Formulário Empresas)', 
    scope: 'Admin/Empresa',
    payload: { 
      firstName: 'string', 
      lastName: 'string', 
      cpf: 'string (mask)', 
      email: 'string', 
      phone: 'string',
      address: { street: 'string', city: 'string', zip: 'string' }
    }
  },
  { 
    method: 'PATCH', 
    path: '/api/v1/admin/clients/:id/status', 
    description: 'Alteração rápida de status (Ativo/Inativo)', 
    scope: 'Admin/Empresa',
    payload: { status: 'string' }
  },

  // --- PLANOS & ASSINATURAS ---
  { 
    method: 'GET', 
    path: '/api/v1/admin/plans', 
    description: 'Catálogo de planos para venda', 
    scope: 'Admin/Empresa' 
  },
  { 
    method: 'POST', 
    path: '/api/v1/admin/plans', 
    description: 'Criação de novo produto/plano', 
    scope: 'Admin/Empresa',
    payload: { name: 'string', price: 'number', features: 'string[]', isPopular: 'boolean' }
  },
  { 
    method: 'POST', 
    path: '/api/v1/admin/subscriptions', 
    description: 'Vincular cliente a um plano (Checkout interno)', 
    scope: 'Admin/Empresa',
    payload: { 
      clientId: 'uuid', 
      planId: 'uuid', 
      startDate: 'ISO8601', 
      periodMonths: 'number', 
      discount: 'number (percent)',
      isRecurring: 'boolean'
    }
  },

  // --- FINANCEIRO & PAGAMENTOS ---
  { 
    method: 'GET', 
    path: '/api/v1/admin/payments', 
    description: 'Dashboard financeiro e conciliação', 
    scope: 'Admin/Empresa' 
  },
  { 
    method: 'POST', 
    path: '/api/v1/payments/:invoiceId/pix', 
    description: 'Geração dinâmica de QR Code Pix', 
    scope: 'Global',
    response: { qrCode: 'base64', copyPaste: 'string' }
  },
  { 
    method: 'POST', 
    path: '/api/v1/webhooks/payment-provider', 
    description: 'Recebimento de confirmação de pagamento (Assíncrono)', 
    scope: 'Global',
    payload: { transactionId: 'string', status: 'PAID | REFUNDED' }
  },

  // --- CLIENTE (PORTAL DO ASSINANTE) ---
  { 
    method: 'GET', 
    path: '/api/v1/client/dashboard', 
    description: 'Resumo da conta do assinante', 
    scope: 'Cliente' 
  },
  { 
    method: 'GET', 
    path: '/api/v1/client/invoices', 
    description: 'Histórico de faturas do cliente logado', 
    scope: 'Cliente' 
  },
  { 
    method: 'PUT', 
    path: '/api/v1/client/profile', 
    description: 'Atualização de dados cadastrais pelo cliente', 
    scope: 'Cliente',
    payload: { phone: 'string', email: 'string', address: 'string' }
  },

  // --- IA & LOGS ---
  { 
    method: 'POST', 
    path: '/api/v1/ai/analyze-report', 
    description: 'Envio de dados para análise Gemini', 
    scope: 'Admin/Empresa',
    payload: { type: 'financial | growth', dataContext: 'text/json' }
  },
  { 
    method: 'GET', 
    path: '/api/v1/admin/audit-logs', 
    description: 'Trilha de auditoria do sistema', 
    scope: 'Admin/Empresa' 
  },
];

const schemas = [
  {
    name: 'Client (PF)',
    scope: 'Empresas/Clientes',
    fields: [
      { name: 'id', type: 'UUID', desc: 'Identificador único global' },
      { name: 'firstName', type: 'String', desc: 'Nome do cliente' },
      { name: 'cpf', type: 'String', desc: 'CPF sem pontuação (11 dígitos)' },
      { name: 'email', type: 'Email', desc: 'Email principal para faturas' },
      { name: 'status', type: 'Enum', desc: 'Ativo, Inativo, Pendente' },
      { name: 'joinDate', type: 'Date', desc: 'Data de cadastro' }
    ]
  },
  {
    name: 'Subscription',
    scope: 'Assinaturas',
    fields: [
      { name: 'id', type: 'UUID', desc: 'ID da assinatura' },
      { name: 'clientId', type: 'UUID', desc: 'Referência ao cliente' },
      { name: 'planId', type: 'UUID', desc: 'Referência ao plano' },
      { name: 'price', type: 'Decimal', desc: 'Preço final após descontos' },
      { name: 'period', type: 'Integer', desc: 'Duração em meses' },
      { name: 'isRecurring', type: 'Boolean', desc: 'Se renova automaticamente' },
      { name: 'nextBilling', type: 'Date', desc: 'Data da próxima cobrança' }
    ]
  },
  {
    name: 'Invoice (Fatura)',
    scope: 'Pagamentos / Cliente',
    fields: [
      { name: 'id', type: 'UUID', desc: 'ID da fatura' },
      { name: 'reference', type: 'String', desc: 'Mês/Ano de referência' },
      { name: 'amount', type: 'Decimal', desc: 'Valor total' },
      { name: 'dueDate', type: 'Date', desc: 'Data de vencimento' },
      { name: 'status', type: 'Enum', desc: 'Pago, Pendente, Atrasado, Cancelado' },
      { name: 'barcode', type: 'String', desc: 'Linha digitável do boleto' }
    ]
  },
  {
    name: 'Transaction',
    scope: 'Gateway de Pagamento',
    fields: [
      { name: 'id', type: 'String', desc: 'ID no gateway externo' },
      { name: 'method', type: 'Enum', desc: 'PIX, CREDIT_CARD, BOLETO' },
      { name: 'status', type: 'String', desc: 'Mapeamento direto do provedor' },
      { name: 'processedAt', type: 'DateTime', desc: 'Data exata da liquidação' }
    ]
  }
];

export const DeveloperDocs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'endpoints' | 'objects'>('endpoints');
  const [filterScope, setFilterScope] = useState<string>('All');

  const filteredEndpoints = filterScope === 'All' 
    ? endpoints 
    : endpoints.filter(e => e.scope === filterScope);

  const scopes = ['All', 'Auth', 'Admin/Empresa', 'Cliente', 'Global'];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans">
      {/* Header */}
      <header className="h-16 border-b border-slate-800 bg-[#020617]/95 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-8">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Voltar</span>
          </Link>
          <div className="h-6 w-px bg-slate-800"></div>
          <div className="flex items-center gap-3">
            <div className="bg-cyan-500/20 p-1.5 rounded-lg">
                <Code2 className="text-cyan-400" size={20} />
            </div>
            <h1 className="font-bold text-white tracking-tight">
              API Engine <span className="text-slate-500 font-mono text-xs ml-2">v2.4.0-beta</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/50 p-1 rounded-xl border border-slate-800">
          <button 
            onClick={() => setActiveTab('endpoints')}
            className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'endpoints' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'hover:text-white'}`}
          >
            <Zap size={14} /> ENDPOINTS
          </button>
          <button 
            onClick={() => setActiveTab('objects')}
            className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'objects' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'hover:text-white'}`}
          >
            <Database size={14} /> OBJECTS
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8">
        
        {/* Banner Informativo */}
        <div className="mb-12 bg-gradient-to-r from-cyan-900/20 to-indigo-900/20 border border-cyan-500/20 rounded-2xl p-6 flex items-start gap-4">
            <div className="bg-cyan-500/10 p-3 rounded-xl text-cyan-400">
                <ShieldCheck size={28} />
            </div>
            <div>
                <h3 className="text-white font-bold text-lg">Guia para o Backend</h3>
                <p className="text-slate-400 text-sm mt-1 max-w-3xl leading-relaxed">
                    Esta documentação reflete a necessidade exata do frontend PagWeb. 
                    Todos os endpoints devem suportar CORS, retornar JSON e utilizar códigos de status HTTP semânticos (200, 201, 400, 401, 403, 500).
                </p>
            </div>
        </div>

        {activeTab === 'endpoints' ? (
          <div className="space-y-8">
            {/* Filtros de Escopo */}
            <div className="flex flex-wrap gap-2">
                {scopes.map(s => (
                    <button 
                        key={s}
                        onClick={() => setFilterScope(s)}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all
                        ${filterScope === s 
                            ? 'bg-white text-slate-950 border-white' 
                            : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600'}`}
                    >
                        {s}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredEndpoints.map((ep, idx) => (
                <div key={idx} className="bg-[#0f172a] rounded-2xl border border-slate-800/50 hover:border-cyan-500/40 transition-all overflow-hidden">
                  <div className="p-5 flex flex-wrap items-center gap-4">
                    <div className={`w-16 py-1 rounded text-[10px] font-black text-center
                      ${ep.method === 'GET' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                        ep.method === 'POST' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                        ep.method === 'PUT' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                        ep.method === 'PATCH' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                        'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                      {ep.method}
                    </div>
                    <code className="text-white font-mono font-bold text-sm bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">{ep.path}</code>
                    <span className="text-slate-400 text-xs font-medium">{ep.description}</span>
                    
                    <div className="ml-auto flex items-center gap-2">
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-800/50 rounded-full text-[10px] font-bold text-slate-400 border border-slate-700">
                            <Tag size={12} className="text-cyan-500" />
                            {ep.scope}
                        </span>
                    </div>
                  </div>

                  {(ep.payload || ep.response) && (
                    <div className="px-5 pb-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {ep.payload && (
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black text-slate-600 tracking-widest ml-1">Request Payload</label>
                                <div className="bg-[#020617] rounded-xl p-4 text-xs font-mono border border-slate-800 overflow-x-auto">
                                    <pre className="text-cyan-500/90">{JSON.stringify(ep.payload, null, 2)}</pre>
                                </div>
                            </div>
                        )}
                        {ep.response && (
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black text-slate-600 tracking-widest ml-1">Success Response (200 OK)</label>
                                <div className="bg-[#020617] rounded-xl p-4 text-xs font-mono border border-slate-800 overflow-x-auto">
                                    <pre className="text-emerald-500/90">{JSON.stringify(ep.response, null, 2)}</pre>
                                </div>
                            </div>
                        )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {schemas.map((s, idx) => (
                    <div key={idx} className="bg-[#0f172a] rounded-2xl border border-slate-800/50 p-6 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                            <FileJson size={80} />
                        </div>
                        
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-white text-lg font-bold flex items-center gap-3">
                                <div className="bg-indigo-500/20 p-2 rounded-lg">
                                    <Layers className="text-indigo-400" size={20} />
                                </div>
                                {s.name}
                            </h3>
                            <span className="text-[10px] font-black bg-slate-800 text-slate-400 px-3 py-1 rounded-full border border-slate-700">
                                {s.scope}
                            </span>
                        </div>

                        <div className="space-y-0 divide-y divide-slate-800/50">
                            {s.fields.map((f, fidx) => (
                                <div key={fidx} className="py-3 flex items-start justify-between group/field">
                                    <div className="flex flex-col">
                                        <span className="text-cyan-400 font-mono text-sm font-bold group-hover/field:text-white transition-colors">
                                            {f.name}
                                        </span>
                                        <span className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">
                                            {f.desc}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-indigo-400 text-[10px] font-black bg-indigo-500/5 px-2 py-0.5 rounded border border-indigo-500/10">
                                            {f.type}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* HTTP Status Reference */}
            <section className="bg-slate-900/30 rounded-2xl border border-slate-800 p-8">
                <h3 className="text-white font-bold flex items-center gap-2 mb-6">
                    <AlertCircle className="text-amber-500" size={20} />
                    Standard HTTP Responses
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { code: '200/201', label: 'Success', desc: 'Operação realizada com sucesso.' },
                        { code: '400', label: 'Bad Request', desc: 'Payload inválido ou erro de validação.' },
                        { code: '401/403', label: 'Auth Error', desc: 'Token ausente ou sem permissão.' },
                        { code: '404', label: 'Not Found', desc: 'Recurso não encontrado.' },
                    ].map(st => (
                        <div key={st.code}>
                            <div className="text-white font-bold font-mono">{st.code}</div>
                            <div className="text-cyan-500 text-[10px] font-black uppercase mt-1">{st.label}</div>
                            <div className="text-slate-500 text-xs mt-1">{st.desc}</div>
                        </div>
                    ))}
                </div>
            </section>
          </div>
        )}

        <footer className="mt-20 py-12 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                    <Zap className="text-cyan-400" size={20} />
                </div>
                <div>
                    <p className="text-white font-bold text-sm">Pronto para Integrar?</p>
                    <p className="text-slate-500 text-xs">Utilize o Postman ou Insomnia para testes rápidos.</p>
                </div>
            </div>
            <div className="text-slate-600 text-[10px] font-mono uppercase tracking-widest text-center md:text-right">
                PagWeb Frontend Engine &copy; 2024<br/>
                All Rights Reserved
            </div>
        </footer>
      </main>
    </div>
  );
};
