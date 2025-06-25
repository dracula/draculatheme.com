import Link from "next/link";
import React from "react";

import type { PathItem } from "@/lib/types";

interface ItemListProps {
  items: PathItem[];
}

export const ItemList = ({ items }: ItemListProps) => (
  <ul>
    {items.map((item, index) => (
      <li
        key={item.repo}
        style={{
          transitionDelay: `${index * 100}ms`
        }}
      >
        <Link href={`/${item.repo}`}>
          <h3>{item.title}</h3>
        </Link>
      </li>
    ))}
  </ul>
);
