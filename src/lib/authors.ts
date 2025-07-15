export interface Author {
  id: string;
  avatar: string;
  name: string;
  location: string;
  github: string;
  x?: string;
  website?: string;
  timezone: string;
}

export const authors: Author[] = [
  {
    id: "zeno",
    avatar: "https://github.com/zenorocha.png?size=100",
    name: "Zeno Rocha",
    location: "San Francisco, CA",
    github: "https://github.com/zenorocha",
    x: "https://x.com/zenorocha",
    website: "https://zenorocha.com",
    timezone: "America/Los_Angeles"
  },
  {
    id: "luxa",
    avatar: "https://github.com/luxonauta.png?size=100",
    name: "Lucas de França",
    location: "Londrina, PR",
    github: "https://github.com/luxonauta",
    x: "https://x.com/luxonauta",
    website: "https://luxonauta.com",
    timezone: "America/Brasilia"
  }
];
