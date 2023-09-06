import { Readable } from "stream";
import readline from 'readline';

export async function ReadCSV(buffer: Buffer) {
  const readableFile = new Readable();
  readableFile.push(buffer);
  readableFile.push(null);

  const productsLine = readline.createInterface({
    input: readableFile,
  });

  const lines = [];

  for await (let line of productsLine) {
    const productLineSplit = line.split(",");

    lines.push(productLineSplit);
  }

  const products = lines.slice(1, lines.length);

  const productsFormatted = products.map(product => {
    return {
      code: Number(product[0]),
      new_price: Number(product[1]),
    };
  });

  return { products: productsFormatted, headers: lines.shift() };
}