import{
  InvestorProfile,
  InvestorReview,
  InvestorFarmers,
  ReviewInput,
  FarmerProfile,
}from '@/lib/types'

import apiClient from '../axios';

export const investorService = {
  //Profile
  async getProfile(): Promise<InvestorProfile> {
    const response = await apiClient.get('/api/investor/profile/');
    return response.data;
  },

  async updateProfile(data: Partial<InvestorProfile>) : Promise<InvestorProfile> {
    const response = await apiClient.put('api/investor/profile/', data);
    return response.data;
  },

 //Get review for farmers
 async getFarmerReview(): Promise<InvestorReview>{
  const response = await apiClient.get('/api/investor/farmers/reviewed/')
  return response.data;
 },

  async createReviewforFarmer(pk: number, reviewData: ReviewInput): Promise<InvestorReview>{
    const response = await apiClient.post('api/investor/farmers/<int:pk>/review/', reviewData)
    return response.data;
  },

 async updateFarmerReview(data: Partial<InvestorReview>) : Promise<InvestorReview>{
  const response = await apiClient.put('/api/investor/farmers/reviewed/', data);
  return response.data;
 },

 //Get farmer list 
 async getFarmerList(): Promise<InvestorFarmers>{
  const response = await apiClient.get('/api/investor/farmers/')
  return response.data;
 },

 async getDetailsforSpecificFarmer(pk: number): Promise<FarmerProfile>{
  const response = await apiClient.get('/api/investor/farmers/<int:pk>/profile/')
  return response.data;
 },

 async updateFarmerList(data: Partial<InvestorFarmers>) : Promise<InvestorFarmers>{
  const response = await apiClient.put('/api/investor/farmers/', data);
  return response.data;
 },
};