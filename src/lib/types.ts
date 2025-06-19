export interface Farmer {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    created_at: Date;
    updated_at: Date;
    is_active: boolean;
    is_verified: boolean;
    profile_picture_url?: string;
}



export interface Overview {
   full_name: string; 
    phone_number: string;
    country: string;
    region: string;
    trust_level_stars: number;
    trust_score_percent: number;
    total_income_current_month: number;
    total_expenses_current_month: number;
    expected_roi: number;

}