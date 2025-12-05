import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { User, Bell, Wallet, ChevronDown, Settings, LogOut } from 'lucide-react';
import { ClientMobileNav } from './mobileNav/ClientMobileNav';
import { ClientSidebar } from './aside/ClientSidebar';

export const ClientLayout: React.FC = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      {/* Sidebar Desktop */}
      <ClientSidebar 
        isCollapsed={isCollapsed} 
        toggleCollapse={() => setIsCollapsed(!isCollapsed)} 
      />

      <div className="flex-1 flex flex-col min-w-0 duration-300">
        {/* Header simplificado (apenas User e Notificações) */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 flex-shrink-0 z-30">
          
          {/* Mobile Logo (Visible only on mobile/tablet when sidebar is hidden) */}
          <div className="lg:hidden flex items-center gap-2 font-bold text-xl text-slate-800">
             <Wallet className="w-6 h-6 text-emerald-600" />
             <span>PagWeb <span className="text-slate-400 font-normal text-sm ml-1">Cliente</span></span>
          </div>

          {/* Spacer for Desktop to push content right */}
          <div className="hidden lg:block"></div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>

            <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>

            <div className="relative ml-2" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 pl-2 cursor-pointer focus:outline-none"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-slate-800 leading-tight">João da Silva</p>
                  <p className="text-xs text-slate-500">Premium</p>
                </div>
                <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 border border-indigo-200">
                  <User size={18} />
                </div>
                <ChevronDown size={16} className={`hidden sm:block text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                  <div className="px-4 py-3 border-b border-slate-100 sm:hidden">
                    <p className="text-sm font-semibold text-slate-900">João da Silva</p>
                    <p className="text-xs text-slate-500">Premium</p>
                  </div>
                  
                  <Link 
                    to="/client/configuracoes" 
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors" 
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Settings size={16} />
                    <span>Configurações</span>
                  </Link>
                  
                  <div className="border-t border-slate-100 my-1"></div>
                  
                  <button 
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Sair</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>

          {/* Footer inside scrollable area for Desktop */}
          <footer className="hidden lg:block mt-12 pt-8 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-500 mb-2">&copy; 2024 PagWeb. Todos os direitos reservados.</p>
            <div className="flex justify-center gap-4 text-xs text-slate-400">
                <a href="#" className="hover:text-indigo-600">Termos de Uso</a>
                <a href="#" className="hover:text-indigo-600">Política de Privacidade</a>
                <a href="#" className="hover:text-indigo-600">Suporte</a>
            </div>
          </footer>
        </main>

        {/* Mobile Navigation Footer */}
        <ClientMobileNav />
      </div>
    </div>
  );
};