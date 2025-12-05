import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { DollarSign, Users, PieChart as PieIcon, CalendarClock, ArrowUpRight, ArrowDownRight, AlertTriangle } from 'lucide-react';

const revenueData = [
  { name: 'Jan', value: 60 },
  { name: 'Fev', value: 112 },
  { name: 'Mar', value: 115 },
  { name: 'Abr', value: 95 },
  { name: 'Mai', value: 100 },
  { name: 'Jun', value: 80 },
];

const sourceData = [
  { name: 'Website', value: 50, color: '#3b82f6' },
  { name: 'Indicação', value: 25, color: '#10b981' },
  { name: 'Mídia Social', value: 15, color: '#f59e0b' },
  { name: 'Outros', value: 10, color: '#ef4444' },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Bem-vindo de volta! Aqui está o que está acontecendo hoje.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Faturamento Total</p>
              <p className="text-3xl font-bold text-slate-800 mt-2">R$ 328.000</p>
              <p className="text-sm text-green-500 flex items-center mt-1">
                <ArrowUpRight size={16} className="mr-1" />
                <span>+12.5%</span>
                <span className="text-slate-500 ml-1">do último mês</span>
              </p>
            </div>
            <div className="bg-slate-100 text-slate-600 p-2.5 rounded-lg">
              <DollarSign size={20} />
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Clientes Ativos</p>
              <p className="text-3xl font-bold text-slate-800 mt-2">147</p>
              <p className="text-sm text-green-500 flex items-center mt-1">
                <ArrowUpRight size={16} className="mr-1" />
                <span>+8</span>
                <span className="text-slate-500 ml-1">nesta semana</span>
              </p>
            </div>
            <div className="bg-sky-100 text-sky-600 p-2.5 rounded-lg">
              <Users size={20} />
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Taxa de Conversão</p>
              <p className="text-3xl font-bold text-slate-800 mt-2">15.3%</p>
              <p className="text-sm text-red-500 flex items-center mt-1">
                <ArrowDownRight size={16} className="mr-1" />
                <span>-2.1%</span>
                <span className="text-slate-500 ml-1">do último mês</span>
              </p>
            </div>
            <div className="bg-emerald-100 text-emerald-600 p-2.5 rounded-lg">
              <PieIcon size={20} />
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Mensalidades Atrasadas</p>
              <p className="text-3xl font-bold text-slate-800 mt-2">23</p>
              <p className="text-sm text-orange-500 flex items-center mt-1">
                <AlertTriangle size={16} className="mr-1" />
                <span>12</span>
                <span className="text-slate-500 ml-1">vencidas</span>
              </p>
            </div>
            <div className="bg-orange-100 text-orange-600 p-2.5 rounded-lg">
              <CalendarClock size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Tendência de Faturamento</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e293b" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1e293b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Area type="monotone" dataKey="value" stroke="#1e293b" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Fontes dos Clientes</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-2">
            {sourceData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center text-slate-600">
                  <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </span>
                <span className="font-medium text-slate-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};