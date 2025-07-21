
import apiClient from '../axios';
import { FarmerProduct, FarmerProductInput } from '../types';

export const farmerProductService = {
  // Farmer Products
  async getFarmerProducts(): Promise<FarmerProduct[]> {
    const response = await apiClient.get('/api/ussd-web/farmer/products/');
    return response.data;
  },

  //Adds New Farmer Product
  async createFarmerProduct(data: FarmerProductInput): Promise<FarmerProduct> {
    const response = await apiClient.post('/api/ussd-web/farmer/products/', data);
    return response.data;
  },

  //Update Farmer Product Prices 
  async updateFarmerProduct(name: string, data: FarmerProductInput): Promise<FarmerProduct> {
    const response = await apiClient.put(`/api/ussd-web/farmer/products/update-price/${name}/`, data);
    return response.data;
  },

  //Delete Farmer Product
  async deleteFarmerProduct(name: string): Promise<void> {
    await apiClient.delete(`/api/ussd-web/farmer/products/remove/${name}/`);
  }
};