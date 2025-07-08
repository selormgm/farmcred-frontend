export interface FarmerProfile {
  id: number;
  account_id: number;
  full_name: string;
  phone_number: string;
  country: string;
  region: string;
  dob: string;
  national_id: string;
  home_address: string;
  produce: string[];
  trust_level_stars: number;
  trust_score_percent: number;
  total_income_last_12_months: number;
  transactions: string[];
  transfers: string[];
  loans: string[];
  created_at: string;
  updated_at: string;
  investment_status: "available" | "non-available" ;
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
  status: 'income' | 'expense';
  date: string;
  created_at: string;
  updated_at: string;
  buyer: string;
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
  transfer_id : string;
  farmer: number;
  amount: number;
  recipient: string;
  type: 'sent' | 'received';
  status: 'completed' | 'pending' | 'failed';
  date: string;
  description?: string;
  created_at: string;
  updated_at: string;
  notes: string;
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

export interface InvestorProfile{
  account: number;
  full_name:string;
  phone_number: number;
  country: string;
  region: string;
  created_at: number;
  updated_at: number;
  farmers: string[];
  farmers_reviewed: number;
  farmers_funded: number;
}

export interface InvestorReview{
  id: number;
  farmer: number;
  farmer_full_name: string;
  farmer_phone_number: number;
  investor: number;
  investor_full_name: string;
  created_at: string;
}

export interface InvestorFarmers{
  account_id: number;
  full_name:string;
  phone_number: number;
  country: string;
  region: string;
  produce: string[];
  trust_level_stars: number;
  trust_score_percent: number;
  total_income_last_12_months:number;
  investment_status: "accepted" | "declined" | "pending";
}

export interface ReviewInput{
  detail: string;
  review_id: number;
}