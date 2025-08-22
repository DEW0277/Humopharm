import { useState, useEffect, useCallback } from "react";
import {
  apiService,
  type Product,
  type ProductDetail,
  type ProductFilter,
  type ProductsResponse,
} from "../services/api";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 8,
    totalPages: 1,
  });

  const fetchProducts = useCallback(
    async (filter: ProductFilter = {}) => {
      try {
        setLoading(true);
        setError(null);

        const limit = filter.limit ?? pagination?.limit ?? 8;
        const page = filter.page ?? pagination?.page ?? 1;

        const response: ProductsResponse = await apiService.getProducts({
          ...filter,
          limit,
          page,
        });
        console.log(response);

        setProducts(response.products);
        setPagination(response.pagination);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    },
    [pagination]
  );

  const loadMoreProducts = useCallback(async () => {
    try {
      setLoading(true);

      const nextPage = (pagination?.page ?? 1) + 1;
      const limit = pagination?.limit ?? 8;

      const response: ProductsResponse = await apiService.getProducts({
        page: nextPage,
        limit,
      });

      setProducts(prev => [...prev, ...response.products]);
      setPagination(response.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load more products");
      console.error("Error loading more products:", err);
    } finally {
      setLoading(false);
    }
  }, [pagination]);

  const searchProducts = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        await fetchProducts();
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await apiService.searchProducts(query);
        setProducts(response.products);
        setPagination({
          total: response.total,
          page: 1,
          limit: response.total,
          totalPages: 1,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to search products");
        console.error("Error searching products:", err);
      } finally {
        setLoading(false);
      }
    },
    [fetchProducts]
  );

  const filterByGenus = useCallback(
    async (genus: string) => {
      await fetchProducts({ genus, page: 1 });
    },
    [fetchProducts]
  );

  const filterByCategory = useCallback(
    async (category: string) => {
      await fetchProducts({ category, page: 1 });
    },
    [fetchProducts]
  );

  const clearFilters = useCallback(async () => {
    await fetchProducts({ page: 1 });
  }, [fetchProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    pagination,
    fetchProducts,
    loadMoreProducts,
    searchProducts,
    filterByGenus,
    filterByCategory,
    clearFilters,
  };
};

export const useProductDetails = (productId: number) => {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProductDetails = useCallback(async () => {
    if (!productId) return;

    try {
      setLoading(true);
      setError(null);

      const productDetails = await apiService.getProductDetailsById(productId);
      setProduct(productDetails);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch product details");
      console.error("Error fetching product details:", err);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  return {
    product,
    loading,
    error,
    refetch: fetchProductDetails,
  };
};
