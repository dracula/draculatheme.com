import Link from "next/link";
import React from "react";

import type { PathItem } from "@/lib/types";

interface ItemListProps {
  items: PathItem[];
}

export const ItemList = ({ items }: ItemListProps) => (
  <ul>
    {items.map((item) => (
      <li key={item.repo}>
        <Link href={`/${item.repo}`}>
          <h3>{item.title}</h3>
        </Link>
      </li>
    ))}
  </ul>
);
