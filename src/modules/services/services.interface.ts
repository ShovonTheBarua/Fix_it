export interface services {
  title: string;
  categoryId: string;
  description: string;
  price: number;
}
export interface IPostQuery {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  search?: string;
}
