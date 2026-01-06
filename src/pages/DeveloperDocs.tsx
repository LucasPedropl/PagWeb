
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

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  scope: 'Auth' | 'Admin' | 'Empresa' | 'Usuário' | 'Financeiro' | 'Global';
  payload?: any;
  response?: any;
}

// Endpoints extraídos do PDF
const endpoints: Endpoint[] = [
  // --- AUTH / USER ---
  { 
    method: 'POST', 
    path: '/api/v1/User/login', 
    description: 'Autenticação de usuário', 
    scope: 'Auth', 
    payload: { email: 'string', password: 'string' },
    response: { token: 'string', tipo: 'string' }
  },
  { 
    method: 'POST', 
    path: '/api/v1/User/register', 
    description: 'Registro de novo usuário', 
    scope: 'Auth', 
    payload: { 
      nome: 'string', 
      sobreNome: 'string', 
      cpf: 'string', 
      email: 'string', 
      password: 'string', 
      telefone: 'string' 
    } 
  },
  {
    method: 'PATCH',
    path: '/api/v1/User/{id}',
    description: 'Atualizar dados do usuário',
    scope: 'Usuário',
    payload: { /* Schema UserUpdateDto */ }
  },
  {
    method: 'DELETE',
    path: '/api/v1/User/{id}',
    description: 'Remover usuário',
    scope: 'Usuário'
  },
  
  // --- ADMIN USER OPERATIONS ---
  {
    method: 'POST',
    path: '/api/v1/User/admin/cliente',
    description: 'Criar cliente via painel administrativo',
    scope: 'Admin'
  },
  {
    method: 'POST',
    path: '/api/v1/User/admin/assinatura',
    description: 'Criar assinatura via painel administrativo',
    scope: 'Admin'
  },
  {
    method: 'GET',
    path: '/api/v1/User/admin/clientes',
    description: 'Listar todos os clientes (Admin)',
    scope: 'Admin'
  },

  // --- EMPRESA ---
  {
    method: 'POST',
    path: '/api/v1/Empresa',
    description: 'Cadastrar nova empresa',
    scope: 'Empresa',
    payload: { nome: 'string', cnpj: 'string', email: 'string', password: 'string', telefone: 'string' }
  },
  {
    method: 'PATCH',
    path: '/api/v1/Empresa/{id}',
    description: 'Atualizar dados da empresa',
    scope: 'Empresa',
    payload: { /* Schema EmpresaUpdateDto */ }
  },

  // --- ASSINATURA ---
  {
    method: 'POST',
    path: '/api/v1/Assinatura',
    description: 'Criar nova assinatura',
    scope: 'Empresa',
    payload: { 
      idCliente: 0, 
      idPlano: 0, 
      periodo: 48, 
      dataInicio: '2026-01-06T17:44:10.429Z', 
      dataFim: '2026-01-06T17:44:10.429Z', 
      desconto: 0, 
      observacao: 'string' 
    }
  },
  {
    method: 'PATCH',
    path: '/api/v1/Assinatura/{id}',
    description: 'Atualizar assinatura existente',
    scope: 'Empresa'
  },
  {
    method: 'GET',
    path: '/api/v1/Assinatura/empresa',
    description: 'Obter assinaturas da empresa logada',
    scope: 'Empresa'
  },

  // --- PLANO ---
  {
    method: 'POST',
    path: '/api/v1/Plano',
    description: 'Criar novo plano',
    scope: 'Admin',
    payload: { nome: 'string', valorMensalidade: 0, funcionalidades: ['string'] }
  },
  {
    method: 'PATCH',
    path: '/api/v1/Plano/{id}',
    description: 'Atualizar plano existente',
    scope: 'Admin'
  },
  {
    method: 'DELETE',
    path: '/api/v1/Plano/{id}',
    description: 'Remover plano',
    scope: 'Admin'
  },

  // --- MENSALIDADE ---
  {
    method: 'GET',
    path: '/api/v1/Mensalidade/empresa',
    description: 'Listar mensalidades da empresa',
    scope: 'Financeiro'
  },
  {
    method: 'PATCH',
    path: '/api/v1/Mensalidade/{id}',
    description: 'Atualizar mensalidade',
    scope: 'Financeiro'
  },
  {
    method: 'DELETE',
    path: '/api/v1/Mensalidade/{id}',
    description: 'Remover mensalidade',
    scope: 'Financeiro'
  },

  // --- ENDEREÇO ---
  {
    method: 'POST',
    path: '/api/v1/Endereco/usuario',
    description: 'Cadastrar endereço para usuário',
    scope: 'Usuário',
    payload: { rua: 'string', numero: 'string', bairro: 'string', cidade: 'string', estado: 'string', cep: 'string' }
  },
  {
    method: 'POST',
    path: '/api/v1/Endereco/empresa',
    description: 'Cadastrar endereço para empresa',
    scope: 'Empresa',
    payload: { rua: 'string', numero: 'string', bairro: 'string', cidade: 'string', estado: 'string', cep: 'string' }
  },
  {
    method: 'PATCH',
    path: '/api/v1/Endereco/{id}',
    description: 'Atualizar endereço',
    scope: 'Global'
  }
];

