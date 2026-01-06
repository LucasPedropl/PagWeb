
import React from 'react';

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  cpf: string;
  email: string;
  phone: string;
  address: string;
  status: 'Ativo' | 'Inativo' | 'Pendente';
  joinDate: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}

export interface Subscription {
  id: string;
  clientId: string;
  clientName: string; // Denormalized for display convenience
  planId: string;
  planName: string; // Denormalized for display convenience
  price: number;
  status: 'Ativa' | 'Cancelada' | 'Pendente' | 'Atrasada';
  startDate: string; // DT Aquisição
  endDate?: string; // Dt Finalizar
  period?: number; // Periodo (meses)
  isRecurring?: boolean; // Rec
  paymentMethod?: 'Boleto' | 'Pix' | 'Cartão';
  discount?: number;
  observation?: string;
}

export interface Transaction {
    id: string;
    clientId: string;
    clientName: string;
    amount: number;
    status: 'Pago' | 'Pendente' | 'Falha' | 'Reembolsado';
    date: string;
    method: 'Cartão' | 'Boleto' | 'Pix';
    reference: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; size?: number | string }>;
}

export enum ReportType {
  FINANCIAL = 'Financeiro',
  GROWTH = 'Crescimento',
  OPERATIONAL = 'Operacional',
  HR = 'Recursos Humanos'
}

export interface UserLoginDto {
  email?: string;
  password?: string;
}

export interface LoginResponse {
  token: string;
  tipo: string;
}

export interface UserRegisterDto {
  nome: string;
  sobreNome: string;
  cpf: string;
  email: string;
  password: string;
  telefone: string;
}

export interface EmpresaCreateDto {
    nome: string;
    cnpj: string;
    email: string;
    password: string;
    telefone: string;
}

export interface ActivityLog {
    id: string;
    user: string;
    action: string;
    target: string;
    timestamp: string;
    type: 'create' | 'update' | 'delete' | 'warning' | 'info';
}