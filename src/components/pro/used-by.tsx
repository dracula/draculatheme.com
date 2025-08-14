import Image from "next/image";

import { companies } from "@/lib/pro/companies";

export const UsedBy = () => (
  <div className="used-by">
    <h2>Used by software engineers from:</h2>
    <ul className="logos-cloud">
      {companies.map((company) => (
        <li key={company.id}>
          <a href={company.href} target="_blank" rel="noopener noreferrer">
            <Image
              src={company.src}
              width={100}
              height={100}
              alt={`${company.alt} Logo`}
            />
            <span className="sr-only">{company.alt}</span>
          </a>
        </li>
      ))}
    </ul>
  </div>
);
