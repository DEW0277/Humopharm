const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductsResponse {
  products: Product[];
  pagination: PaginationInfo;
}

export interface Product {
  images: any[];
  id: number;
  name: string;
  type: string;
  image: string[];
  des: string;
  genus?: string;
  category?: string;
}

export interface ProductDetail {
  id: number;
  name: string;
  type: string;
  description: string;
  images: string[];
  sections: {
    title: string;
    content: string;
  }[];
  genus?: string;
  category?: string;
  price?: number;
  dosage?: string;
  manufacturer?: string;
  prescription?: boolean;
}

export interface ProductFilter {
  genus?: string;
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Get all products with optional filtering
  async getProducts(filter: ProductFilter = {}): Promise<ProductsResponse> {
    const params = new URLSearchParams();

    if (filter.genus) params.append("genus", filter.genus);
    if (filter.category) params.append("category", filter.category);
    if (filter.search) params.append("search", filter.search);
    if (filter.page) params.append("page", filter.page.toString());
    if (filter.limit) params.append("limit", filter.limit.toString());

    const endpoint = `/drugs`;
    return this.request<ProductsResponse>(endpoint);
  }

  // Get product by ID
  async getProductById(id: number): Promise<Product> {
    return this.request<Product>(`/products/${id}`);
  }

  // Get product details by ID
  async getProductDetailsById(id: number): Promise<ProductDetail> {
    return this.request<ProductDetail>(`/drugs/${id}`);
  }

  // Get all genera
  async getGenera(): Promise<string[]> {
    const response = await this.request<{ data: string[] }>("/products/genera/all");
    return response.data;
  }

  // Get all categories
  // async getCategories(): Promise<string[]> {
  //   const response = await this.request<{ data: string[] }>("/products/categories/all");
  //   return response.data;
  // }

  // Search products
  async searchProducts(query: string): Promise<{ products: Product[]; total: number; query: string }> {
    const response = await this.request<{
      data: { products: Product[]; total: number; query: string };
    }>(`/products/search/query?query=${encodeURIComponent(query)}`);
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService;
