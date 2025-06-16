import React, { useState, useEffect } from "react";
import styled from "styled-components";

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
  height: 70vh; /* Fixed viewport height */
  min-height: 600px; /* Minimum height to ensure content is visible */
  padding: 40px;
  margin: 40px 0;
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
  padding: 18px 32px;
  background: var(--Grayscale-gray-5, #fcfcfc);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const MachineMessage = styled(MessageBubble)`
  background: var(--Grayscale-gray-20, #e9ebed);
  border-bottom-left-radius: 2px;
`;

const UserMessage = styled(MessageBubble)`
  background: var(--Main-T-10, #e7e7ff);
  border-bottom-right-radius: 2px;
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

const InputBar = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 80px;
  padding: 12px 16px;
  background: var(--Grayscale-gray-5, #fcfcfc);
  box-shadow: 0px -3px 15.3px 2px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  
  @media (max-width: 768px) {
    padding: 12px;
    height: auto;
    min-height: 80px;
  }

  input {
    flex: 1;
    height: 56px;
    padding: 0 20px;
    border-radius: 28px;
    border: 1.5px solid var(--Grayscale-gray-30, #d6d8dc);
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    outline: none;
    -webkit-appearance: none;
    
    &:focus {
      border-color: var(--Grayscale-gray-100, #171717);
    }
  }

  button {
    height: 56px;
    padding: 0 24px;
    border-radius: 28px;
    background: var(--Grayscale-gray-100, #171717);
    color: white;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    border: none;
    white-space: nowrap;
    transition: background 0.2s;
    
    &:disabled {
      background: var(--Grayscale-gray-30, #d6d8dc);
      cursor: not-allowed;
    }
    
    &:not(:disabled):hover {
      background: var(--Grayscale-gray-80, #4B5563);
    }
  }
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

const Game = () => {
  // 모바일 키보드 이벤트 처리
  useEffect(() => {
    const handleResize = () => {
      // 모바일에서 키보드가 열릴 때 뷰포트 높이 계산
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // 키보드가 열려 있을 때만 스크롤 조정
      if (documentHeight > viewportHeight) {
        window.scrollTo(0, documentHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [currentRound, setCurrentRound] = useState(1);
  const [userResponse, setUserResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roundData, setRoundData] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [sessionId] = useState(() => {
    // Generate or retrieve session ID
    return localStorage.getItem("gameSessionId") || `session-${Date.now()}`;
  });

  // Load round data when component mounts or round changes
  useEffect(() => {
    const loadRoundData = async () => {
      try {
        const data = await GameAPI.getRoundInfo(sessionId, currentRound);
        setRoundData(data);
        setUserResponse("");
      } catch (error) {
        console.error("Error loading round data:", error);
      }
    };

    if (!isGameCompleted) {
      loadRoundData();
    }
  }, [currentRound, isGameCompleted, sessionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userResponse.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const result = await GameAPI.submitResponse(
        sessionId,
        currentRound,
        userResponse,
        roundData?.situation
      );

      setGameResult(result);

      if (result.is_completed || currentRound >= 5) {
        setIsGameCompleted(true);
      }
    } catch (error) {
      console.error("Error submitting response:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextRound = () => {
    if (currentRound < 5) {
      setCurrentRound((prev) => prev + 1);
      setGameResult(null);
    }
  };

  // 모바일에서 입력 필드 포커스 시 스크롤 조정
  const handleInputFocus = () => {
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 100);
    }
  };

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

  if (!roundData) {
    return <div>로딩 중...</div>;
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <HeaderTop>
            <Title>
              <span>너</span>
              <span> </span>
              <span>T</span>
              <span>야?</span>
            </Title>
            <StatusGroup>
              <Status>
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
              </Status>
              <Status>
                <StatusIconWrapper>
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      left: 0,
                      top: 0,
                      position: "absolute",
                      background: "var(--Grayscale-gray-30, #D6D8DC)",
                    }}
                  />
                  <div
                    style={{
                      width: 17,
                      height: 17,
                      left: 3.5,
                      top: 3.5,
                      position: "absolute",
                      background: "var(--Grayscale-gray-100, #171717)",
                    }}
                  />
                </StatusIconWrapper>
                <StatusText>0점</StatusText>
              </Status>
            </StatusGroup>
          </HeaderTop>
        </HeaderContent>
      </Header>
      <GameBox>
        <RoundInfo>Round 1</RoundInfo>
        <SituationCard>
          <div
            style={{
              color: "var(--Grayscale-gray-100, #171717)",
              fontWeight: 600,
              fontSize: 20,
            }}
          >
            상황설명
          </div>
          <div
            style={{
              color: "var(--Grayscale-gray-80, #4B5563)",
              fontWeight: 600,
              fontSize: 18,
            }}
          >
            소중한 물건을 잃어버려서 많이 낙심하고 있는 친구
          </div>
        </SituationCard>
        <MachineMessage>
          남자친구가 사준 반지를 잃어버렸어 어떡하지
        </MachineMessage>
        <UserMessage>헐 어떡해 마음이 너무 안 좋겠다</UserMessage>
        <AnalysisBox>
          <div
            style={{
              fontSize: 18,
              color: "var(--Grayscale-gray-80, #4B5563)",
              fontWeight: 600,
            }}
          >
            당신의 F 점수는 62점이에요!
            <br />
            조금 더 F에 다가가볼까요?
          </div>
        </AnalysisBox>
        <InputBar>위로의 말을 전해보세요!</InputBar>
      </GameBox>

      {/* Fixed Bottom Input Area */}
      {!gameResult ? (
        <form
          onSubmit={handleSubmit}
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
          }}
        >
          <InputBar>
            <input
              type="text"
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              onFocus={handleInputFocus}
              placeholder="답변을 입력하세요..."
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting || !userResponse.trim()}
            >
              {isSubmitting ? "제출 중..." : "제출"}
            </button>
          </InputBar>
        </form>
      ) : (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            padding: "20px 240px",
            background: "var(--Grayscale-gray-5, #fcfcfc)",
            boxShadow: "0px -3px 15.3px 2px rgba(0, 0, 0, 0.05)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "24px",
              height: "56px",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <h3
                style={{
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#171717",
                }}
              >
                점수: {gameResult.score}점
              </h3>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: "16px",
                  color: "#4B5563",
                }}
              >
                {gameResult.feedback}
              </p>
            </div>
            <button
              onClick={handleNextRound}
              disabled={isSubmitting || currentRound >= 5}
              style={{
                height: "56px",
                padding: "0 32px",
                borderRadius: "28px",
                background:
                  isSubmitting || currentRound >= 5 ? "#d6d8dc" : "#171717",
                color: "white",
                fontFamily: "Pretendard",
                fontSize: "18px",
                fontWeight: 600,
                border: "none",
                cursor:
                  isSubmitting || currentRound >= 5 ? "not-allowed" : "pointer",
                transition: "background 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {currentRound < 5 ? "다음 라운드" : "결과 보기"}
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Game;
