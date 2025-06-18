import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { useTheme, keyframes } from "styled-components";
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
  padding: 20px 0;
  background: var(--Grayscale-gray-5, #fcfcfc);
  box-shadow: 3px 6px 15.3px 2px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 15px 16px;
    height: auto;
  }
`;

const HeaderContent = styled.div`
  width: 100%;
  max-width: 996px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 0;
    max-width: 100%;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const RoundHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 8px;
  }
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
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const RoundSubtitle = styled.div`
  color: var(--Grayscale-gray-100, #171717);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px; /* 160% */
  margin-top: 4px;
  margin-left: 8px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
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

  @media (max-width: 768px) {
    padding: 12px 16px;
    gap: 0px;
  }
`;

const Situation = styled.div`
  color: var(--Grayscale-gray-100, #171717);
  font-size: 20px;
  font-weight: 600;
  line-height: 32px;
  font-family: "Pretendard", sans-serif;
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 24px;
  }
`;

const SituationDetail = styled.div`
  color: var(--Grayscale-gray-80, #4b5563);
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  font-family: "Pretendard", sans-serif;
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 24px;
  }
`;

const FriendMessageBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const UserMessageBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`;

const FriendMessage = styled.div`
  padding: 12px 18px;
  background: var(--Grayscale-gray-20, #e9ebed);
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
  border-bottom-left-radius: 2px;
  color: var(--Grayscale-gray-80, #4b5563);
  font-size: 18px;
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  line-height: 24px;
  word-wrap: break-word;
  max-width: 90%;

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 22px;
    padding: 10px 16px;
  }
`;

// 애니메이션 키프레임 정의
const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const UserMessage = styled.div`
  padding: 12px 18px;
  animation: ${slideUp} 0.4s ease-out forwards;
  background: ${(props) =>
    props.userType === "F"
      ? "var(--Main-F-10, #F9E9CD)"
      : "var(--Main-T-10, #E7E7FF)"};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 24px;
  color: var(--Grayscale-gray-80, #4b5563);
  font-size: 18px;
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  line-height: 24px;
  word-wrap: break-word;
  max-width: 90%;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 22px;
    padding: 10px 16px;
  }
`;

const AnalysisContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AnalysisLabel = styled.div`
  color: var(--Grayscale-gray-80, #4b5563);
  font-size: 14px;
  font-weight: 600;
  font-family: "Pretendard", sans-serif;
`;

const AnalysisText = styled.div`
  color: var(--Grayscale-gray-100, #171717);
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

  @media (max-width: 768px) {
    padding: 8px 10px 8px 18px;
  }
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

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 22px;
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
  const [isMessageAnimationComplete, setIsMessageAnimationComplete] =
    useState(false);

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
            <StatusText>Round {currentRound}/5</StatusText>
          </StatusGroup>

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
                  d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
                  stroke="#4b5563"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                  stroke="#4b5563"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </StatusIconWrapper>
            <StatusText>
              {localStorage.getItem("userNickname") || "User"}
            </StatusText>
          </StatusGroup>
        </HeaderContent>
      </Header>

      <GameBox>
        <RoundInfo>
          <RoundHeader>
            <RoundNumber>Round {currentRound}</RoundNumber>
            <RoundSubtitle>
              {isLearningF
                ? "F처럼 따뜻한 위로를 건네주세요"
                : "T처럼 이성적인 답변을 제시해보세요"}
            </RoundSubtitle>
          </RoundHeader>
          <SituationCard>
            <Situation>상황 설명</Situation>
            <SituationDetail>{roundData.situation_detail}</SituationDetail>
          </SituationCard>
          <FriendMessageBox>
            <FriendMessage>{roundData.friend_message}</FriendMessage>
          </FriendMessageBox>
        </RoundInfo>

        {/* User's message bubble - shown after submission */}
        {(gameState === "submitted" ||
          gameState === "analyzing" ||
          gameState === "showingAnalysis") && (
          <div style={{ width: "100%" }}>
            <UserMessageBox>
              <UserMessage
                userType={userType}
                onAnimationEnd={() => setIsMessageAnimationComplete(true)}
              >
                {userResponse}
              </UserMessage>
            </UserMessageBox>
          </div>
        )}

        {/* Loading indicator - shown only while analyzing and after message animation completes */}
        {(gameState === "submitted" || gameState === "analyzing") &&
          isMessageAnimationComplete && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
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
            </div>
          )}

        {/* Score display - shown inside friend's message after analysis */}
        {gameState === "showingAnalysis" && (
          <FriendMessageBox>
            <FriendMessage>
              <AnalysisLabel>점수</AnalysisLabel>
              <AnalysisText>
                이번 라운드: {Math.round(scores.score)}점 / 전체:{" "}
                {Math.round(scores.totalScore)}점
              </AnalysisText>
            </FriendMessage>
          </FriendMessageBox>
        )}
        {gameState !== "showingAnalysis" && (
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
                  !userResponse.trim() ||
                  isSubmitting ||
                  gameState !== "waiting"
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
                    d="M5 12H19"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 5L19 12L12 19"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </SubmitButton>
            </InputContainer>
          </FormContainer>
        )}
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
