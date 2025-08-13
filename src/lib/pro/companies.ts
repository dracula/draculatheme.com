const companyNames = [
  "amazon",
  "amd",
  "apple",
  "google",
  "ibm",
  "meta",
  "microsoft",
  "netflix",
  "nvidia",
  "oracle",
  "qualcomm",
  "salesforce",
  "samsung",
  "tencent"
];

export const companies = companyNames
  .sort((a, b) => a.localeCompare(b))
  .map((name) => ({
    id: name,
    href: `https://${name}.com`,
    src: `/images/pro/companys/${name}.svg`,
    alt: name.charAt(0).toUpperCase() + name.slice(1)
  }));
