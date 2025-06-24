import Image from "next/image";
import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";

import Hero from "@/components/shared/hero";
import { CustomMDX } from "@/components/shared/mdx";
import { paths } from "@/lib/paths";
import type { Props } from "@/lib/types";
import { fetcher } from "@/utils/fetcher";

export const generateStaticParams = async () => {
  return paths.map((item) => ({
    theme: item.repo
  }));
};

const ThemePage = async (props: Props) => {
  const params = await props.params;
  const theme = paths.find((item) => item.repo === params.theme);

  if (!theme) {
    notFound();
  }

  const branchData = await fetcher(`/api/branches?id=${theme.repo}`);
  const branch = branchData.branches || "main";

  const contributorsData = await fetcher(`/api/contributors?id=${theme.repo}`);
  const contributors = [...JSON.parse(contributorsData.contributors)];

  const installsResponse = await fetcher(`/api/installs?id=${theme.repo}`);
  const decodedBuffer = Buffer.from(installsResponse.install, "base64");
  const installsContent = decodedBuffer.toString("utf8");
  const serializedMdx = await serialize(installsContent);

  return (
    <>
      <Hero />
      <section className="container">
        <div>
          <Image
            src={`https://raw.githubusercontent.com/dracula/${theme.repo}/master/screenshot.png`}
            alt={`${theme.repo} - Theme Preview`}
            quality={100}
            width={800}
            height={800}
          />
        </div>
        <CustomMDX {...serializedMdx} />
        <aside>
          <a
            href={`https://github.com/dracula/${theme.repo}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View source code
          </a>
          <a
            href={`https://github.com/dracula/${theme.repo}/archive/refs/heads/${branch}.zip`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download ZIP file
          </a>
          <a
            href={`https://github.com/dracula/${theme.repo}/issues/new`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Report an issue
          </a>
          <a
            href={`https://github.com/dracula/${theme.repo}/edit/${branch}/README.md`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Edit this page
          </a>
          <p>Contributors</p>
          <ul>
            {contributors.map((contributor) => (
              <li key={contributor.login}>
                <a
                  href={`https://github.com/${contributor.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    {contributor.avatar_url && (
                      <Image
                        src={contributor.avatar_url}
                        width={24}
                        height={24}
                        alt={contributor.login}
                      />
                    )}
                  </div>
                  <span>{contributor.login}</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </>
  );
};

export default ThemePage;
