// src/api/start.js
import api from "./instance";

export const startGame = async (nickname, userType) => {
  try {
    const response = await api.post("/api/v1/game/start", {
      nickname,
      user_type: userType,
    });
    return response.data;
  } catch (error) {
    console.error("Error starting game:", error);
    throw error;
  }
};
