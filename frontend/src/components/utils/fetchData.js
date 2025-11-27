export async function FetchData(endpoint) {
  try {
    const res = await fetch(`https://openlibrary.org/${endpoint}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${endpoint} (Status: ${res.status})`);
    }
    return await res.json();
  } catch (error) {
    console.error("FetchData error:", error);
    throw error;
  }
}
