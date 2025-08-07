import {useState, useEffect, useCallback} from 'react';
import { farmerProductService } from '@/lib/api/farmerproduct';
import { ApiFilters, FarmerProduct } from '@/lib/types/farmertypes';

export function useFarmerProducts(filters?: ApiFilters) {
  const [products, setProducts] = useState<FarmerProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await farmerProductService.getFarmerProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}

//Farmer Products Hook with Filters
export function useFilteredFarmerProducts(filters?: ApiFilters) {
  const [products, setProducts] = useState<FarmerProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFilteredProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await farmerProductService.getFarmerProducts();
      // Apply filters if provided
      const filteredData = filters
        ? data.filter(product => {
            return Object.keys(filters).every(key => 
              product[key as keyof FarmerProduct] === filters[key as keyof ApiFilters]
            );
          })
        : data;
      setProducts(filteredData);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchFilteredProducts();
  }, [fetchFilteredProducts]);

  return { products, loading, error, refetch: fetchFilteredProducts };
}

//Add New Farmer Product Hook
export function useCreateFarmerProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProduct = async (data: Omit<FarmerProduct, 'image'> & { image: File }) => {
    try {
      setLoading(true);
      setError(null);
      const newProduct = await farmerProductService.createFarmerProduct(data);
      return newProduct;
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'An error occurred');
      throw err; // Re-throw to handle in component
    } finally {
      setLoading(false);
    }
  };

  return { createProduct, loading, error };
}

//Update Farmer Product Prices Hook
export function useUpdateFarmerProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProduct = async (name: string, data: Omit<FarmerProduct, 'image'> & { image?: File | null }) => {
    try {
      setLoading(true);
      setError(null);
      // Ensure image is never undefined
      const dataWithImage: typeof data & { image: File | null } = {
        ...data,
        image: data.image !== undefined ? data.image : null,
      };
      const updatedProduct = await farmerProductService.updateFarmerProduct(name, dataWithImage);
      return updatedProduct;
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'An error occurred');
      throw err; // Re-throw to handle in component
    } finally {
      setLoading(false);
    }
  };

  return { updateProduct, loading, error };
}

//Delete Farmer Product Hook
export function useDeleteFarmerProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteProduct = async (name: string) => {
    try {
      setLoading(true);
      setError(null);
      await farmerProductService.deleteFarmerProduct(name);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'An error occurred');
      throw err; // Re-throw to handle in component
    } finally {
      setLoading(false);
    }
  };

  return { deleteProduct, loading, error };
}