import { useState, useEffect, useCallback } from 'react';
import { farmerService } from '@/lib/api/farmer';
import { ApiFilters, FarmerProfile } from '@/lib/types';


function useApiCall<T>(apiCall: () => Promise<T>, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Farmer Profile Hook
export function useFarmerProfile() {
  return useApiCall(() => farmerService.getProfile());
}

// Farmer Overview Hook
export function useFarmerOverview() {
  return useApiCall(() => farmerService.getOverview());
}

// Farmer Transactions Hook
export function useFarmerTransactions(filters?: ApiFilters) {
  return useApiCall(() => farmerService.getTransactions(filters), [filters]);
}

// Farmer Transactions Chart Hook
export function useFarmerTransactionsChart() {
  return useApiCall(() => farmerService.getTransactionsChart());
}

// Farmer Transfers Hook
export function useFarmerTransfers(filters?: ApiFilters) {
  return useApiCall(() => farmerService.getTransfers(filters), [filters]);
}

// Farmer Trust Breakdown Hook
export function useFarmerTrustBreakdown() {
  return useApiCall(() => farmerService.getTrustBreakdown());
}

export function useCreateTransaction() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTransaction = async (data: any) => {
    try {
      setLoading(true);
      setError(null);
      const result = await farmerService.createTransaction(data);
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.message || 'Failed to create transaction';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createTransaction, loading, error };
}

export function useCreateTransfer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTransfer = async (data: any) => {
    try {
      setLoading(true);
      setError(null);
      const result = await farmerService.createTransfer(data);
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.message || 'Failed to create transfer';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createTransfer, loading, error };
}

export function useUpdateProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (data: Partial<FarmerProfile>) => {
    try {
      setLoading(true);
      setError(null);
      const result = await farmerService.updateProfile(data);
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.message || 'Failed to update profile';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading, error };
}

export function useDeleteFarmerAccount() {
  const deleteAccount = async () => {
    try {
      await deleteAccount();
      return true;
    } catch (error: any) {
      console.error("Delete failed:", error.message);
      throw error;
    }
  };

  return { deleteAccount };
}
