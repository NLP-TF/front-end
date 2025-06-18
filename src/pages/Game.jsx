import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { getRound } from "../api/round";
import { submitResponse } from "../api/submit";
import { ClipLoader } from "react-spinners";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  display: flex;
  padding: 100px 16px 40px;
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 80px;
  padding: 20px 240px;
  background: var(--Grayscale-gray-5, #fcfcfc);
  box-shadow: 3px 6px 15.3px 2px rgba(0, 0, 0, 0.05);
  justify-content: center;
  align-items: center;
  gap: 10px;
  display: flex;

  @media (max-width: 768px) {
    padding: 20px;
    height: auto;
    flex-direction: column;
  }
`;

const HeaderContent = styled.div`
  width: 100%;
  max-width: 1440px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  display: inline-flex;
`;

const HeaderTop = styled.div`
  align-self: stretch;
  justify-content: space-between;
  align-items: center;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const Title = styled.div`
  font-size: 22px;
  font-family: Pretendard;
  font-weight: 700;
  line-height: 30.8px;
  word-wrap: break-word;
  span:nth-child(1) {
    color: var(--Main-T-100, #6c6eed);
  }
  span:nth-child(2) {
    color: var(--Grayscale-gray-100, #171717);
  }
  span:nth-child(3) {
    color: var(--Main-F-100, #f59e0c);
  }
  span:nth-child(4) {
    color: var(--Main-T-100, #6c6eed);
  }
`;

const StatusGroup = styled.div`
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  display: flex;
`;

const Status = styled.div`
  justify-content: flex-start;
  align-items: center;
  display: flex;
`;

const StatusIconWrapper = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
  overflow: hidden;
`;

const StatusText = styled.div`
  color: var(--Grayscale-gray-100, #171717);
  font-size: 18px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 24px;
  word-wrap: break-word;
`;

const StatusDivider = styled.div`
  width: 1px;
  height: 16px;
  background: var(--Grayscale-gray-30, #d6d8dc);
  margin: 0 10px;
`;

const GameBox = styled.div`
  width: 100%;
  max-width: 996px;
  min-height: 600px;
  padding: 20px;
  margin: 20px 0;
  background: var(--Grayscale-gray-5, #fcfcfc);
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);
  border-radius: 24px;
  outline: 1px var(--Grayscale-gray-20, #e9ebed) solid;
  outline-offset: -1px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  display: flex;
  overflow-y: auto;
`;

const RoundInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RoundNumber = styled.div`
  padding: 6px 32px;
  background: var(--primary);
  border-radius: 48px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  display: flex;
  color: white;
  font-size: 20px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 28px;
  align-self: flex-start;
`;

const SituationCard = styled.div`
  width: 100%;
  padding: 24px;
  background: var(--Grayscale-gray-10, #f6f6f7);
  border: 1.5px solid var(--Grayscale-gray-20, #e9ebed);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Situation = styled.div`
  color: var(--Grayscale-gray-100, #171717);
  font-size: 20px;
  font-weight: 600;
  line-height: 32px;
  font-family: "Pretendard", sans-serif;
`;

const SituationDetail = styled.div`
  color: var(--Grayscale-gray-80, #4b5563);
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  font-family: "Pretendard", sans-serif;
`;

const FriendMessageBox = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 20px;
  background: var(--Grayscale-gray-10, #f6f6f7);
  border-radius: 24px;
`;

const FriendAvatar = styled.div`
  width: 40px;
  height: 40px;
  background: var(--Grayscale-gray-20, #e9ebed);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const FriendMessage = styled.div`
  flex: 1;
  color: var(--Grayscale-gray-100, #171717);
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  font-family: "Pretendard", sans-serif;
`;

const AnalysisContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const YourResponse = styled.div`
  width: 100%;
  padding: 20px;
  background: var(--primary-light);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ResponseLabel = styled.div`
  color: var(--Grayscale-gray-80, #4b5563);
  font-size: 14px;
  font-weight: 600;
  font-family: "Pretendard", sans-serif;
`;

const ResponseText = styled.div`
  color: var(--Grayscale-gray-100, #171717);
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  font-family: "Pretendard", sans-serif;
`;

const AnalysisResult = styled.div`
  width: 100%;
  padding: 20px;
  background: var(--Grayscale-gray-10, #f6f6f7);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AnalysisLabel = styled.div`
  color: var(--Grayscale-gray-80, #4b5563);
  font-size: 14px;
  font-weight: 600;
  font-family: "Pretendard", sans-serif;
`;

const AnalysisText = styled.div`
  color: var(--Grayscale-gray-100, #171717);
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  font-family: "Pretendard", sans-serif;
`;

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--Grayscale-gray-5, #fcfcfc);
  border: 1.5px solid var(--Grayscale-gray-30, #d6d8dc);
  border-radius: 100px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  color: var(--Grayscale-gray-80, #4b5563);
  font-family: "Pretendard", sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  outline: none;

  &::placeholder {
    color: var(--Grayscale-gray-60, #9ca3af);
  }

  &:disabled {
    color: var(--Grayscale-gray-40, #9ca3af);
  }
`;

const SubmitButton = styled.button`
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  background: var(--primary);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;

  &:disabled {
    background: var(--Grayscale-gray-30, #d6d8dc);
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: var(--primary-dark);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const NextRoundButton = styled.button`
  width: 204px;
  height: 48px;
  padding: 10px 18px;
  background: var(--primary);
  color: white;
  border-radius: 12px;
  border: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  line-height: 1.4;
  cursor: pointer;
  margin-top: 16px;
  transition: all 0.2s;
  align-self: center;

  &:hover {
    background: var(--primary-dark);
  }
`;

const ErrorText = styled.div`
  color: #ef4444;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  padding: 20px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const Game = () => {
  const [currentRound, setCurrentRound] = useState(1);
  const [userResponse, setUserResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gameState, setGameState] = useState("waiting"); // 'waiting', 'submitted', 'showingAnalysis'
  const [currentResponse, setCurrentResponse] = useState("");
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [roundData, setRoundData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scores, setScores] = useState({ score: 0, totalScore: 0 });

  const theme = useTheme();
  const navigate = useNavigate();

  // Set MBTI type from localStorage
  const userType = localStorage.getItem("userType") || "T";
  const isLearningF = userType === "F"; // F 타입을 선택한 경우 F 스타일을 학습

  // Theme colors based on MBTI type
  const themeColors = {
    primary: isLearningF ? "#f59e0c" : "#6c6eed",
    primaryLight: isLearningF ? "#F9E9CD" : "#E7E7FF",
    primaryDark: isLearningF ? "#fbbf24" : "#8e8ef1",
  };

  // Load round data
  useEffect(() => {
    const loadRound = async () => {
      const sessionId = localStorage.getItem("sessionId");
      if (!sessionId) {
        navigate("/");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await getRound(sessionId, currentRound);
        setRoundData(data);
        setGameState("waiting");
        setUserResponse("");
        setCurrentResponse("");
      } catch (err) {
        console.error("Failed to load round:", err);
        setError("라운드 정보를 불러오는데 실패했습니다. 다시 시도해주세요.");
      } finally {
        setIsLoading(false);
      }
    };

    loadRound();
  }, [currentRound, navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userResponse.trim() || isSubmitting) return;

    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      navigate("/");
      return;
    }

    setIsSubmitting(true);
    setCurrentResponse(userResponse);
    setGameState("submitted");

    try {
      // Submit the response to the API
      const response = await submitResponse(
        sessionId,
        userResponse,
        currentRound,
        roundData.situation
      );

      console.log("Submit response:", response);

      // Store the scores in state
      setScores({
        score: response.score,
        totalScore: response.total_score,
      });

      // Store the score for this round
      const roundScores = JSON.parse(
        localStorage.getItem("roundScores") || "{}"
      );
      roundScores[`round${currentRound}`] = response.score;
      localStorage.setItem("roundScores", JSON.stringify(roundScores));

      // Store the total score if this is the last round
      if (response.is_complete) {
        localStorage.setItem("totalScore", response.total_score.toString());
      }

      setGameState("showingAnalysis");
    } catch (error) {
      console.error("Error submitting response:", error);
      setError("응답을 제출하는 중 오류가 발생했습니다. 다시 시도해주세요.");
      setGameState("waiting");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle next round
  const handleNextRound = () => {
    if (currentRound < 5) {
      setCurrentRound((prev) => prev + 1);
    } else {
      setIsGameCompleted(true);
      navigate("/result");
    }
  };

  if (isLoading) {
    return (
      <Container
        style={{
          "--primary": themeColors.primary,
          "--primary-light": themeColors.primaryLight,
          "--primary-dark": themeColors.primaryDark,
        }}
      >
        <LoadingContainer>
          <ClipLoader
            color={themeColors.primary}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        style={{
          "--primary": themeColors.primary,
          "--primary-light": themeColors.primaryLight,
          "--primary-dark": themeColors.primaryDark,
        }}
      >
        <ErrorText>{error}</ErrorText>
      </Container>
    );
  }

  if (!roundData) {
    return null;
  }

  return (
    <Container
      style={{
        "--primary": themeColors.primary,
        "--primary-light": themeColors.primaryLight,
        "--primary-dark": themeColors.primaryDark,
      }}
    >
      <Header>
        <HeaderContent>
          <HeaderTop>
            <Status>
              <StatusGroup>
                <StatusIconWrapper>
                  <div
                    style={{
                      backgroundColor: themeColors.primary,
                      borderRadius: "50%",
                      width: "24px",
                      height: "24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "white",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {currentRound}
                    </span>
                  </div>
                </StatusIconWrapper>
                <StatusText>라운드 {currentRound}/5</StatusText>
              </StatusGroup>
              <StatusDivider />
              <StatusGroup>
                <StatusIconWrapper>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="#4b5563"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 6V12L16 14"
                      stroke="#4b5563"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </StatusIconWrapper>
                <StatusText>15:00</StatusText>
              </StatusGroup>
            </Status>
          </HeaderTop>
        </HeaderContent>
      </Header>

      <GameBox>
        {gameState === "waiting" && (
          <RoundInfo>
            <RoundNumber>라운드 {currentRound}</RoundNumber>
            <SituationCard>
              <Situation>{roundData.situation}</Situation>
              <SituationDetail>{roundData.situation_detail}</SituationDetail>
            </SituationCard>
            <FriendMessageBox>
              <FriendAvatar>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
                    stroke="#171717"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                    stroke="#171717"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </FriendAvatar>
              <FriendMessage>{roundData.friend_message}</FriendMessage>
            </FriendMessageBox>
          </RoundInfo>
        )}

        {gameState === "submitted" && (
          <AnalysisContainer>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px 0",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <ClipLoader
                color={themeColors.primary}
                size={40}
                aria-label="분석 중"
              />
              <p style={{ color: theme.colors.gray_700, margin: 0 }}>
                위로 메시지를 분석 중이에요...
              </p>
            </div>
          </AnalysisContainer>
        )}
        {gameState === "showingAnalysis" && (
          <AnalysisContainer>
            <YourResponse>
              <ResponseLabel>당신의 응답</ResponseLabel>
              <ResponseText>{currentResponse}</ResponseText>
            </YourResponse>

            {gameState === "showingAnalysis" && (
              <>
                <AnalysisResult>
                  <AnalysisLabel>점수</AnalysisLabel>
                  <AnalysisText>
                    이번 라운드: {Math.round(scores.score)}점 / 전체:{" "}
                    {Math.round(scores.totalScore)}점
                  </AnalysisText>
                </AnalysisResult>
              </>
            )}
          </AnalysisContainer>
        )}

        <FormContainer onSubmit={handleSubmit}>
          <InputContainer>
            <Input
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              placeholder="상대방을 위로하는 말을 작성해주세요."
              disabled={gameState !== "waiting"}
            />
            <SubmitButton
              type="submit"
              disabled={
                !userResponse.trim() || isSubmitting || gameState !== "waiting"
              }
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 2L11 13"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 2L15 22L11 13L2 9L22 2Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </SubmitButton>
          </InputContainer>
        </FormContainer>

        {gameState === "showingAnalysis" && (
          <NextRoundButton onClick={handleNextRound}>
            {currentRound < 5 ? "다음 라운드" : "결과 보기"}
          </NextRoundButton>
        )}
      </GameBox>
    </Container>
  );
};

export default Game;
