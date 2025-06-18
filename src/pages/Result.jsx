import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MeBadge = styled.span`
  font-size: 12px;
  color: #6b7280;
  margin-left: 4px;
`;
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
    top_players: originalTopPlayers,
  } = summary;

  // 현재 사용자 정보를 포함한 랭킹 목록 생성
  const currentUser = {
    nickname,
    user_type,
    score: total_score, // total_score를 score로 매핑
    percentile,
    rank: parseInt(rank, 10),
  };

  // 기존 top_players의 점수 필드명을 score로 통일
  const normalizedTopPlayers = originalTopPlayers.map((player) => ({
    ...player,
    score: player.score || player.total_score,
    rank: parseInt(player.rank, 10),
  }));

  // 현재 사용자가 이미 top_players에 있는지 확인하고, 없으면 추가
  const currentUserInTopPlayers = normalizedTopPlayers.some(
    (player) => player.nickname === nickname
  );

  // 모든 플레이어 목록 생성 (중복 없이)
  const allPlayers = [
    ...normalizedTopPlayers,
    ...(currentUserInTopPlayers ? [] : [currentUser]),
  ];

  // 랭크 순서대로 정렬
  const topPlayers = allPlayers.sort((a, b) => a.rank - b.rank);

  // 평균 점수 계산 (500점 만점을 100점 만점으로 변환)
  const avg_score = (total_score / 500) * 100;

  // 사용자 유형에 따른 피드백 생성
  const getFeedback = () => {
    const is_thinking = user_type === "T";

    if (is_thinking) {
      if (avg_score >= 75) {
        return "T 유형의 사고 방식을 정말 잘 활용하고 계시네요! 논리적이고 분석적인 접근이 돋보입니다.";
      } else if (avg_score >= 50) {
        return "T 유형의 사고 방식을 잘 활용하고 계시네요. 조금 더 논리적으로 접근해보는 건 어떨까요?";
      } else {
        return "T 유형의 사고 방식을 이해하는 데 조금 어려움이 있으신 것 같아요. 논리적인 사고에 대한 이해를 높이기 위해 노력해보세요!";
      }
    } else {
      // Feeling type
      if (avg_score >= 75) {
        return "F 유형의 감정을 정말 잘 이해하고 있어요! 상대방의 감정에 공감하는 능력이 뛰어나네요.";
      } else if (avg_score >= 50) {
        return "F 유형의 감정을 잘 이해하고 있어요. 조금 더 감정적인 표현을 연습해보는 건 어떨까요?";
      } else {
        return "F 유형의 감정을 이해하는 데 조금 어려움이 있으신 것 같아요. 상대방의 감정에 더 공감하려는 노력이 필요해 보여요.";
      }
    }
  };

  const feedback = getFeedback();

  const handleRestart = () => {
    localStorage.removeItem("sessionId");
    navigate("/");
  };

  return (
    <Container>
      <Header>
        <Logo>
          너 <span>T</span>야?
        </Logo>
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
            <div>
              {" "}
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
                      stroke={
                        user_type === "F"
                          ? "var(--Main-F-70, #f59e0c)"
                          : "var(--Main-T-70, #6c6eed)"
                      }
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
                <Badge userType={user_type}>순위 {rank}위</Badge>
                <Badge userType={user_type}>
                  상위 {Math.round(percentile)}%
                </Badge>
              </BadgeContainer>
              <Description>
                {nickname}님은 상위 {Math.round(percentile)}% 정도의 {user_type}{" "}
                능력을 가졌어요.{" "}
              </Description>
            </div>
            <AnalysisSection>
              <AnalysisTitle>종합 분석</AnalysisTitle>
              <AnalysisText>{feedback}</AnalysisText>
            </AnalysisSection>
          </ScoreSection>

          <RankingSection>
            <SectionTitle>상위 랭킹</SectionTitle>
            <RankingList>
              {topPlayers.map((user, index) => (
                <RankingItem key={`${user.nickname}-${user.rank}`}>
                  <RankingLeft>
                    <RankBadge
                      rank={parseInt(user.rank, 10)}
                      user_type={user_type}
                    >
                      {parseInt(user.rank)}
                    </RankBadge>
                    <UserName>
                      {user.nickname}
                      {user.nickname === nickname && <MeBadge>(나)</MeBadge>}
                    </UserName>
                  </RankingLeft>
                  <RankingRight>
                    <TypeBadge type={user.user_type}>
                      {user.user_type}형
                    </TypeBadge>
                    <UserScore>
                      {Math.round(parseInt(user.score || user.total_score, 10))}
                      점
                    </UserScore>
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
  color: #000000;
  font-weight: 700;
  font-size: 20px;
  span {
    color: #6c6eed; /* Main/F 100 */
  }
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
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
`;

const RankingSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  max-height: 600px;
  overflow-y: auto;
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
  margin-bottom: 16px;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: ${(props) =>
    props.userType === "F"
      ? props.theme.colors.mainF10
      : props.theme.colors.mainT10};
  color: ${(props) =>
    props.userType === "F"
      ? props.theme.colors.mainF100
      : props.theme.colors.mainT100};
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
`;

const Description = styled.p`
  text-align: center;
  color: #6b7280;
  margin-bottom: 24px;
`;

const AnalysisSection = styled.div`
  margin-top: 32px;
  padding: 24px;
  background-color: #f6f6f7;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
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
    // 4위부터는 user_type에 따라 색상 변경
    if (props.rank !== 1 && props.rank !== 2 && props.rank !== 3)
      return props.user_type === "F"
        ? props.theme.colors.mainF10
        : props.theme.colors.mainT10;
    return "#dbeafe";
  }};
  color: ${(props) => {
    if (props.rank !== 1 && props.rank !== 2 && props.rank !== 3)
      return props.user_type === "F"
        ? props.theme.colors.mainF100
        : props.theme.colors.mainT100;
    return "#ffffff";
  }};
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

const TypeBadge = styled.div`
  background-color: ${(props) =>
    props.type === "F"
      ? props.theme.colors.mainF10
      : props.theme.colors.mainT10};
  color: ${(props) =>
    props.type === "F"
      ? props.theme.colors.mainF100
      : props.theme.colors.mainT100};
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  margin-right: 8px;
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
