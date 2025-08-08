import { useState, useEffect, useCallback } from 'react';
import { marketplaceService } from '@/lib/api/marketplace';
import { CreateListingInput, SendMessageInput } from '@/lib/types/marketplacetypes';

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

// Listings
export function useListings() {
  return useApiCall(() => marketplaceService.getAllListings());
}

export function useFarmerListings() {
  return useApiCall(() => marketplaceService.getFarmerListings());
}

// Conversations
export function useConversations() {
  return useApiCall(() => marketplaceService.getConversations());
}

export function useConversationMessages(conversationId: number) {
  return useApiCall(() => marketplaceService.getMessages(conversationId), [conversationId]);
}

// Create Listing
export function useCreateListing() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createListing = async (data: CreateListingInput) => {
    try {
      setLoading(true);
      setError(null);
      return await marketplaceService.createFarmerListing(data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.message;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createListing, loading, error };
}

// Send Message
export function useSendMessage(conversationId: number) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (data: SendMessageInput) => {
    try {
      setLoading(true);
      setError(null);
      return await marketplaceService.sendMessage(conversationId, data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.message;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error };
}
