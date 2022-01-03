export interface Products {
  id: string;
  name: string;
  brand: string;
  price: number;
  status: ProductStatus;
}

export enum ProductStatus {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
}