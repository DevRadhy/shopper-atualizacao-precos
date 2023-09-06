import { AppError } from "../errors/AppError";
import { ProductRepository } from "../repositories/ProductRepository";

export default class FindProductByCode {
  constructor (
    private productRepository: ProductRepository,
  ) {}

  async execute(code: number) {
    const product = await this.productRepository.findOne(code);

    if(!product) {
      throw new AppError("Product does not exist.");
    };

    return product;
  }
}