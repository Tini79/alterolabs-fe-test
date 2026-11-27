import "server-only";

export class ApiRequestError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
  }
}

export function getApiBaseUrl(): string {
  const baseUrl = process.env.DUMMYJSON_BASE_URL;

  if (!baseUrl) {
    throw new ApiRequestError("DUMMYJSON_BASE_URL is not configured.");
  }

  return baseUrl.replace(/\/$/, "");
}

export async function apiRequest<T>(
  path: string,
  searchParams?: Record<string, string | number | undefined>,
): Promise<T> {
  const url = new URL(`${getApiBaseUrl()}${path}`);

  Object.entries(searchParams ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  let response: Response;

  try {
    response = await fetch(url, {
      cache: "no-store",
    });
  } catch (error) {
    throw new ApiRequestError(
      error instanceof Error ? `Could not reach the product API: ${error.message}` : "Could not reach the product API.",
    );
  }

  if (!response.ok) {
    throw new ApiRequestError(
      `Product API request failed with status ${response.status}.`,
      response.status,
    );
  }

  try {
    return await response.json() as T;
  } catch {
    throw new ApiRequestError("Product API returned invalid JSON.");
  }
}
