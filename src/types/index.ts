// Common types used across the application

export interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  mainCategory: string;
  subCategory: string;
}

export interface DebtItem {
  id: number;
  name: string;
  total: number;
  remaining: number;
  monthlyPayment: number;
  dueDate: string;
  interestRate: number;
}

export interface ReceivableItem {
  id: number;
  name: string;
  amount: number;
  dueDate: string;
  notes: string;
}

export interface FinancialHealthItem {
  name: string;
  value: number;
  target: number;
  status: 'success' | 'warning' | 'danger';
  description: string;
}

export interface BudgetItem {
  category: string;
  percentage: number;
  amount: number;
  type?: string;
}

export interface RiskProfileQuestion {
  id: number;
  question: string;
  options: {
    value: string;
    label: string;
    points: number;
  }[];
}

export interface RiskProfile {
  name: string;
  range: string;
  description: string;
  allocation: {
    name: string;
    percentage: number;
  }[];
}

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}
