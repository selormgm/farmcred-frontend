import apiClient from "../axios";
import { SendMessageInput } from "../types";

export const marketplaceService = {
  // --- Produce Listings ---
  async getAllListings() {
    const res = await apiClient.get("/api/marketplace/listings/");
    return res.data;
  },

  async getFarmerListings() {
    const res = await apiClient.get("/api/marketplace/farmer/listings/");
    return res.data;
  },

  async createFarmerListing(data: any) {
    const res = await apiClient.post("/api/marketplace/farmer/listings/", data);
    return res.data;
  },

  async updateFarmerListing(id: number, data: any) {
    const res = await apiClient.put(`/api/marketplace/farmer/listings/${id}/`, data);
    return res.data;
  },

  async deleteFarmerListing(id: number) {
    await apiClient.delete(`/api/marketplace/farmer/listings/${id}/`);
  },

  // --- Conversations ---
  async getConversations() {
    const res = await apiClient.get("/api/marketplace/conversations/");
    return res.data;
  },

  async initiateConversation(payload: {
    listing_id: number;
    initial_message: string;
  }) {
    const res = await apiClient.post("/api/marketplace/conversations/", payload);
    return res.data;
  },

  async getMessages(convoId: number) {
    const res = await apiClient.get(`/api/marketplace/conversations/${convoId}/messages/`);
    return res.data;
  },

  async sendMessage(convoId: number, data: SendMessageInput) {
    const res = await apiClient.post(`/api/marketplace/conversations/${convoId}/send-message/`, {
      data,
    });
    return res.data;
  },

  // --- Purchase Order ---
  async initiatePurchase(listingId: number, quantity: number) {
    const res = await apiClient.post(`/api/marketplace/listings/${listingId}/purchase/`, {
      quantity,
    });
    return res.data;
  },
};
