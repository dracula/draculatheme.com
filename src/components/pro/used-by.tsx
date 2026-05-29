import Image from "next/image";

import { companies } from "@/lib/pro/companies";

export const UsedBy = () => (
  <div className="used-by">
    <h2>Trusted by creators from:</h2>
    <ul className="logos-cloud">
      {companies.map((company) => (
        <li key={company.id}>
          <a href={company.href} target="_blank" rel="noopener noreferrer">
            <Image
              src={`/images/pro/companys/black/${company.id}.svg`}
              className="logo-light-mode"
              width={100}
              height={100}
              alt={`${company.alt} Logo`}
            />
            <Image
              src={`/images/pro/companys/white/${company.id}.svg`}
              className="logo-dark-mode"
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
