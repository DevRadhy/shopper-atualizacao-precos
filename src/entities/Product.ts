export default class Product {
  code: number;
  name: string;
  cost_price: number;
  sales_price: number;

  constructor(props: Product) {
    Object.assign(this, props);
  }
}