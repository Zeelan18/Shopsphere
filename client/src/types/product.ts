export interface Product {
  id: string;
  seller_id?: string;

  name: string;
  description: string;

  price: number;
  stock: number;

  category: string;
  image_url: string;

  rating?: number;

  created_at?: string;
}