import Image from "next/image";
import Link from "next/link";

import type { PathItem } from "@/lib/types";

interface ItemListProps {
  items: PathItem[];
}

export const ItemList = ({ items }: ItemListProps) => (
  <ul>
    {items.length > 0 ? (
      items.map((item) => (
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
              {(item.views ?? 0) > 0 && (
                <p>{new Intl.NumberFormat().format(item.views ?? 0)} views</p>
              )}
            </div>
          </Link>
        </li>
      ))
    ) : (
      <li className="empty">
        <h3>Oops! Nothing here.</h3>
        <p>Try loosening up those search criteria!</p>
      </li>
    )}
  </ul>
);
