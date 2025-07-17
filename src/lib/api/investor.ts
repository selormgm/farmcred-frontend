import {
  InvestorProfile,
  InvestorReview,
  InvestorFarmers,
  ReviewInput,
  FarmerProfile,
  InvestorLoans,
  ApiFilters,
} from "@/lib/types";

import apiClient from "../axios";

export const investorService = {
  //Profile
  async getProfile(): Promise<InvestorProfile> {
    const response = await apiClient.get("/api/investor/profile/");
    return response.data;
  },

  async updateProfile(
    data: Partial<InvestorProfile>
  ): Promise<InvestorProfile> {
    const response = await apiClient.put("/api/investor/profile/", data);
    return response.data;
  },

  //Get review for farmers
  async getFarmerReview(): Promise<InvestorReview> {
    const response = await apiClient.get("/api/investor/farmers/reviewed/");
    return response.data;
  },

  async createReviewforFarmer(
    pk: number,
    reviewData: ReviewInput
  ): Promise<InvestorReview> {
    const response = await apiClient.post(
      `/api/investor/farmers/${pk}/review/`,
      reviewData
    );
    return response.data;
  },

  async updateFarmerReview(
    data: Partial<InvestorReview>
  ): Promise<InvestorReview> {
    const response = await apiClient.put(
      "/api/investor/farmers/reviewed/",
      data
    );
    return response.data;
  },

  async getFarmerList(): Promise<InvestorFarmers[]> {
    const response = await apiClient.get("/api/investor/farmers/");
    return response.data;
  },

  async getDetailsforSpecificFarmer(pk: number): Promise<FarmerProfile> {
    const response = await apiClient.get(
      `/api/investor/farmers/${pk}/profile/`
    );
    return response.data;
  },

  async updateFarmerList(
    data: Partial<InvestorFarmers>
  ): Promise<InvestorFarmers> {
    const response = await apiClient.put("/api/investor/farmers/", data);
    return response.data;
  },

  //Investor loans
  async getInvestorLoans(filters?: ApiFilters): Promise<InvestorLoans[]> {
  const params = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    }
  );
  }
     const response = await apiClient.get('/api/investor/loans/');
    return response.data;
  },



  // Delete Account
async deleteInvestorAccount(): Promise<boolean> {
  try {
    await apiClient.delete('/api/delete-account/');
    return true;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete account");
  }
},
};
