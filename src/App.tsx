
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './src/context/AuthContext';
import { Sidebar } from './src/components/layout/aside/Sidebar';
import { Navbar } from './src/components/layout/navBar/Navbar';
import { MobileNav } from './src/components/layout/mobileNav';
import { ClientLayout } from './src/components/layout/ClientLayout';

// Shared
import { DeveloperDocs } from './src/pages/DeveloperDocs';
import { ProfileSelection } from './src/pages/ProfileSelection';

// Pages - Auth
import { Login } from './src/app/(auth)/login';
import { Cadastro } from './src/app/(auth)/cadastro';
import { ClientLogin } from './src/app/(auth)/client-login';
import { AtivarConta } from './src/app/(auth)/ativar';

// Pages - Admin
import { Dashboard } from './src/app/(admin)/Dashboard';
import { Empresas } from './src/app/(admin)/Empresas';
import { Planos } from './src/app/(admin)/Planos';
import { Assinaturas } from './src/app/(admin)/Assinaturas';
import { Relatorios } from './src/app/(admin)/Relatorios';
import { Menu } from './src/app/(admin)/Menu';
import { Pagamentos } from './src/app/(admin)/Pagamentos';
import { Historico } from './src/app/(admin)/Historico';
import { Configuracoes } from './src/app/(admin)/Configuracoes';
import { DuvidasSuporte } from './src/app/(admin)/DuvidasSuporte';

// Pages - Client
import { ClientDashboard } from './src/app/(client)/Dashboard';
import { ClientFaturas } from './src/app/(client)/Faturas';
import { ClientConfiguracoes } from './src/app/(client)/Configuracoes';

// Admin Layout Component
const AdminLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />
      
      <div className="flex-1 flex flex-col min-w-0 duration-300">
        <Navbar onMenuClick={() => {}} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        <MobileNav />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          {/* Entry Point - Redireciona para Login (Default) */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Auth Group */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/ativar" element={<AtivarConta />} />
          <Route path="/client/login" element={<ClientLogin />} />

          {/* Interstitial Page (Após Login) */}
          <Route path="/selecionar-perfil" element={<ProfileSelection />} />
          
          {/* Tech Docs */}
          <Route path="/dev-docs" element={<DeveloperDocs />} />

          {/* Admin Group (Empresa) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="empresas" element={<Empresas />} />
            <Route path="planos" element={<Planos />} />
            <Route path="assinaturas" element={<Assinaturas />} />
            <Route path="pagamentos" element={<Pagamentos />} />
            <Route path="relatorios" element={<Relatorios />} />
            <Route path="historico" element={<Historico />} />
            <Route path="configuracoes" element={<Configuracoes />} />
            <Route path="suporte" element={<DuvidasSuporte />} />
            <Route path="menu" element={<Menu />} />
          </Route>

          {/* Client Group */}
          <Route path="/client" element={<ClientLayout />}>
              <Route index element={<Navigate to="/client/dashboard" replace />} />
              <Route path="dashboard" element={<ClientDashboard />} />
              <Route path="faturas" element={<ClientFaturas />} />
              <Route path="configuracoes" element={<ClientConfiguracoes />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
