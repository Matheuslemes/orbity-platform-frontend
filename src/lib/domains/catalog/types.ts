export type Product = {

  id: string; slug: string; sku: string;
  name: string; brand?: string;
  images: string[];
  highlights?: string[];
  price: { current: number; original?: number; currency: "BRL" };
  rating?: { average: number; count: number };
  specs?: Record<string,string>;
  
}

export type SearchResponse = {

  items: Product[];
  page: number; pageSize: number; total: number;

}