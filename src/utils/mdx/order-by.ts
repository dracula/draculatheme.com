export const orderBy = <T extends Record<string, unknown>>(
  array: T[],
  keys: string[]
): T[] => {
  const getValue = (obj: unknown, path: string): unknown => {
    return path.split(".").reduce((acc: unknown, key: string) => {
      if (typeof acc === "object" && acc !== null && key in acc) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, obj);
  };

  return array.sort((a, b) => {
    for (const key of keys) {
      const valueA = getValue(a, key);
      const valueB = getValue(b, key);

      if (typeof valueA === "string" && typeof valueB === "string") {
        if (valueA < valueB) {
          return 1;
        }

        if (valueA > valueB) {
          return -1;
        }
      }

      if (typeof valueA === "number" && typeof valueB === "number") {
        if (valueA < valueB) {
          return 1;
        }

        if (valueA > valueB) {
          return -1;
        }
      }
    }

    return 0;
  });
};
