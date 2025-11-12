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

const resolveImageSrc = (
  src: string | undefined,
  context?: RepositoryContext
): string | undefined => {
  if (!src) {
    return src;
  }

  if (!context) {
    return src;
  }

  if (
    isExternalUrl(src) ||
    src.startsWith("data:") ||
    src.startsWith("blob:")
  ) {
    return src;
  }

  return buildRawGithubUrl(src, context);
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
