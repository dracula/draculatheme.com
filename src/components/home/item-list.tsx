import Image from "next/image";
import Link from "next/link";

import type { PathItem } from "@/lib/types";

interface ItemListProps {
  items: PathItem[];
}

export const ItemList = ({ items }: ItemListProps) => (
  <ul>
    {items.map((item) => (
      <li key={item.repo}>
        <Link href={`/${item.repo}`}>
          <div className="icon">
            <Image
              src={`/icons/${item.icon}`}
              width={200}
              height={200}
              alt={item.title}
            />
          </div>
          <div className="content">
            <h3>{item.title}</h3>
            <p>{new Intl.NumberFormat().format(item.views || 0)} views</p>
          </div>
        </Link>
      </li>
    ))}
  </ul>
);
