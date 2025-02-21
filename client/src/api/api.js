import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const shortenUrl = async (longUrl) => {
  try {
    const response = await axios.post(`${BASE_URL}/shorten`, { longUrl });
    return response.data;
  } catch (error) {
    console.error("Error shortening URL:", error);
    return { error: "Something went wrong!" };
  }
};

export const getAnalytics = async (shortCode) => {
  try {
    const response = await axios.get(`${BASE_URL}/analytics/${shortCode}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return { error: "No analytics found!" };
  }
};
