import Product from "../entities/Product";

export abstract class PacksRepository {
  abstract findPacksByProductCode(code: number): Promise<Product[]>;
  abstract findProductByCode(code: number): Promise<Product[]>;
  abstract update(code: number, products: Product[]): Promise<void>;
}