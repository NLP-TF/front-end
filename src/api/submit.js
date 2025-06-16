import instance from "./instance";

export const submitResponse = async (
  sessionId,
  userResponse,
  roundNumber,
  situation
) => {
  try {
    const response = await instance.post("/api/v1/game/submit", {
      session_id: sessionId,
      user_response: userResponse,
      round_number: roundNumber,
      situation: situation,
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting response:", error);
    throw error;
  }
};
