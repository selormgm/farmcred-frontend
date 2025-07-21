
import { 
  FarmerProfile, 
  FarmerOverview, 
  Transaction, 
  TransactionInput,
  Transfer, 
  TransferInput,
  ChartData, 
  TrustBreakdown,
  ApiFilters, 
  FarmerLoans
} from '@/lib/types';

import apiClient from '../axios';

export const farmerService = {
  // Profile 
  async getProfile(): Promise<FarmerProfile> {
    const response = await apiClient.get('/api/farmer/profile/');
    return response.data;
  },

  async updateProfile(data: Partial<FarmerProfile>): Promise<FarmerProfile> {
    const response = await apiClient.put('/api/farmer/profile/', data);
    return response.data;
  },

  // Overview 
  async getOverview(): Promise<FarmerOverview> {
    const response = await apiClient.get('/api/farmer/overview/');
    return response.data;
  },

  // Transaction 
  async getTransactions(filters?: ApiFilters): Promise<Transaction[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }
    const response = await apiClient.get(`/api/farmer/transactions/?${params.toString()}`);
    return response.data;
  },

  async createTransaction(data: TransactionInput): Promise<Transaction> {
    const response = await apiClient.post('/api/farmer/transactions/', data);
    return response.data;
  },

  async getTransactionsChart(): Promise<ChartData[]> {
    const response = await apiClient.get('/api/farmer/transactions/chart/');
    return response.data;
  },

  // Transfer 
  async getTransfers(filters?: ApiFilters): Promise<Transfer[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }
    const response = await apiClient.get(`/api/farmer/transfers/?${params.toString()}`);
    return response.data;
  },

  async createTransfer(data: TransferInput): Promise<Transfer> {
    const response = await apiClient.post('/api/farmer/transfers/', data);
    return response.data;
  },

  // Trust breakdown 
  async getTrustBreakdown(): Promise<TrustBreakdown> {
    const response = await apiClient.get('/api/farmer/trust-breakdown/');
    return response.data;
  },

  //Farmer loans
  async getLoans(filters?: ApiFilters): Promise<FarmerLoans[]> {
  const params = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
  }
  const response = await apiClient.get(`/api/farmer/loans/?${params.toString()}`);
  return response.data;
}
,

// Delete Account
async deleteFarmerAccount(): Promise<boolean> {
  try {
    await apiClient.delete('/api/delete-account/');
    return true;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete account");
  }
},
};

//Farmer Product


