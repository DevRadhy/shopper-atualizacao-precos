import { PrismaClient } from "@prisma/client";
import { ProductRepository } from "../../repositories/ProductRepository";
import Product from "../../entities/Product";
import { AppError } from "../../errors/AppError";

export default class ProductPrismaRepository implements ProductRepository {
  constructor (
    private prisma: PrismaClient,
  ) {}

  find(): Promise<Product[]> {
    throw new AppError("Method not implemented.");
  }

  async findOne(id: number): Promise<Product | null> {
    const product = await this.prisma.products.findUnique({
      where: {
        code: id,
      },
    });

    if(!product) {
      return null;
    };

    return new Product({
      code: Number(product.code),
      name: product.name,
      cost_price: Number(product.cost_price),
      sales_price: Number(product.sales_price),
    });
  }

  update(id: number, product: Product): Promise<Product> {
    throw new AppError("Method not implemented.");
  }
}