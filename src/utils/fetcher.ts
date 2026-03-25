import { getBasePath } from "@/utils/environment";

export const fetcher = async (
  url: string,
  method = "GET",
  props?: RequestInit,
  basePath?: string
) => {
  try {
    const baseUrl = basePath !== undefined ? basePath : getBasePath();
    const response = await fetch(baseUrl + url, {
      method: method,
      ...props
    });
    const contentType = response.headers.get("content-type") ?? "";
    const isJsonResponse = contentType.includes("application/json");
    const responseText = await response.text();
    const data = isJsonResponse ? JSON.parse(responseText) : null;

    if (!response.ok) {
      return {
        status: "error",
        message:
          (data as { message?: string } | null)?.message ||
          responseText ||
          `Server responded with ${response.status}: ${response.statusText}`
      };
    }

    if (!data || typeof data !== "object") {
      return {
        status: "error",
        message: `Invalid response format (${contentType || "unknown"})`
      };
    }

    return { ...data, status: response.status };
  } catch (error: unknown) {
    console.error(`Failed to fetch data from ${url}:`, error);

    return {
      status: "error",
      message: error instanceof Error ? error.message : String(error)
    };
  }
};
