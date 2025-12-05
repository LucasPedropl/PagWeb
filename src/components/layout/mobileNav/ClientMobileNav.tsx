import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings } from 'lucide-react';

export const ClientMobileNav: React.FC = () => {
  const navItems = [
    { label: 'Visão Geral', href: '/client/dashboard', icon: LayoutDashboard },
    { label: 'Faturas', href: '/client/faturas', icon: FileText },
    { label: 'Configurações', href: '/client/configuracoes', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 md:hidden pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) => `
                flex flex-col items-center justify-center w-full h-full space-y-1
                ${isActive ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}
              `}
            >
              {({ isActive }) => (
                <>
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                  <span className={`text-[10px] font-medium ${isActive ? 'font-semibold' : ''}`}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};