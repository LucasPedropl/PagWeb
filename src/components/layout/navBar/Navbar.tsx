import React, { useState, useRef, useEffect } from 'react';
import { Bell, LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
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
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Logo Only */}
        <div className="lg:hidden font-bold text-xl text-slate-800">
            PagWeb
        </div>
        
        {/* Spacer to push right content if needed, or simply empty since search is gone */}
        <div className="hidden sm:block flex-1"></div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-600 transition">
          <Bell size={20} />
        </button>
        
        <div className="relative ml-2" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-3 cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 overflow-hidden border border-slate-100">
                <img src="https://placehold.co/40x40/E2E8F0/475569?text=A" alt="Admin" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block text-left">
              <span className="block font-semibold text-slate-800 text-sm">Admin</span>
              <p className="text-xs text-slate-500">ERP System</p>
            </div>
            <ChevronDown size={16} className={`hidden sm:block text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
              <div className="px-4 py-3 border-b border-slate-100 sm:hidden">
                <p className="text-sm font-semibold text-slate-900">Admin</p>
                <p className="text-xs text-slate-500">ERP System</p>
              </div>
              
              <Link 
                to="/configuracoes" 
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors" 
                onClick={() => setIsDropdownOpen(false)}
              >
                <User size={16} />
                <span>Perfil</span>
              </Link>
              <Link 
                to="/configuracoes" 
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
  );
};