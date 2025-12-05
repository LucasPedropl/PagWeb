import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CreditCard, Layers, Menu as MenuIcon } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const navItems = [
    { label: 'Início', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Clientes', href: '/admin/empresas', icon: Users },
    { label: 'Planos', href: '/admin/planos', icon: Layers },
    { label: 'Assinaturas', href: '/admin/assinaturas', icon: CreditCard },
    { label: 'Menu', href: '/admin/menu', icon: MenuIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 lg:hidden pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) => `
                flex flex-col items-center justify-center w-full h-full space-y-1
                ${isActive ? 'text-slate-800' : 'text-slate-400 hover:text-slate-600'}
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