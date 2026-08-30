import { redis } from "@/lib/redis";
import { findProductConfigByCatalogId } from "@/lib/shop/products";
import type { Product } from "@/lib/types";

const isProduct = (value: unknown): value is Product => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const product = value as Record<string, unknown>;

  return typeof product.id === "string" && typeof product.name === "string";
};

const parseProducts = (rawValue: string): Record<string, Product> => {
  try {
    const parsedValue: unknown = JSON.parse(rawValue);

    if (typeof parsedValue !== "object" || parsedValue === null) {
      return {};
    }

    const productsById: Record<string, Product> = {};

    for (const [id, product] of Object.entries(parsedValue)) {
      if (isProduct(product)) {
        productsById[id] = product;
      }
    }

    return productsById;
  } catch {
    return {};
  }
};

export const findStoredProduct = (
  storedProducts: Product[],
  catalogId: string
): Product | null => {
  const catalogEntry = findProductConfigByCatalogId(catalogId);

  return (
    storedProducts.find((product) => {
      if (product.id === catalogId || product.custom_permalink === catalogId) {
        return true;
      }

      if (!catalogEntry) {
        return false;
      }

      return (
        product.custom_permalink === catalogEntry.params.slug ||
        product.id === catalogEntry.params.gumroadId
      );
    }) ?? null
  );
};

export const getProducts = async (): Promise<Product[]> => {
  const storedValue = await redis.get("products");

  if (!storedValue) {
    return [];
  }

  return Object.values(parseProducts(storedValue));
};

export const getProduct = async (id: string): Promise<Product | null> => {
  const storedValue = await redis.get("products");

  if (!storedValue) {
    return null;
  }

  const productsById = parseProducts(storedValue);

  if (productsById[id]) {
    return productsById[id];
  }

  return findStoredProduct(Object.values(productsById), id);
};
