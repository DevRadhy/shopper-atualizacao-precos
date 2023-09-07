import { productPrismaRepository } from "../database";
import FindProductByCode from "./FindProductByCode";

const findProductByCode = new FindProductByCode(productPrismaRepository);

export { findProductByCode };