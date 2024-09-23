export interface TemperatureData {
  id: number;
  value: number;
  timestamp: string;
}

const BASE_URL = "http://localhost:8000/api/v1";

export const fetchTemperatureData = async (): Promise<TemperatureData[]> => {
  try {
    const response = await fetch(`${BASE_URL}/temperature`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch temperature data");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error while fetching temperature data:", error);
    throw error;
  }
};
