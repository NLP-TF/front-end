import instance from "./instance";

export const getGameSummary = async (sessionId) => {
  try {
    const response = await instance.get(`/api/v1/game/summary/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching game summary:", error);
    throw error;
  }
};
