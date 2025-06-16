// src/api/round.js
import api from "./instance";

/**
 * Get round information for a specific game session and round number
 * @param {string} sessionId - The game session ID
 * @param {number} roundNumber - The round number (1-5)
 * @returns {Promise<Object>} The round data
 */
export const getRound = async (sessionId, roundNumber) => {
  try {
    const response = await api.get(
      `/api/v1/game/round/${sessionId}/${roundNumber}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error getting round ${roundNumber}:`, error);
    throw error;
  }
};
