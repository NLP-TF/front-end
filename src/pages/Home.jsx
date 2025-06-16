import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FaTimes } from "react-icons/fa";

// Breakpoint
const tablet = "1024px";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #f8f9ff;
  min-height: 100vh;
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #f8f9ff;
  display: flex;
  justify-content: center;
  align-items: stretch;
  padding: 32px 0; /* Remove horizontal padding */

  @media (min-width: ${tablet}) {
    padding: 44px 0; /* Remove horizontal padding */
    min-height: 100vh;
    align-items: center;
  }
`;

const ContentBox = styled.div`
  width: 100%;
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  border-radius: 32px;
  overflow: hidden; /* Keep this to contain child border radius */
  margin: 0 auto;
  min-width: 0; /* Important for flex children */
  background: #f8f9ff; /* Match the page background */
  flex: 1; /* Take up all available space */

  @media (min-width: ${tablet}) {
    flex-direction: row;
    border-radius: 48px;
    width: 100%; /* Changed from 90% to 100% */
    max-width: 1440px;
    min-height: 700px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
`;

const LeftPanel = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center vertically */
  background: #f8f9ff;
  padding: 32px 24px;
  min-width: 0; /* Crucial for text truncation */
  width: 100%;
  overflow: hidden; /* Prevents content from overflowing */
  border-radius: 32px 32px 0 0; /* Top rounded corners for mobile */

  @media (min-width: ${tablet}) {
    padding: 40px 60px; /* Reduced vertical padding since we're centering */
    border-radius: 48px 0 0 48px; /* Left side rounded corners for tablet+ */
    justify-content: center; /* Center vertically for desktop */
    background: #ffffff;
  }
`;

const Title = styled.h1`
  color: #6c6eed;
  font-size: 32px;
  font-weight: bold;
  margin: 0 0 8px 0;

  @media (min-width: ${tablet}) {
    font-size: 40px;
  }
`;

const Description = styled.p`
  ${({ theme }) => `
    font-size: ${theme.textStyles.body16SB.fontSize};
    font-weight: ${theme.textStyles.body16SB.fontWeight};
    line-height: ${theme.textStyles.body16SB.lineHeight};
    letter-spacing: ${theme.textStyles.body16SB.letterSpacing};
    color: #4B5563;
    margin-bottom: 32px;
    white-space: pre-line;
  `}

  @media (min-width: ${tablet}) {
    font-size: ${({ theme }) => theme.textStyles.subtitle22SB.fontSize};
    font-weight: ${({ theme }) => theme.textStyles.subtitle22SB.fontWeight};
    line-height: ${({ theme }) => theme.textStyles.subtitle22SB.lineHeight};
    letter-spacing: ${({ theme }) =>
      theme.textStyles.subtitle22SB.letterSpacing};
    margin-bottom: 40px;
  }
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0 0 24px 0;
  max-width: 100%;

  @media (min-width: ${tablet}) {
    max-width: 320px;
  }
`;

const Button = styled.button`
  align-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  border: none;

  &:active {
    transform: scale(0.98);
  }

  @media (min-width: ${tablet}) {
    padding: 16px 24px;
    font-size: 18px;
    border-radius: 10px;
  }
`;

const PrimaryButton = styled(Button)`
  background: #6c6eed;
  color: #fbfbfb;

  &:hover {
    background: #5d5fef;
  }
`;

const SecondaryButton = styled(Button)`
  background: #fbfbfb;
  color: #4b5563;
  border: 1px solid #d6d8dc;

  @media (min-width: ${tablet}) {
    border-width: 2px;
  }

  &:hover {
    background: #f3f4f6;
  }
`;

const RightPanel = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #6c6eed, #f59e0c);
  padding: 22px 16px;
  border-radius: 32px 32px 0 0;
  margin-top: -20px;
  position: relative;
  z-index: 1;
  min-width: 0;
  width: 100%;

  @media (min-width: ${tablet}) {
    border-radius: 0 48px 48px 0; /* Right side rounded corners */
    margin: 0;
    padding: 0;
    flex: 0 0 400px; /* Fixed width */
    min-width: 500px; /* Same as flex-basis */
    max-width: 500px; /* Same as flex-basis */
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 0 16px;
  margin: 0 auto;
  height: 100%;

  @media (min-width: ${tablet}) {
    gap: 32px;
    padding: 0 60px;
    max-height: 100%;
    justify-content: center;
  }
`;

const ImageTitle = styled.h2`
  color: #fbfbfb;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin: 0;
  padding: 0 16px;

  @media (min-width: ${tablet}) {
    font-size: 22px;
    padding: 0;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  margin: 0;
  padding: 0 16px;

  @media (min-width: ${tablet}) {
    margin: 0 5px;
    padding: 0;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: contain;
  object-position: center;
  border-radius: 8px;
  aspect-ratio: 1.25; /* Maintain original image aspect ratio */

  @media (min-width: ${tablet}) {
    max-height: 500px;
    width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: 8px;
  }
`;

const RulesHint = styled.div`
  align-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  border: 1px solid #ffffff;
  padding: 8px 16px;
  margin: 0 16px;
  cursor: pointer;
  transition: all 0.2s;
  height: 40px;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  @media (min-width: ${tablet}) {
    margin: 0 60px;
    padding: 8px 24px;
  }
`;

const RulesText = styled.span`
  color: #fbfbfb;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  width: 100%;

  @media (min-width: ${tablet}) {
    font-size: 16px;
  }
`;

// Modal styles
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
  padding: 12px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 24px;
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  animation: ${slideIn} 0.3s ease-out;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
  border-radius: 24px 24px 0 0;
  @media (min-width: ${tablet}) {
    padding: 24px;
  }
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #111827;
  margin: 0;
  @media (min-width: ${tablet}) {
    font-size: 24px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6b7280;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: #f3f4f6;
    color: #374151;
  }
`;

const ModalBody = styled.div`
  padding: 24px 24px 24px;
`;

const RulesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
`;

const RuleItem = styled.li`
  display: flex;
  margin-bottom: 16px;
  align-items: flex-start;
`;

const RuleNumber = styled.span`
  background: #6c6eed;
  color: white;
  font-size: 14px;
  font-weight: bold;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 12px;
  margin-top: 2px;
`;

const RuleText = styled.p`
  font-size: 16px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
`;

const NoteBox = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 16px;
  margin-top: 24px;
  border-left: 4px solid #6c6eed;
`;

const NoteTitle = styled.div`
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NoteText = styled.p`
  margin: 0;
  color: #4b5563;
  font-size: 15px;
  line-height: 1.6;
  white-space: pre-line;
`;

const Home = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartClick = () => {
    navigate("/select");
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Container>
      <PageWrapper>
        <ContentBox>
          <LeftPanel>
            <Title>너 T야?</Title>
            <Description>
              {"MBTI의 T/F 유형별 위로 스타일을\n판단하는 시뮬레이션 게임"}
            </Description>
            <ButtonGroup>
              <PrimaryButton onClick={handleStartClick}>
                게임 시작하기
              </PrimaryButton>
              <SecondaryButton onClick={toggleModal}>
                게임 규칙 보기
              </SecondaryButton>
            </ButtonGroup>
          </LeftPanel>

          <RightPanel>
            <ImageContainer>
              <ImageTitle>
                AI가 당신의 위로 스타일을
                <br />
                분석하고 점수화해요
              </ImageTitle>
              <ImageWrapper>
                <StyledImage
                  src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/J8I8UMtsQN/ritkf71q_expires_30_days.png"
                  alt="게임 일러스트레이션"
                />
              </ImageWrapper>
              <RulesHint onClick={toggleModal}>
                <RulesText>클릭하여 규칙을 확인하세요</RulesText>
              </RulesHint>
            </ImageContainer>
          </RightPanel>
        </ContentBox>
      </PageWrapper>

      {isModalOpen && (
        <ModalOverlay onClick={toggleModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>게임 규칙</ModalTitle>
              <CloseButton onClick={toggleModal} aria-label="닫기">
                <FaTimes />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <RulesList>
                <RuleItem>
                  <RuleNumber>1</RuleNumber>
                  <RuleText>
                    당신의 MBTI 유형 중 T(사고형)와 F(감정형) 중 하나를
                    선택해요.
                  </RuleText>
                </RuleItem>
                <RuleItem>
                  <RuleNumber>2</RuleNumber>
                  <RuleText>
                    총 5라운드로 구성되며 각 라운드마다 위로의 상황이 제시돼요.
                  </RuleText>
                </RuleItem>
                <RuleItem>
                  <RuleNumber>3</RuleNumber>
                  <RuleText>
                    선택한 유형과 반대되는 스타일의 위로를 제시해요.
                  </RuleText>
                </RuleItem>
                <RuleItem>
                  <RuleNumber>4</RuleNumber>
                  <RuleText>
                    AI가 반대 유형의 특성을 얼마나 잘 표현했는지 점수로
                    평가해요.
                  </RuleText>
                </RuleItem>
                <RuleItem>
                  <RuleNumber>5</RuleNumber>
                  <RuleText>
                    각 라운드는 100점 만점이며, 총점 500점을 목표로 게임을
                    진행해요.
                  </RuleText>
                </RuleItem>
                <RuleItem>
                  <RuleNumber>6</RuleNumber>
                  <RuleText>
                    최종 점수에 따른 랭킹과 위로 스타일에 대한 분석 결과를
                    확인할 수 있어요.
                  </RuleText>
                </RuleItem>
              </RulesList>
              <NoteBox>
                <NoteTitle>💡 알아두세요!</NoteTitle>
                <NoteText>
                  {
                    "이 게임은 KoBERT 기반 분류 모델을 사용하여 문장의 T/F 특성을 분석합니다.\n재미로 즐기는 게임이니 너무 진지하게 받아들이지 마세요!"
                  }
                </NoteText>
              </NoteBox>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Home;
