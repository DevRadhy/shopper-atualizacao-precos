import Product from "../entities/Product";

export abstract class ProductRepository {
  abstract find(): Promise<Product[]>;
  abstract findOne(id: number): Promise<Product | null>;
  abstract update(id: number, product: Product): Promise<Product>;
}