import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { startGame } from "../api/start";
import { ClipLoader } from "react-spinners";

// Layout Components
const PageContainer = styled.div`
  background: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f8f9ff;
  padding: 80px 80px;
  gap: 56px;

  @media (max-width: 500px) {
    padding: 40px 16px;
    gap: 32px;
  }
`;

const MainContent = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: 48px;
  width: 100%;

  @media (max-width: 500px) {
    gap: 24px;
  }
`;

const HeaderSection = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;

  @media (min-width: 1200px) {
    max-width: 1024px;
    margin: 0 auto;
  }

  @media (max-width: 500px) {
    padding: 0 16px;
  }
`;

const Title = styled.span`
  color: #6c6eed;
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  width: 146px;
`;

const Subtitle = styled.span`
  color: #4b5563;
  font-size: 24px;
  font-weight: bold;
  white-space: nowrap;
  text-align: center;
  width: 100%;
  display: block;
`;

const FormSection = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 0 16px;
  box-sizing: border-box;
`;

const InputContainer = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const StyledInput = styled.input`
  color: #4b5563;
  font-size: 18px;
  font-weight: 600;
  font-family: "Pretendard", sans-serif;
  background: #fcfcfc;
  border-radius: 100px;
  border: 1.5px solid #d6d8dc;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  padding: 12px 32px;
  height: 56px;
  outline: none;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: rgb(80, 82, 86);
  }

  @media (max-width: 500px) {
    width: 100%;
    max-width: 100%;
    padding: 12px 24px;
  }
`;

const CardContainer = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding: 16px 16px;
  box-sizing: border-box;
`;

const CardsWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  gap: 36px;
  padding: 0 16px;
  box-sizing: border-box;
  margin: 0 auto;

  @media (min-width: 768px) {
    max-width: 1080px;
    padding: 0 32px;
  }

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    padding: 0 16px;
    gap: 24px;
  }

  @media (max-width: 500px) {
    gap: 16px;
    padding: 0 16px;
  }
`;

const Card = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fcfcfc;
  border-radius: 24px;
  padding: 32px 24px;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 32px 36px;
  }
  box-shadow: ${({ $isSelected }) =>
    $isSelected
      ? "3px 6px 15.3px 2px rgba(0, 0, 0, 0.05)"
      : "0px 0px 20px rgba(0, 0, 0, 0.1)"};
  outline: ${({ $isSelected, $type }) =>
    $isSelected
      ? `3px solid ${$type === "T" ? "#6C6EED" : "#F59E0C"}`
      : "none"};
  outline-offset: -3px;
  min-width: 0;
  width: 100%;
  max-width: 100%;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    width: 100%;
    max-width: 100%;
  }

  @media (max-width: 500px) {
    padding: 24px 16px;
    border-radius: 16px;
    width: 100%;
    margin: 0;
    box-sizing: border-box;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 37px;
  margin: 0 48px;
  gap: 12px;
`;

const TypeButton = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 32.5px;
  background: ${({ $isSelected, $type }) =>
    $isSelected ? ($type === "T" ? "#6C6EED" : "#F59E0C") : "transparent"};
  border: 2px solid ${({ $type }) => ($type === "T" ? "#6C6EED" : "#F59E0C")};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const TypeLetter = styled.span`
  color: ${({ $isSelected, $type }) =>
    $isSelected ? "#FCFCFC" : $type === "T" ? "#6C6EED" : "#F59E0C"};
  font-size: 22px;
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  line-height: 34px;
`;

const TypeTitle = styled.span`
  color: #171717;
  font-size: 22px;
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  line-height: 30.8px;
  text-align: center;
`;

const TypeDescription = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 1200px) {
    gap: 2px;
  }
`;

const DescriptionText = styled.span`
  color: #171717;
  font-size: 18px;
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
  margin: 0;

  @media (max-width: 1200px) {
    font-size: 12px;
    font-weight: 500;
    line-height: 16.8px; /* 140% of 12px */
  }