// Schemas extraídos do PDF
const schemas = [
  {
    name: 'UserRegistrationDto',
    scope: 'Auth',
    fields: [
      { name: 'nome', type: 'String', desc: 'Primeiro nome' },
      { name: 'sobreNome', type: 'String', desc: 'Sobrenome' },
      { name: 'cpf', type: 'String', desc: 'CPF sem formatação' },
      { name: 'email', type: 'String', desc: 'Email válido' },
      { name: 'password', type: 'String', desc: 'Senha' },
      { name: 'telefone', type: 'String', desc: 'Telefone de contato' }
    ]
  },
  {
    name: 'EmpresaCreateDto',
    scope: 'Empresa',
    fields: [
      { name: 'nome', type: 'String', desc: 'Razão social ou fantasia' },
      { name: 'cnpj', type: 'String', desc: 'CNPJ da empresa' },
      { name: 'email', type: 'String', desc: 'Email corporativo' },
      { name: 'password', type: 'String', desc: 'Senha de acesso' },
      { name: 'telefone', type: 'String', desc: 'Telefone principal' }
    ]
  },
  {
    name: 'AssinaturaCreateDto',
    scope: 'Assinatura',
    fields: [
      { name: 'idCliente', type: 'Integer', desc: 'ID do Cliente' },
      { name: 'idPlano', type: 'Integer', desc: 'ID do Plano contratado' },
      { name: 'periodo', type: 'Integer', desc: 'Período em meses (ex: 48)' },
      { name: 'dataInicio', type: 'DateTime', desc: 'ISO 8601 Date' },
      { name: 'dataFim', type: 'DateTime', desc: 'ISO 8601 Date' },
      { name: 'desconto', type: 'Double', desc: 'Valor ou percentual de desconto' },
      { name: 'observacao', type: 'String', desc: 'Notas adicionais' }
    ]
  },
  {
    name: 'PlanoCreateDto',
    scope: 'Plano',
    fields: [
      { name: 'nome', type: 'String', desc: 'Nome do plano' },
      { name: 'valorMensalidade', type: 'Double', desc: 'Valor da mensalidade' },
      { name: 'funcionalidades', type: 'Array<String>', desc: 'Lista de features' }
    ]
  },
  {
    name: 'EnderecoInputDto',
    scope: 'Endereco',
    fields: [
      { name: 'rua', type: 'String', desc: 'Logradouro' },
      { name: 'numero', type: 'String', desc: 'Número' },
      { name: 'bairro', type: 'String', desc: 'Bairro' },
      { name: 'cidade', type: 'String', desc: 'Cidade' },
      { name: 'estado', type: 'String', desc: 'UF' },
      { name: 'cep', type: 'String', desc: 'CEP' }
    ]
  },
  {
    name: 'LoginResponse',
    scope: 'Auth',
    fields: [
      { name: 'token', type: 'String', desc: 'JWT Token Bearer' },
      { name: 'tipo', type: 'String', desc: 'Role do usuário (ex: Admin)' }
    ]
  }
];

export const DeveloperDocs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'endpoints' | 'objects'>('endpoints');
  const [filterScope, setFilterScope] = useState<string>('All');

  const filteredEndpoints = filterScope === 'All' 
    ? endpoints 
    : endpoints.filter(e => e.scope === filterScope);

  const scopes = ['All', 'Auth', 'Admin', 'Empresa', 'Usuário', 'Financeiro'];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans">
      {/* Header */}
      <header className="h-16 border-b border-slate-800 bg-[#020617]/95 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-8">
        <div className="flex items-center gap-6">
          <a href="#/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Voltar</span>
          </a>
          <div className="h-6 w-px bg-slate-800"></div>
          <div className="flex items-center gap-3">
            <div className="bg-cyan-500/20 p-1.5 rounded-lg">
                <Code2 className="text-cyan-400" size={20} />
            </div>
            <h1 className="font-bold text-white tracking-tight">
              API Engine <span className="text-slate-500 font-mono text-xs ml-2">v1.0 (BixAPI)</span>
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
                    Documentação gerada a partir do Swagger BixAPI V1. Utilize os endpoints abaixo para integração.
                    Todas as chamadas requerem token JWT no header <code>Authorization: Bearer</code> (exceto login/register).
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
                    <div className={`w-20 py-1 rounded text-[10px] font-black text-center uppercase border
                      ${ep.method === 'GET' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                        ep.method === 'POST' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                        ep.method === 'PUT' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                        ep.method === 'PATCH' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                        'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                      {ep.method}
                    </div>
                    <code className="text-white font-mono font-bold text-sm bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">{ep.path}</code>
                    <span className="text-slate-400 text-xs font-medium flex-1">{ep.description}</span>
                    
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
                                <label className="text-[10px] uppercase font-black text-slate-600 tracking-widest ml-1">Response Example</label>
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
          </div>
        )}

        <footer className="mt-20 py-12 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                    <Zap className="text-cyan-400" size={20} />
                </div>
                <div>
                    <p className="text-white font-bold text-sm">Pronto para Integrar?</p>
                    <p className="text-slate-500 text-xs">Todos os endpoints foram mapeados da documentação oficial.</p>
                </div>
            </div>
            <div className="text-slate-600 text-[10px] font-mono uppercase tracking-widest text-center md:text-right">
                PagWeb BixAPI V1 &copy; 2026<br/>
                System Documentation
            </div>
        </footer>
      </main>
    </div>
  );
};
