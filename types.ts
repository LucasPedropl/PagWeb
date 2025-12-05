import React from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatarUrl?: string;
}

export interface Company {
  id: string;
  name: string;
  status: 'Ativo' | 'Inativo' | 'Pendente';
  plan: 'Básico' | 'Pro' | 'Enterprise';
  usersCount: number;
}

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; size?: number | string }>;
}

export enum ReportType {
  FINANCIAL = 'Financeiro',
  OPERATIONAL = 'Operacional',
  HR = 'Recursos Humanos'
}