import type { ImageProps as NextImageProps } from "next/image";
import NextImage from "next/image";

interface RepositoryContext {
  repo: string;
  branch: string;
}

interface CustomImageProps extends Omit<NextImageProps, "src"> {
  src?: string;
  showCaption?: boolean;
}

const isExternalUrl = (value: string) =>
  /^([a-z][a-z0-9+.-]*:)?\/\//i.test(value);

const normalizePath = (value: string) =>
  value.replace(/^(\.\/)+/, "").replace(/^\/+/, "");

const buildRawGithubUrl = (path: string, context: RepositoryContext) =>
  `https://raw.githubusercontent.com/dracula/${context.repo}/${context.branch}/${normalizePath(path)}`;

const toRawGithubUrl = (value: string): string => {
  try {
    const url = new URL(value);

    if (url.hostname !== "github.com") {
      return value;
    }

    const segments = url.pathname.split("/").filter(Boolean);
    const blobIndex = segments.indexOf("blob");

    if (blobIndex === -1 || blobIndex < 2) {
      return value;
    }

    const owner = segments[0];
    const repo = segments[1];
    const branchAndPath = segments.slice(blobIndex + 1).join("/");

    if (!owner || !repo || branchAndPath.length === 0) {
      return value;
    }

    return `https://raw.githubusercontent.com/${owner}/${repo}/${branchAndPath}`;
  } catch {
    return value;
  }
};

const resolveImageSrc = (
  src: string | undefined,
  context?: RepositoryContext
): string | undefined => {
  if (!src) {
    return src;
  }

  const normalizedSrc =
    src.startsWith("https://github.com/") || src.startsWith("http://github.com/")
      ? toRawGithubUrl(src)
      : src;

  if (!context) {
    return normalizedSrc;
  }

  if (
    isExternalUrl(normalizedSrc) ||
    normalizedSrc.startsWith("data:") ||
    normalizedSrc.startsWith("blob:")
  ) {
    return normalizedSrc;
  }

  return buildRawGithubUrl(normalizedSrc, context);
};

interface CreateImageComponentOptions {
  repositoryContext?: RepositoryContext;
}

export const createImageComponent = ({
  repositoryContext
}: CreateImageComponentOptions) => {
  const Image = ({
    showCaption = false,
    src,
    alt,
    ...props
  }: CustomImageProps) => {
    const resolvedSrc = resolveImageSrc(src, repositoryContext);

    if (!resolvedSrc) {
      return null;
    }

    return (
      <figure>
        <NextImage
          {...props}
          src={resolvedSrc}
          width={props.width ?? 1200}
          height={props.height ?? 678}
          alt={alt ?? ""}
          sizes={props.sizes ?? "(max-width: 1200px) 100vw, 1200px"}
          quality={props.quality ?? 80}
        />
        {showCaption && alt && <figcaption>{alt}</figcaption>}
      </figure>
    );
  };

  Image.displayName = "MdxImage";

  return Image;
};
