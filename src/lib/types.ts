export interface FarmerProfile {
  id: number;
  account: number;
  full_name: string;
  phone_number: string;
  country: string;
  region: string;
  dob: string;
  national_id: string;
  home_address: string;
  produce: string[];
  trust_score_percent: number;
  created_at: string;
  updated_at: string;
}

export interface FarmerOverview {
  id: number;
  full_name: string;
  trust_score_percent: number;
  total_income_last_12_months: number;
  total_expenses: number;
  trust_level_stars: number;
  current_month_income: number;
  current_month_expenses: number;
  total_loans: number;
  on_time_loans: number;
  missed_loans: number;
  produce: string[];
  region: string;
  country: string;

}

export interface Transaction {
  id: number;
  name: string;
  farmer: number;
  amount: number;
  category: string;
  description: string;
  status: 'income' | 'expense';
  date: string;
  created_at: string;
}

export interface TransactionInput {
  amount: number;
  category: string;
  description: string;
  status: 'income' | 'expense';
  date: string;
}

export interface Transfer {
  length: number;
  recipient_or_sender: any;
  id: number;
  farmer: number;
  amount: number;
  recipient: string;
  type: 'sent' | 'received';
  status: 'completed' | 'pending' | 'failed';
  date: string;
  description?: string;
  created_at: string;
}

export interface TransferInput {
  amount: number;
  recipient_or_sender: string;
  type: 'sent' | 'received';
  status: 'completed' | 'pending' | 'failed';
  date: string;
  description?: string;
}

export interface ChartData {
  month: string;
  income: number;
  expenses: number;
}

export interface TrustBreakdown {
  trust_score_percent: number;
  total_loans: number;
  on_time_loans: number;
  missed_loans: number;
  payment_history: Array<{
    month: string;
    on_time: number;
    missed: number;
  }>;
}

export interface ApiFilters {
  category?: string;
  status?: string;
  type?: string;
  date_from?: string;
  date_to?: string;
}