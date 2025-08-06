export interface InvestmentReport{
  id: number;
  investor: string;
  project: string;
  amount: number;
  returns: string;
  status: string;
  startDate: string;
  endDate: string;
  notes: string;
  repayment: string;
};

export interface Announcement{
  id: number;
  title: string;
  message: string;
  audience:"All Users | Farmers | Investors"
  status: "Delivered | Pending | Failed"
  date: string;
}

export interface ReportOptions{
  key: "monthly-platform | user-growth | loan-performance | investment-returns | trust-changes"
  title: string;
  description: string;
  metric: string;
}
export interface ScheduledReport{
  id: string;
  reportKey: string;
  frequency: "Daily" | "Weekly" | "Monthly";
  time: string; // HH:MM
  recipients: string;
  enabled: boolean;
  nextRun: string;
};

export interface Transactions{
    id: string;
    user: string;
    amount: number;
    type: "Loan Payout | Produce Sale | Repayment";
    status: "Successful | Failed";
    date: string;
    flagged: boolean;
}
export interface InvestorDetail {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  total_investments: number;
  created_at: string;
  is_active: boolean;
  investments: {
    project: string;
    amount: number;
    date: string;
  }[];
}

export interface Roles{
    name: string;
    permissions: string[];
    active: boolean;
}

export interface Logs{
    admin: string;
    action: string;
    timestamp: string;
}

export interface Admin{
  id:number;
  name:string;
  email: string;
  role:string;
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
  return_on_investments?:number; // calculated price on how much an investor gets after investing 
  email: string;
  bio?: string;
  password?: string;
  showPassword?: boolean;
}

export interface ApiFilters {
  category?: string;
  status?: string;
  type?: string;
  date_from?: string;
  date_to?: string;
}