`;

const StartButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ $isActive, $selectedType }) =>
    !$isActive ? "#D6D8DC" : $selectedType === "T" ? "#6C6EED" : "#F59E0C"};
  color: ${({ $isActive }) => ($isActive ? "#FCFCFC" : "#4B5563")};
  border-radius: 12px;
  border: none;
  padding: 12px 34px;
  cursor: ${({ $isActive }) => ($isActive ? "pointer" : "not-allowed")};
  transition: all 0.2s ease;
  font-family: "Pretendard", sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  margin: 0 auto;

  &:hover {
    background: ${({ $isActive, $selectedType }) =>
      !$isActive ? "#D6D8DC" : $selectedType === "T" ? "#5A5CD4" : "#D97706"};
  }
`;

const Select = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  const handleStartGame = async () => {
    if (!nickname.trim() || !selectedType) {
      alert("닉네임과 MBTI 유형을 모두 선택해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await startGame(nickname, selectedType);
      // Save session ID and user type to localStorage
      localStorage.setItem("sessionId", response.session_id);
      localStorage.setItem("userType", selectedType);
      localStorage.setItem("userNickname", nickname);
      navigate("/game");
    } catch (err) {
      console.error("Failed to start game:", err);
      setError("게임 시작에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <ContentContainer>
        <MainContent>
          <HeaderSection>
            <Title>
              너<span>T</span>야?
            </Title>
            <Subtitle>T처럼 판단하기 vs F처럼 이해하기</Subtitle>
          </HeaderSection>

          <FormSection>
            <InputContainer>
              <StyledInput
                placeholder="사용할 닉네임을 입력해주세요"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </InputContainer>

            <CardContainer>
              <CardsWrapper>
                <Card
                  onClick={() => handleTypeSelect("T")}
                  $isSelected={selectedType === "T"}
                  $type="T"
                >
                  <CardHeader>
                    <TypeButton $type="T" $isSelected={selectedType === "T"}>
                      <TypeLetter $type="T" $isSelected={selectedType === "T"}>
                        T
                      </TypeLetter>
                    </TypeButton>
                    <TypeTitle>사고형 (Thinking)</TypeTitle>
                  </CardHeader>
                  <TypeDescription>
                    <DescriptionText>
                      논리와 객관성을 중시합니다
                    </DescriptionText>
                    <DescriptionText>
                      문제 해결을 위한 실질적인 조언을 제공합니다
                    </DescriptionText>
                    <DescriptionText>
                      감정보다는 사실과 원칙에 기반하여 판단합니다
                    </DescriptionText>
                    <DescriptionText>
                      직접적이고 솔직한 표현을 선호합니다
                    </DescriptionText>
                  </TypeDescription>
                </Card>

                <Card
                  onClick={() => handleTypeSelect("F")}
                  $isSelected={selectedType === "F"}
                  $type="F"
                >
                  <CardHeader>
                    <TypeButton $type="F" $isSelected={selectedType === "F"}>
                      <TypeLetter $type="F" $isSelected={selectedType === "F"}>
                        F
                      </TypeLetter>
                    </TypeButton>
                    <TypeTitle>감정형 (Feeling)</TypeTitle>
                  </CardHeader>
                  <TypeDescription>
                    <DescriptionText>
                      공감과 감정적 연결을 중시합니다
                    </DescriptionText>
                    <DescriptionText>
                      정서적 지지와 위로를 먼저 제공합니다
                    </DescriptionText>
                    <DescriptionText>
                      타인의 감정을 고려하여 조화로운 관계를 추구합니다
                    </DescriptionText>
                    <DescriptionText>
                      따뜻하고 우호적인 표현을 선호합니다
                    </DescriptionText>
                  </TypeDescription>
                </Card>
              </CardsWrapper>
            </CardContainer>
          </FormSection>
        </MainContent>
        <StartButton
          onClick={handleStartGame}
          $isActive={!!(nickname.trim() && selectedType)}
          $selectedType={selectedType}
          disabled={isLoading || !(nickname.trim() && selectedType)}
        >
          {isLoading ? (
            <ClipLoader
              color="#fff"
              size={20}
              cssOverride={{
                display: "block",
                margin: "0 auto",
              }}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "시작하기"
          )}
        </StartButton>
      </ContentContainer>
    </PageContainer>
  );
};

export default Select;
