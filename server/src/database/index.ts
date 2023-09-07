import { PrismaClient } from "@prisma/client";
import ProductPrismaRepository from "./prisma/ProductPrismaRepository";

const prisma = new PrismaClient();
const productPrismaRepository = new ProductPrismaRepository(prisma);

export { productPrismaRepository };