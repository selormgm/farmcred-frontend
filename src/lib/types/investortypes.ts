export interface InvestorProfile{
  account: number;
  full_name:string;
  phone_number?: number;
  country?: string;
  region?: string;
  created_at: string;
  updated_at?: number;
  farmers?: string[];
  farmers_reviewed?: number; //farmers invested in and reviewed 
  farmers_funded?: number; // farmers funded
  total_investments: number; //total amount invested
  monthly_investment: number; // investment made monthly 
  return_on_investments?:number; // calculated price on how much an investor gets after investing monthly
  email: string;
  bio?: string;
  password?: string;
  showPassword?: boolean;
}

export interface FarmerProfile {
  id: number;
  account_id: number;
  email: string;
  full_name: string;
  phone_number: string;
  country?: string;
  region: string;
  dob?: string;
  national_id?: string;
  home_address?: string;
  produce: string[];
  trust_level_stars: number;
  trust_score_percent: number;
  total_income_last_12_months: number;
  transactions: string[];
  transfers: string[];
  loans: string[];
  total_loans: number;
  active_investments: number;
  created_at?: string;
  updated_at?: string;
  receive_level_notifications?: boolean;
  receive_sms_notifications?: boolean;
  receive_email_notifications?: boolean;
  password?: string;//Access to password
  showPassword?: boolean;//Pasword visibility
}

export interface InvestorReview{
  id: number;
  farmer: number;
  farmer_full_name: string;
  farmer_phone_number: number;
  investor: number;
  investor_full_name: string;
  created_at: string;
  rating: number;// stars given after rating 
  comment?: string;// alittle comment on how the farmer was
}


export interface InvestorFarmers{
  id: number;
  full_name: string;
  trust_level_stars: number;
  trust_score_percent: number;
  total_income_last_12_months:number;
  current_month_income: number;
  current_month_expenses: number;
  total_loans_taken: number;
  active_loans: number;
  overdue_loans: number;
}

export interface ReviewInput{
  detail: string;
  review_id: number;
}

export interface InvestorLoans{
      id: number;
      lender_full_name: string;
      farmer_full_name: string;
      amount: number,
      date_taken: string;
      due_date: string;
      date_repaid: string;
      status:'pending' | 'approved' | 'repaid' | 'declined' | 'active';
      on_time: boolean;
      interest_rate: number;
      repayment_period_months: number;
      is_active: boolean;
      created_at: string;
      updated_at: string;
      farmer: number;
      lender: number;
}

export interface ApiFilters {
  category?: string;
  status?: string;
  type?: string;
  date_from?: string;
  date_to?: string;
}