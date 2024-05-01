const fetchData = async (url, method = "GET") => {
  try {
    const response = await fetch(url, {
      method: method,
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(
        `Server responded with ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();

    return {
      ...data,
      status: response.status
    };
  } catch (error) {
    console.error(`Failed to fetch data from ${url}:`, error);
    return {
      status: "error",
      message: error.message
    };
  }
};

export default fetchData;
