import { useState, useEffect, useCallback } from 'react';
import {
  apiService,
  type Product,
  type ProductDetail,
  type ProductFilter,
  type ProductsResponse,
} from '../services/api';

export const useProducts = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]); // Displayed products (filtered & paginated)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 8,
    totalPages: 1,
  });

  const [currentFilter, setCurrentFilter] = useState<ProductFilter>({});

  // 1. Fetch ALL products on mount
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Fetch effectively "all" by setting a large limit.
      // Adjust limit if dataset grows significantly.
      const response: ProductsResponse = await apiService.getProducts({
        limit: 1000, 
        page: 1,
      });

      setAllProducts(response.products);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch products'
      );
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. filtering & Pagination Effect
  useEffect(() => {
    let result = [...allProducts];

    // Filter: Search
    if (currentFilter.search) {
      const query = currentFilter.search.toLowerCase();
      result = result.filter((p) =>
        [p.name, p.type, p.genus, p.description]
          .filter(Boolean)
          .some((field) => field?.toLowerCase().includes(query))
      );
    }

    // Filter: Genus
    if (currentFilter.genus) {
      const query = currentFilter.genus.toLowerCase();
      result = result.filter((p) => {
         // Loose match for genus to handle data inconsistencies
         return p.genus?.toLowerCase().includes(query) || 
                p.manufacturer?.toLowerCase().includes(query);
      });
    }

    // Filter: Category
    if (currentFilter.category) {
       const query = currentFilter.category.toLowerCase();
       /* 
          Mapping: "sirop" -> "Siroplar" logic or simply contains.
          Data has "Siroplar", "Kapsulalar" etc.
       */
       result = result.filter(p => p.type?.toLowerCase().includes(query));
    }

    const total = result.length;
    const limit = currentFilter.limit || 8;
    const page = currentFilter.page || 1;
    const totalPages = Math.ceil(total / limit);

    // Update Pagination State
    setPagination({
      total,
      page,
      limit,
      totalPages,
    });

    // Slice for Pagination
    const startIndex = (page - 1) * limit;
    const sliced = result.slice(startIndex, startIndex + limit);

    setProducts(sliced);

  }, [allProducts, currentFilter]);


  const updateFilter = useCallback(
    async (newFilterPartial: ProductFilter) => {
      // Just update state, effect will handle logic
      setCurrentFilter(prev => {
         const merged = { ...prev, ...newFilterPartial };
         // Reset to page 1 if filtering criteria (not page) changes
         if (newFilterPartial.search !== undefined || newFilterPartial.genus !== undefined || newFilterPartial.category !== undefined) {
             merged.page = 1;
         }
         
         // Clean undefined
         (Object.keys(merged) as (keyof ProductFilter)[]).forEach(key => {
            if (merged[key] === undefined) delete merged[key];
         });
         
         return merged;
      });
    },
    []
  );

  const loadMoreProducts = useCallback(async () => {
    setCurrentFilter(prev => ({
        ...prev,
        limit: (prev.limit || 8) + 8 // Simply show more on current page view logic, or standard pagination?
        // Standard "Load More" usually implies appending.
        // But with our slice logic, increasing limit works to show "more".
        // Or if we want standard pages:
        // page: (prev.page || 1) + 1 
        // But the UI seems to expect "appending"?
        // The original loadMoreProducts implementation APPENDED results to state.
        
        // Let's stick to "Showing First N items" approach for infinite scroll feel if that's what `limit` increase does.
        // OR better: keep page 1, increase limit.
    }));
  }, []);

  // Helpers mapping to updateFilter for backward compatibility/ease
  const searchProducts = useCallback((query: string) => updateFilter({ search: query }), [updateFilter]);
  
  // Note: These are now effectively "select filter"
  const clearFilters = useCallback(() => setCurrentFilter({}), []);

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
    updateFilter,
    clearFilters,
    currentFilter,
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
      setError(
        err instanceof Error ? err.message : 'Failed to fetch product details'
      );
      console.error('Error fetching product details:', err);
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
