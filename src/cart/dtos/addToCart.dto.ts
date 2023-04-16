export interface AddToCartDTO {
  products: {
    product: string;
    quantity: number;
    color: string;
    size: string;
  };
}
