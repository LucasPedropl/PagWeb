import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Wallet,
  ChevronLeft
} from 'lucide-react';
import { NavItem } from '../../../types';

interface ClientSidebarProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const navItems: NavItem[] = [
  { label: 'Visão Geral', href: '/client/dashboard', icon: LayoutDashboard },
  { label: 'Minhas Faturas', href: '/client/faturas', icon: FileText },
];

export const ClientSidebar: React.FC<ClientSidebarProps> = ({ isCollapsed, toggleCollapse }) => {
  return (
    <aside 
      className={`
        hidden lg:flex flex-col relative
        border-r border-slate-200 bg-white shadow-none
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Header / Logo */}
      <div className="flex items-center h-[65px] px-6 border-b border-slate-200 flex-shrink-0">
        <div className="flex items-center gap-2 font-bold text-2xl text-slate-800 overflow-hidden whitespace-nowrap">
          <Wallet className="min-w-7 w-7 h-7 text-emerald-600" />
          <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
            PagWeb <span className="text-xs font-normal text-slate-400 block -mt-1">Cliente</span>
          </span>
        </div>
      </div>

      {/* Collapse Toggle Button */}
      <button
        onClick={toggleCollapse}
        className="absolute top-[65px] -right-3 -translate-y-1/2 w-6 h-6 bg-white border border-slate-300 text-slate-600 rounded-full flex items-center justify-center hover:bg-slate-100 shadow-sm z-50 transition-transform duration-300"
      >
        <ChevronLeft size={14} className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
      </button>

      {/* Navigation */}
      <nav className={`p-4 space-y-2 flex-1 ${isCollapsed ? 'overflow-visible' : 'overflow-y-auto'}`}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap group relative
                ${isActive 
                  ? 'bg-slate-800 text-white font-semibold' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
                ${isCollapsed ? 'justify-center px-2' : ''}
              `}
            >
              <Icon size={20} className="min-w-[20px]" />
              
              <span className={`transition-all duration-300 ${isCollapsed ? 'w-0 hidden' : 'w-auto'}`}>
                {item.label}
              </span>

              {/* Tooltip */}
              {isCollapsed && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2 py-1.5 bg-slate-800 text-white text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                  {item.label}
                  <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Settings at Bottom */}
      <div className="p-4 border-t border-slate-200 space-y-2">
        <NavLink
          to="/client/configuracoes"
          className={({ isActive }) => `
            flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap group relative
            ${isActive 
              ? 'bg-slate-800 text-white font-semibold' 
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
            ${isCollapsed ? 'justify-center px-2' : ''}
          `}
        >
          <Settings size={20} className="min-w-[20px]" />
          <span className={`transition-all duration-300 ${isCollapsed ? 'w-0 hidden' : 'w-auto'}`}>
            Configurações
          </span>

          {isCollapsed && (
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2 py-1.5 bg-slate-800 text-white text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
              Configurações
              <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
            </div>
          )}
        </NavLink>
      </div>
    </aside>
  );
};