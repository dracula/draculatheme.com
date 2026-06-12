const screenshotImageExtensions = [".png", ".jpg", ".jpeg", ".webp", ".gif"];

type GithubContentItem = {
  type: string;
  name: string;
  download_url: string | null;
};

const isScreenshotImage = (fileName: string): boolean =>
  screenshotImageExtensions.some((extension) =>
    fileName.toLowerCase().endsWith(extension)
  );

const fetchGithubDirectoryContents = async (
  repository: string,
  directoryPath: string,
  branch: string
): Promise<GithubContentItem[]> => {
  const accessToken = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
  const response = await fetch(
    `https://api.github.com/repos/dracula/${repository}/contents/${directoryPath}?ref=${encodeURIComponent(branch)}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "draculatheme.com",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
      },
      next: { revalidate: 3600 }
    }
  );

  if (!response.ok) {
    return [];
  }

  const payload: unknown = await response.json();

  if (!Array.isArray(payload)) {
    return [];
  }

  return payload as GithubContentItem[];
};

const getScreenshotFolderImages = async (
  repository: string,
  branch: string
): Promise<string[]> => {
  const directoryContents = await fetchGithubDirectoryContents(
    repository,
    "screenshot",
    branch
  );

  return directoryContents
    .filter(
      (item) =>
        item.type === "file" &&
        isScreenshotImage(item.name) &&
        typeof item.download_url === "string"
    )
    .sort((firstItem, secondItem) =>
      firstItem.name.localeCompare(secondItem.name)
    )
    .map((item) => item.download_url as string);
};

const hasRootScreenshot = async (
  repository: string,
  branch: string
): Promise<boolean> => {
  const rootScreenshotUrl = `https://raw.githubusercontent.com/dracula/${repository}/${branch}/screenshot.png`;

  const response = await fetch(rootScreenshotUrl, {
    method: "HEAD",
    redirect: "follow",
    next: { revalidate: 3600 }
  }).catch(() => null);

  return response != null && response.ok;
};

export const getThemeScreenshots = async (
  repository: string,
  branch: string
): Promise<string[]> => {
  const screenshotFolderImages = await getScreenshotFolderImages(
    repository,
    branch
  );

  if (screenshotFolderImages.length > 0) {
    return screenshotFolderImages;
  }

  const rootScreenshotExists = await hasRootScreenshot(repository, branch);

  if (rootScreenshotExists) {
    return [
      `https://raw.githubusercontent.com/dracula/${repository}/${branch}/screenshot.png`
    ];
  }

  return ["/images/dracula.webp"];
};
