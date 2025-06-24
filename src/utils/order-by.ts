export const orderBy = <T extends Record<string, unknown>>(
  array: T[],
  keys: string[]
): T[] => {
  return array.sort((a, b) => {
    for (const key of keys) {
      const valueA = a[key] as string | number;
      const valueB = b[key] as string | number;

      if (valueA < valueB) return 1;
      if (valueA > valueB) return -1;
    }

    return 0;
  });
};
