import React, { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";

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
  overflow-y: auto; /* Add scrollbar when content overflows */
`;

const RoundInfo = styled.div`
  padding: 6px 32px;
  background: var(--Main-T-100, #6c6eed);
  border-radius: 48px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  display: flex;
  color: var(--Grayscale-gray-5, #fcfcfc);
  font-size: 20px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 28px;
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

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const RoundBadge = styled.div`
  background: var(--primary);
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const CardTitle = styled.div`
  color: var(--Grayscale-gray-100, #171717);
  font-size: 20px;
  font-weight: 600;
  line-height: 32px;
  font-family: "Pretendard", sans-serif;
`;

const ProgressContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 7.5px;
  background: var(--Grayscale-gray-20, #e9ebed);
`;

const ProgressFill = styled.div`
  width: ${(props) => props.width || "20%"};
  height: 100%;
  background: var(--primary);
  border-radius: 24px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: width;
`;

const ProgressText = styled.div`
  color: var(--Grayscale-gray-80, #4b5563);
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  font-family: "Pretendard", sans-serif;
`;

const SituationContent = styled.div`
  width: 100%;
  padding: 18px 32px;
  background: var(--Grayscale-gray-5, #fcfcfc);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SituationTitle = styled.div`
  color: var(--Grayscale-gray-100, #171717);
  font-size: 20px;
  font-weight: 600;
  line-height: 32px;
  font-family: "Pretendard", sans-serif;
`;

const SituationDescription = styled.div`
  color: var(--Grayscale-gray-80, #4b5563);
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  font-family: "Pretendard", sans-serif;
`;

const MessageBubble = styled.div`
  padding: 12px 18px;
  border-radius: 24px;
  font-size: 18px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 24px;
  word-wrap: break-word;
  max-width: 100%;
`;

const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MachineMessage = styled(MessageBubble)`
  background: var(--Grayscale-gray-20, #e9ebed);
  border-bottom-left-radius: 2px;
  align-self: flex-start;
  max-width: 80%;
`;

const UserMessage = styled(MessageBubble)`
  background: var(--primary-light);
  border-bottom-right-radius: 2px;
  align-self: flex-end;
  max-width: 80%;
`;

const AnalysisBox = styled.div`
  width: 100%;
  max-width: 347px;
  padding: 16px 18px;
  background: var(--Grayscale-gray-20, #e9ebed);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const InputContainer = styled.div`
  width: 100%;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`;

const InputWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 100px;
  border: 1.5px solid var(--Grayscale-gray-30, #d6d8dc);
  display: flex;
  align-items: center;
  background: var(--Grayscale-gray-5, #fcfcfc);
  padding-right: 16px;
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 12px 12px 12px 32px;
  border: none;
  background: transparent;
  color: var(--Grayscale-gray-80, #4b5563);
  font-family: "Pretendard", sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  outline: none;
  -webkit-appearance: none;

  &::placeholder {
    color: var(--Grayscale-gray-60, #9ca3af);
  }

  &:focus {
    border-color: var(--Grayscale-gray-100, #171717);
  }
`;

const NextRoundButton = styled.button`
  width: 204px;
  height: 48px;
  padding: 10px 18px;
  background: var(--Grayscale-gray-10, #f6f6f7);
  border-radius: 12px;
  outline: 1.5px solid var(--Grayscale-gray-20, #e9ebed);
  outline-offset: -1.5px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: var(--Grayscale-gray-80, #4b5563);
  font-size: 16px;
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  line-height: 1.4;
  border: none;
  cursor: pointer;
  margin-top: 16px;
  transition: all 0.2s;

  &:hover {
    background: var(--Grayscale-gray-20, #e9ebed);
  }
`;

const SendButton = styled.button`
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

const CharCount = styled.div`
  color: var(--Grayscale-gray-60, #9ca3af);
  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 16.8px;
  padding: 0 12px;
`;

// API Service Functions
const GameAPI = {
  // Get round information
  getRoundInfo: async (sessionId, roundNumber) => {
    // TODO: Implement actual API call
    // const response = await fetch(`/api/v1/game/round/${sessionId}/${roundNumber}`);
    // return await response.json();

    // Mock data for now
    return {
      round_number: roundNumber,
      situation: "연인_갈등",
      scenario: `당신의 연인이 당신의 계획을 무시하고 다른 약속을 잡았을 때 어떻게 반응하시겠습니까? (라운드 ${roundNumber})`,
    };
  },

  // Submit response and get score
  submitResponse: async (sessionId, roundNumber, userResponse, situation) => {
    // TODO: Implement actual API call
    // const response = await fetch('/api/v1/game/submit', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     session_id: sessionId,
    //     user_response: userResponse,
    //     round_number: roundNumber,
    //     situation: situation
    //   })
    // });
    // return await response.json();

    // Mock data for now
    return {
      round_number: roundNumber,
      score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
      feedback: "좋은 반응이에요!",
      is_completed: roundNumber >= 5,
    };
  },
};

// Sample round data - replace with your actual data
const ROUND_DATA = [
  {
    id: 1,
    situation: "친구가 시험에서 떨어졌을 때",
    description: "열심히 공부했는데도 시험에 떨어진 친구를 위로해주세요.",
    userMessage: "시험 결과가 안 좋았네..."
  },
  {
    id: 2,
    situation: "연인과 다툰 친구",
    description: "연인과 심하게 다퉜는데, 어떻게 위로해줄까요?",
    userMessage: "너무 속상해..."
  },
  {
    id: 3,
    situation: "직장에서 상사에게 혼난 친구",
    description: "부당하게 혼난 친구를 위로해주세요.",
    userMessage: "상사가 너무 불공평해..."
  },
  {
    id: 4,
    situation: "가족과의 갈등",
    description: "가족과의 오해로 속상해하는 친구를 위로해주세요.",
    userMessage: "가족들이 날 이해를 안 해줘..."
  },
  {
    id: 5,
    situation: "취업에 실패한 친구",
    description: "열심히 준비했던 회사에 떨어진 친구를 위로해주세요.",
    userMessage: "너무 힘들어..."
  }
];

const Game = () => {
  // Game states
  const [currentRound, setCurrentRound] = useState(1);
  const [userResponse, setUserResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gameState, setGameState] = useState('waiting'); // 'waiting', 'submitted', 'showingAnalysis'
  const [currentResponse, setCurrentResponse] = useState('');
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  
  // Get current round data
  const currentRoundData = ROUND_DATA.find(round => round.id === currentRound) || ROUND_DATA[0];

  const theme = useTheme();

  // Set MBTI type directly for testing (T or F)
  const testMBTI = "T"; // Change this to "F" to test the other theme
  const isLearningF = testMBTI === "T";

  // Theme colors based on MBTI type
  const themeColors = {
    primary: isLearningF ? "#f59e0c" : "#6c6eed",
    primaryLight: isLearningF ? "#F9E9CD" : "#E7E7FF",
    primaryDark: isLearningF ? "#fbbf24" : "#8e8ef1",
  };

  const [sessionId] = useState(() => {
    // Generate or retrieve session ID
    return localStorage.getItem("gameSessionId") || `session-${Date.now()}`;
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userResponse.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    setCurrentResponse(userResponse);
    setGameState('submitted');
    
    try {
      // Simulate API call
      const result = await GameAPI.submitResponse(
        sessionId,
        currentRound,
        userResponse,
        currentRoundData.situation
      );

      // Show analysis after 1 second
      setTimeout(() => {
        setGameState('showingAnalysis');
        setIsSubmitting(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error submitting response:", error);
      setIsSubmitting(false);
    }
  };

  // Handle next round
  const handleNextRound = () => {
    if (currentRound < 5) {
      setCurrentRound(prev => prev + 1);
      setGameState('waiting');
      setCurrentResponse('');
      setUserResponse('');
    } else {
      // Handle game completion
      setIsGameCompleted(true);
      console.log('Game completed!');
      // You can add game completion logic here
    }
  };

  // Mobile keyboard handling
  useEffect(() => {
    const handleResize = () => {
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (documentHeight > viewportHeight) {
        window.scrollTo(0, documentHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // No need for separate focus handling with the new layout

  if (isGameCompleted) {
    return (
      <Container>
        <GameBox>
          <h2>게임 완료!</h2>
          <p>모든 라운드를 완료하셨습니다.</p>
          {/* Add final score and feedback summary here */}
        </GameBox>
      </Container>
    );
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
                      width: 8,
                      height: 8,
                      left: 8,
                      top: 4,
                      position: "absolute",
                      borderRadius: 9999,
                      border: "1.5px var(--Grayscale-gray-100, #171717) solid",
                    }}
                  />
                  <div
                    style={{
                      width: 12,
                      height: 5.51,
                      left: 6,
                      top: 14,
                      position: "absolute",
                      outline: "1.5px var(--Grayscale-gray-100, #171717) solid",
                      outlineOffset: "-0.75px",
                    }}
                  />
                </StatusIconWrapper>
                <StatusText>F형</StatusText>
              </StatusGroup>
            </Status>
          </HeaderTop>
        </HeaderContent>
      </Header>
      
      <GameBox>
        <SituationCard>
          <CardContent>
            <CardTitle>
              <RoundBadge>Round {currentRound}</RoundBadge>
              <ProgressBar>
                <ProgressFill width={`${(currentRound / 5) * 100}%`} />
              </ProgressBar>
              <ProgressText>{currentRound}/5</ProgressText>
            </CardTitle>
            <SituationContent>
              <SituationTitle>{currentRoundData.situation}</SituationTitle>
              <SituationDescription>
                {currentRoundData.description}
              </SituationDescription>
            </SituationContent>
          </CardContent>
        </SituationCard>

        <MessageContainer>
          <MachineMessage>
            {currentRoundData.userMessage}
          </MachineMessage>
          
          {gameState !== 'waiting' && (
            <UserMessage>{currentResponse}</UserMessage>
          )}
        </MessageContainer>

        {gameState === 'showingAnalysis' && (
          <>
            <AnalysisBox>
              <div style={{
                fontSize: 18,
                color: "var(--Grayscale-gray-80, #4B5563)",
                fontWeight: 600,
                whiteSpace: 'pre-line',
                textAlign: 'center'
              }}>
                {isLearningF 
                  ? `당신의 F 점수는 ${Math.floor(Math.random() * 40) + 60}점이에요!\n조금 더 F에 다가가볼까요?`
                  : `당신의 T 점수는 ${Math.floor(Math.random() * 40) + 60}점이에요!\n조금 더 T에 다가가볼까요?`
                }
              </div>
            </AnalysisBox>
            
            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "16px" }}>
              <button
                onClick={handleNextRound}
                style={{
                  width: "204px",
                  height: "48px",
                  padding: "10px 18px",
                  background: "var(--Grayscale-gray-10, #F6F6F7)",
                  borderRadius: "12px",
                  outline: "1.5px solid var(--Grayscale-gray-20, #E9EBED)",
                  outlineOffset: "-1.5px",
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "var(--Grayscale-gray-80, #4B5563)",
                  fontSize: "16px",
                  fontFamily: "'Pretendard', sans-serif",
                  fontWeight: 600,
                  lineHeight: 1.4,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "var(--Grayscale-gray-20, #E9EBED)"}
                onMouseOut={(e) => e.currentTarget.style.background = "var(--Grayscale-gray-10, #F6F6F7)"}
              >
                {currentRound < 5 ? '다음 라운드 이동하기' : '결과 보기'}
              </button>
            </div>
          </>
        )}

        {gameState === 'waiting' && (
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <InputContainer>
              <CharCount>{userResponse.length}/250</CharCount>
              <InputWrapper>
                <StyledInput
                  type="text"
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value.slice(0, 250))}
                  placeholder="위로의 말을 전해보세요!"
                  disabled={isSubmitting}
                />
                <SendButton
                  type="submit"
                  disabled={isSubmitting || !userResponse.trim()}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </SendButton>
              </InputWrapper>
            </InputContainer>
          </form>
        )}
      </GameBox>
    </Container>
  );
};

export default Game;
