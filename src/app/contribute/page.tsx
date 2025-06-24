import { fetcher } from "@/utils/fetcher";

const ContributePage = async () => {
  const contributorsData = await fetcher("/api/cache/contributors");
  const contributors = Object.values(contributorsData.contributors)
    .flatMap((repo) => JSON.parse(repo as string))
    .filter(
      (contributor, index, array) =>
        !contributor.login.includes("[bot]") &&
        array.findIndex((c) => c.login === contributor.login) === index
    );

  return (
    <section className="container">
      <h2>Readme</h2>
      <p>
        Dracula Theme is an open-source project driven by and for the community.
        Most apps that support the theme are contributions from our community.
      </p>
      <p>
        As much as the team is responsible for the core theme and wants to
        support all available applications, we simply don&apos;t have the
        capacity to do it all ourselves.
      </p>
      <p>
        That&apos;s why the community is essential for this project to keep
        evolving. Below are some guidelines, tips, and specifications for those
        who want to apply the theme to any application.
      </p>
      {contributors.length > 0 &&
        contributors.map((contributor) => (
          <p key={contributor.login}>{contributor.login}</p>
        ))}
    </section>
  );
};

export default ContributePage;
