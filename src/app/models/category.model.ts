import { Product } from "./product.model";

export interface Category {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    products: Product[];
  }
  