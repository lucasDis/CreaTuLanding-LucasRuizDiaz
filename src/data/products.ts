export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    thumbnail: string;
    images?: string[];
    brand?: string;
    rating?: number;
    stock?: number;
    discountPercentage?: number;
    reviews?: Array<{
        rating: number;
        comment: string;
        date: string;
        reviewerName: string;
        reviewerEmail: string;
    }>;
}

const API_BASE_URL = 'https://dummyjson.com';

export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/products?limit=100`);
        if (!response.ok) {
            throw new Error('Error al cargar productos');
        }
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/category/${categoryId}`);
        if (!response.ok) {
            throw new Error('Error al cargar productos de la categoría');
        }
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw error;
    }
};

export const getProductById = async (id: number): Promise<Product | undefined> => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!response.ok) {
            throw new Error('Error al cargar el producto');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product by id:', error);
        throw error;
    }
};

export interface Category {
    slug: string;
    name: string;
    url: string;
}

export const getCategories = async (): Promise<Category[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/categories`);
        if (!response.ok) {
            throw new Error('Error al cargar categorías');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};
