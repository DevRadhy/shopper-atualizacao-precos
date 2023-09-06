import { Request, Response } from "express";
import { ReadCSV } from "../utils/ReadCSV";
import FindProductByCode from "../services/FindProductByCode";
import { AppError } from "../errors/AppError";

export default class ValidateController {
  constructor(
    private findProductByCode: FindProductByCode,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    if(!file) {
      throw new AppError("File not found");
    };

    const { buffer } = file;

    const readCSV = await ReadCSV(buffer);

    const rawProducts = readCSV.products;

    const products = await Promise.all(rawProducts.map(async ({ code, new_price }) => {
      // os códigos de produtos informados existem
      const product = await this.findProductByCode.execute(code);

      // o preço de venda é maior que o preço de custo
      if(new_price < product.cost_price) {
        throw new AppError("Sales price must be greater than cost price.");
      };

      // o reajuste de preço é menor ou igual à 10%
      const percentage = (new_price - product.sales_price) / product.sales_price * 100;

      if(Math.abs(percentage) > 10) {
        throw new AppError("Price readjustment must be less than or equal to 10%.");
      }

      return {
        code: product.code,
        name: product.name,
        price: product.sales_price,
        new_price: new_price,
      };
    }));

    return response.json(products);
  }
}