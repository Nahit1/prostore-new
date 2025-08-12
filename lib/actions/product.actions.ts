"use server";
import { convertToPlainObject } from "@/lib/utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { prisma } from "@/db/prisma";
import { Product } from "@/types";

export async function getLatestProducts() {
  // const data = await prisma.product.findMany({
  //   take: LATEST_PRODUCTS_LIMIT,
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  // });

  const products: Product[] = (
    await prisma.product.findMany({
      take: LATEST_PRODUCTS_LIMIT,
      orderBy: { createdAt: "desc" },
    })
  ).map((p) => ({
    ...p,
    price: p.price.toString(),
    rating: p.rating.toString(),
  }));

  return convertToPlainObject(products);
}

// Get single product by it's slug
export async function getProductBySlug(slug: string) {
  const data = await prisma.product.findFirst({
    where: {
      slug,
    },
  });

  return convertToPlainObject(data);
}
