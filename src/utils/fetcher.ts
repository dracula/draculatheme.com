import { getBasePath } from "@/lib/environment";

export const fetcher = async (
  url: string,
  method = "GET",
  props?: RequestInit
) => {
  try {
    const response = await fetch(getBasePath() + url, {
      method: method,
      ...props
    });

    if (!response.ok) {
      throw new Error(
        `Server responded with ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();

    return { ...data, status: response.status };
  } catch (error: unknown) {
    console.error(`Failed to fetch data from ${url}:`, error);
    return {
      status: "error",
      message: error instanceof Error ? error.message : String(error)
    };
  }
};
