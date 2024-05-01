import { endOfDay, format } from "date-fns";

const API_BASE_URL = "https://plausible.io/api/v1/stats/aggregate";
const API_KEY = process.env.PLAUSIBLE_API_KEY;

class APIError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "APIError";
    this.status = status;
  }
}

function buildURL(id) {
  const today = format(endOfDay(new Date()), "yyyy-MM-dd");
  return `${API_BASE_URL}?site_id=draculatheme.com&filters=event:page==/${id}&period=custom&date=2023-10-19,${today}&metrics=pageviews`;
}

export async function getData(id) {
  if (!API_KEY) {
    throw new Error("API key is missing");
  }

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${API_KEY}`);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
    next: { revalidate: 3600 }
  };

  try {
    const response = await fetch(buildURL(id), requestOptions);

    if (!response.ok) {
      throw new APIError(
        `Error fetching data: ${response.statusText}`,
        response.status
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
