import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getGameSummary } from "../api/summary"; // API 연결

const Result = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const sessionId = localStorage.getItem("sessionId");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getGameSummary(sessionId);
        console.log("Game summary data:", data);
        setSummary(data);
      } catch (err) {
        console.error("Error fetching game summary:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [sessionId]);

  if (loading || !summary) return <div>로딩 중...</div>;

  const {
    nickname,
    user_type,
    total_score,
    percentile,
    rank,
    top_players,
    feedback,
  } = summary;

  const handleRestart = () => {
    localStorage.removeItem("sessionId");
    navigate("/");
  };

  return (
    <Container>
      <Header>
        <Logo>너 T야?</Logo>
        <UserInfo>
          {user_type}형 {nickname}
        </UserInfo>
      </Header>

      <MainContainer>
        <TitleSection>
          <MainTitle>최종 결과</MainTitle>
          <SubTitle>AI가 당신의 위로 스타일을 분석했어요</SubTitle>
        </TitleSection>

        <ContentGrid>
          <ScoreSection>
            <SectionTitle>최종 점수</SectionTitle>
            <ChartContainer>
              <CircularChart>
                <svg width="192" height="192" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#f3f4f6"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#f59e0b"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${(total_score / 500) * 251.2} 251.2`}
                    transform="rotate(-90 50 50)"
                    style={{ transition: "stroke-dasharray 1s ease-out" }}
                  />
                </svg>
                <ScoreDisplay>
                  <MainScore>{Math.round(total_score)}점</MainScore>
                  <MaxScore>/ 500점</MaxScore>
                </ScoreDisplay>
              </CircularChart>
            </ChartContainer>

            <BadgeContainer>
              <Badge color="orange">순위 {rank}위</Badge>
              <Badge color="orange">상위 {percentile}%</Badge>
            </BadgeContainer>

            <Description>
              {user_type}인 당신! {percentile}% 정도의 반대 성향을 갖고 있어요.
            </Description>

            <AnalysisSection>
              <AnalysisTitle>종합 분석</AnalysisTitle>
              <AnalysisText>{feedback}</AnalysisText>
            </AnalysisSection>
          </ScoreSection>

          <RankingSection>
            <SectionTitle>상위 랭킹</SectionTitle>
            <RankingList>
              {top_players.map((user, index) => (
                <RankingItem
                  key={index}
                  isCurrentUser={user.nickname === nickname}
                >
                  <RankingLeft>
                    <RankBadge rank={index + 1}>{index + 1}</RankBadge>
                    <UserName>{user.nickname}</UserName>
                  </RankingLeft>
                  <RankingRight>
                    <TypeBadge type={user.user_type}>
                      {user.user_type}형
                    </TypeBadge>
                    <UserScore>{Math.round(user.score)}점</UserScore>
                  </RankingRight>
                </RankingItem>
              ))}
            </RankingList>
          </RankingSection>
        </ContentGrid>

        <ButtonContainer>
          <RestartButton onClick={handleRestart}>돌아가기</RestartButton>
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

export default Result;
