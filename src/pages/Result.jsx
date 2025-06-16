import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const GameResultPage = () => {
  // 샘플 데이터
  const userScore = 430;
  const maxScore = 750;
  const userType = "F형";
  const percentile = 62;
  const rankings = [
    { rank: 1, name: "김서연", type: "T형", score: 485 },
    { rank: 2, name: "이진우", type: "F형", score: 460 },
    { rank: 3, name: "박정한", type: "T형", score: 455 },
    { rank: 4, name: "박정한", type: "T형", score: 453 },
    { rank: 5, name: "박정한", type: "T형", score: 451 },
    { rank: 30, name: "김은옥", type: "T형", score: 430 },
  ];

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Container>
      {/* 헤더 */}
      <Header>
        <Logo>너 T야?</Logo>
        <UserInfo>F형</UserInfo>
      </Header>

      {/* 메인 컨테이너 */}
      <MainContainer>
        {/* 타이틀 */}
        <TitleSection>
          <MainTitle>최종 결과</MainTitle>
          <SubTitle>AI가 당신의 위로 스타일을 분석했어요</SubTitle>
        </TitleSection>

        {/* 메인 콘텐츠 */}
        <ContentGrid>
          {/* 왼쪽: 점수 및 분석 */}
          <ScoreSection>
            <SectionTitle>최종 점수</SectionTitle>

            {/* 점수 원형 차트 */}
            <ChartContainer>
              <CircularChart>
                <svg width="192" height="192" viewBox="0 0 100 100">
                  {/* 배경 원 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#f3f4f6"
                    strokeWidth="8"
                    fill="none"
                  />
                  {/* 진행률 원 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#f59e0b"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${(userScore / maxScore) * 251.2} 251.2`}
                    transform="rotate(-90 50 50)"
                    style={{
                      transition: "stroke-dasharray 1s ease-out",
                    }}
                  />
                </svg>
                <ScoreDisplay>
                  <MainScore>{userScore}점</MainScore>
                  <MaxScore>/ {maxScore}점</MaxScore>
                </ScoreDisplay>
              </CircularChart>
            </ChartContainer>

            {/* 백분위 정보 */}
            <BadgeContainer>
              <Badge color="orange">순위 2위</Badge>
              <Badge color="orange">상위 {percentile}%</Badge>
            </BadgeContainer>

            <Description>F인 당신! 62%정도의 T 능력을 가졌어요</Description>

            {/* 종합 분석 */}
            <AnalysisSection>
              <AnalysisTitle>종합 분석</AnalysisTitle>
              <AnalysisText>
                당신은 F형의 특성이 강하게 나타나므로 T형의 위로 방식을 이해하고
                학습하면 더 다양한 상황에서 효과적으로 소통할 수 있을 거예요!
              </AnalysisText>
            </AnalysisSection>
          </ScoreSection>

          {/* 오른쪽: 순위 */}
          <RankingSection>
            <SectionTitle>상위 랭킹</SectionTitle>

            <RankingList>
              {rankings.map((user, index) => (
                <RankingItem key={index} isCurrentUser={user.name === "김은옥"}>
                  <RankingLeft>
                    <RankBadge rank={user.rank}>{user.rank}</RankBadge>
                    <UserName>{user.name}</UserName>
                  </RankingLeft>
                  <RankingRight>
                    <TypeBadge type={user.type}>{user.type}</TypeBadge>
                    <UserScore>{user.score}점</UserScore>
                  </RankingRight>
                </RankingItem>
              ))}
            </RankingList>
          </RankingSection>
        </ContentGrid>

        {/* 다시하기 버튼 */}
        <ButtonContainer>
          <RestartButton onClick={handleGoBack}>돌아가기</RestartButton>
        </ButtonContainer>
      </MainContainer>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const Logo = styled.div`
  color: #2563eb;
  font-weight: 700;
  font-size: 20px;
`;

const UserInfo = styled.div`
  color: #6b7280;
  font-size: 14px;
`;

const MainContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TitleSection = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const MainTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
`;

const SubTitle = styled.p`
  color: #6b7280;
  font-size: 16px;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ScoreSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const RankingSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 24px;
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`;

const CircularChart = styled.div`
  position: relative;
  width: 192px;
  height: 192px;
`;

const ScoreDisplay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const MainScore = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #111827;
`;

const MaxScore = styled.div`
  color: #6b7280;
  font-size: 14px;
`;

const BadgeContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: ${(props) =>
    props.color === "orange" ? "#fed7aa" : "#dbeafe"};
  color: ${(props) => (props.color === "orange" ? "#c2410c" : "#1d4ed8")};
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
`;

const Description = styled.p`
  text-align: center;
  color: #6b7280;
  margin-bottom: 32px;
`;

const AnalysisSection = styled.div`
  margin-top: 32px;
`;

const AnalysisTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 12px;
`;

const AnalysisText = styled.p`
  color: #374151;
  line-height: 1.6;
`;

const RankingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RankingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 8px;
  background-color: ${(props) => (props.isCurrentUser ? "#fff7ed" : "#f9fafb")};
  border: ${(props) => (props.isCurrentUser ? "1px solid #fed7aa" : "none")};
`;

const RankingLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const RankBadge = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: white;
  background-color: ${(props) => {
    if (props.rank === 1) return "#fbbf24";
    if (props.rank === 2) return "#9ca3af";
    if (props.rank === 3) return "#fb923c";
    if (props.rank === 30) return "#fed7aa";
    return "#dbeafe";
  }};
  color: ${(props) => (props.rank === 30 ? "#c2410c" : "white")};
`;

const UserName = styled.div`
  font-weight: 500;
  color: #111827;
`;

const RankingRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TypeBadge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${(props) =>
    props.type === "T형" ? "#dbeafe" : "#dcfce7"};
  color: ${(props) => (props.type === "T형" ? "#1d4ed8" : "#166534")};
`;

const UserScore = styled.span`
  font-weight: 700;
  color: #111827;
`;

const ButtonContainer = styled.div`
  text-align: center;
`;

const RestartButton = styled.button`
  background-color: #e5e7eb;
  color: #374151;
  font-weight: 600;
  padding: 12px 32px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #d1d5db;
  }
`;

export default GameResultPage;
