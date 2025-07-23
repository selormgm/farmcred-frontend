
export interface FarmerProfile {
  id: number;
  account_id: number;
  email: string;
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
  receive_level_notifications: boolean;
  receive_sms_notifications: boolean;
  receive_email_notifications: boolean;
  password: string;
  showPassword: boolean;
}

export interface FarmerOverview {
  id: number;
  full_name: string;
  trust_level_stars: number;
  trust_score_percent: number;
  total_income_last_12_months: number;
  total_expenses: number;
  current_month_income: number;
  current_month_expenses: number;
  total_loans_taken: number;
  active_loans: number;
  overdue_loans: number;
  months_active: number; // Number of months the farmer has been active
  is_source_verified: boolean; // Indicates if the farmer's source of income is verified
  source_verification_type: "Cooperative" | "Bank" | "Mobile Money"; // Type of source verification
  date_paid: string; // Date of the payment
  amount: number; // Amount of the payment
  on_time: boolean; // Indicates if the payment was made on time
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
  period: string;
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

export interface FarmerLoans{
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

export interface FarmerDiscoverability {
  is_discoverable_by_investors: boolean; // Indicates if the farmer is discoverable by investors
  message: string; // Message indicating the current state or action taken    
}

export interface StatLogs{
  message: string;
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
  email: string;
  bio: string;
  password: string;
  showPassword: boolean;
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

export interface BuyerProfile{
    account_id: number;
    full_name: string;
    phone_number: number;
    email: string;
    country: string;
    region: string;
    receive_level_notifications: boolean;
    receive_sms_notifications: boolean;
    receive_email_notifications: boolean;
}

export interface BuyerTransaction{
  id: number;
  account_party_full_name: string;
  buyer_full_name: string;
  farmer_full_name: string;
  name: string;
  date: string;
  category: string;
  status: 'income' | 'expense';
  amount: number;
  desccription: string;
  created_at: string;
  updated_at: string;
  account_party: number;
  buyer: number;
}

export interface LenderProfile{
    id: number;
    full_name: string;
    email: string;
    phone_number: number;
    total_loans_issued_by_platform: number;
    total_repayments_received_by_platform: number;
  }

export interface LenderLoans{
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

export interface FarmerProduct {
  dateAdded: string | number | Date;
  imageUrl: string;
  name: string;
  price: number;
}

export interface FarmerProductInput {
  image: File | null;
  name: string;
  price: number;
}


export interface LoanQualificationResponse {
  message: string;
  max_qualified_amount: number;
  default_interest_rate: number;
}

export interface LoanRequestResponse {
  message: string;
  loan_id: number;
  repayment_period_months: number;
  interest_rate: number;
}

export interface LoanRequestPayload {
  amount: number;
  purpose?: string;
  duration?: number; // in months
}

export interface RepaymentConfirmationPayload {
  loan_id: number;
  amount_confirmed: number;
}

export interface RepaymentConfirmationResponse {
  message: string;
  confirmation_id?: string;
}