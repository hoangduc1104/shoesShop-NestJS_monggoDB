export interface UpdateCartDTO {
  products: {
    product: string;
    quantity: number;
    color: string;
    size: string;
  };
}
