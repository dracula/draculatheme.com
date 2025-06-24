import type { paths } from "./paths";

export type Props<T = Record<string, string>> = { params: Promise<T> };

export type PathItem = (typeof paths)[number];
