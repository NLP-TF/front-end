import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

const ResultContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const ResultHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const ResultTitle = styled.h1`
  font-size: ${({ theme }) => theme.textSizes.title1};
  color: ${({ theme }) => theme.colors.gray100};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const WelcomeMessage = styled.p`
  font-size: ${({ theme }) => theme.textSizes.subtitle1};
  color: ${({ theme }) => theme.colors.gray80};
`;

const ScoreSummary = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

const ScoreCard = styled.div`
  background-color: ${({ theme }) => theme.colors.gray0};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  box-shadow: ${({ theme }) => theme.effects.mainShadow};
  width: 250px;
  
  h3 {
    font-size: ${({ theme }) => theme.textSizes.subtitle2};
    color: ${({ theme }) => theme.colors.gray80};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  .score {
    font-size: ${({ theme }) => theme.textSizes.display1};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.mainT100};
    margin: ${({ theme }) => theme.spacing.sm} 0;
    
    span {
      font-size: ${({ theme }) => theme.textSizes.headline};
      color: ${({ theme }) => theme.colors.gray60};
      margin-left: ${({ theme }) => theme.spacing.xs};
    }
  }
  
  .percentage {
    font-size: ${({ theme }) => theme.textSizes.title3};
    color: ${({ theme }) => theme.colors.gray80};
    font-weight: 600;
  }
  
  .rank-number {
    font-size: ${({ theme }) => theme.textSizes.display1};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.mainT100};
    margin: ${({ theme }) => theme.spacing.sm} 0;
    
    span {
      font-size: ${({ theme }) => theme.textSizes.headline};
      color: ${({ theme }) => theme.colors.gray60};
      margin-left: ${({ theme }) => theme.spacing.xs};
    }
  }
  
  .percentile {
    font-size: ${({ theme }) => theme.textSizes.title3};
    color: ${({ theme }) => theme.colors.gray80};
    font-weight: 600;
  }
`;

const PerformanceSection = styled.div`
  background-color: ${({ theme }) => theme.colors.gray0};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  box-shadow: ${({ theme }) => theme.effects.mainShadow};
  
  h3 {
    font-size: ${({ theme }) => theme.textSizes.subtitle1};
    color: ${({ theme }) => theme.colors.gray100};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  p {
    font-size: ${({ theme }) => theme.textSizes.body1};
    color: ${({ theme }) => theme.colors.gray80};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    line-height: 1.6;
  }
`;

const PerformanceBar = styled.div`
  height: 12px;
  background-color: ${({ theme }) => theme.colors.gray10};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const PerformanceFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.mainT100}, ${({ theme }) => theme.colors.mainT80});
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: width 1s ease;
`;

const TypeAnalysis = styled.div`
  background-color: ${({ theme }) => theme.colors.gray0};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  box-shadow: ${({ theme }) => theme.effects.mainShadow};
  
  h3 {
    font-size: ${({ theme }) => theme.textSizes.subtitle1};
    color: ${({ theme }) => theme.colors.gray100};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    text-align: center;
  }
`;

const TypeCards = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const TypeCard = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray0};
  border: 2px solid ${({ theme, $isUserType }) => 
    $isUserType ? theme.colors.mainT100 : theme.colors.gray20};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  transition: all 0.3s ease;
  
  h4 {
    font-size: ${({ theme }) => theme.textSizes.subtitle2};
    color: ${({ theme, $isUserType }) => 
      $isUserType ? theme.colors.mainT100 : theme.colors.gray100};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  
  p {
    font-size: ${({ theme }) => theme.textSizes.body2};
    color: ${({ theme }) => theme.colors.gray70};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    min-height: 3em;
  }
  
  .type-percentage {
    height: 8px;
    background-color: ${({ theme }) => theme.colors.gray10};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    overflow: hidden;
  }
  
  .type-fill {
    height: 100%;
    background: linear-gradient(90deg, ${({ theme, $type }) => 
      $type === 'T' ? theme.colors.systemInfo : theme.colors.systemWin}, 
      ${({ theme, $type }) => $type === 'T' ? theme.colors.systemInfo80 : theme.colors.systemWin80});
    border-radius: ${({ theme }) => theme.borderRadius.full};
    transition: width 1s ease;
  }
  
  span {
    display: block;
    font-size: ${({ theme }) => theme.textSizes.body1};
    font-weight: 600;
    color: ${({ theme, $type }) => 
      $type === 'T' ? theme.colors.systemInfo : theme.colors.systemWin};
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.effects.tShadow};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled.button`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xxl}`};
  font-size: ${({ theme }) => theme.textSizes.comp2};
  font-weight: 600;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.effects.tShadow};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const PrimaryButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.mainT100};
  color: ${({ theme }) => theme.colors.gray0};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.mainT80};
  }
`;

const SecondaryButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.gray0};
  color: ${({ theme }) => theme.colors.mainT100};
  border: 2px solid ${({ theme }) => theme.colors.mainT100};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.mainT10};
  }
`;

const ShareSection = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  
  p {
    font-size: ${({ theme }) => theme.textSizes.subtitle2};
    color: ${({ theme }) => theme.colors.gray80};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const ShareButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ShareButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.textSizes.headline};
  color: ${({ theme }) => theme.colors.gray0};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.effects.tShadow};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &.twitter {
    background-color: #1DA1F2;
  }
  
  &.facebook {
    background-color: #1877F2;
  }
  
  &.kakao {
    background-color: #FEE500;
    color: #000000;
  }
`;

const Loading = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.textSizes.headline};
  color: ${({ theme }) => theme.colors.gray80};
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.textSizes.headline};
  color: ${({ theme }) => theme.colors.systemLose};
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

const Result = () => {
  const [results, setResults] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data and results from localStorage
    const savedUserData = localStorage.getItem('userData');
    const savedResults = localStorage.getItem('gameResults');
    
    if (!savedUserData || !savedResults) {
      navigate('/');
      return;
    }
    
    setUserData(JSON.parse(savedUserData));
    
    try {
      const parsedResults = JSON.parse(savedResults);
      setResults(parsedResults);
    } catch (error) {
      console.error('Error parsing results:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handlePlayAgain = () => {
    // Clear only the game results, keep user data
    localStorage.removeItem('gameResults');
    navigate('/game');
  };

  const handleNewGame = () => {
    // Clear all data and start over
    localStorage.clear();
    navigate('/');
  };

  if (loading) {
    return <Loading>결과를 불러오는 중...</Loading>;
  }

  if (!results || !userData) {
    return <ErrorMessage>결과를 불러올 수 없습니다.</ErrorMessage>;
  }

  const { nickname, userType } = userData;
  const { totalScore, totalRounds } = results;
  
  // Calculate percentage and rank (mock data)
  const percentage = Math.round((totalScore / (totalRounds * 10)) * 100);
  const rank = Math.ceil(Math.random() * 100); // Mock rank
  
  // Determine performance message
  let performanceMessage = '';
  if (percentage >= 80) {
    performanceMessage = '완벽해요! 당신은 반대 유형의 사고방식을 훌륭하게 이해하고 계시네요!';
  } else if (percentage >= 50) {
    performanceMessage = '잘 하셨습니다! 조금 더 연습하면 더 좋은 결과를 얻을 수 있을 거예요.';
  } else {
    performanceMessage = '조금 더 노력이 필요해 보여요. 다시 도전해보세요!';
  }

  return (
    <PageContainer>
      <ResultContainer>
      <ResultHeader>
        <ResultTitle>게임 결과</ResultTitle>
        <WelcomeMessage>{nickname}님의 T/F 역전 게임 결과입니다.</WelcomeMessage>
      </ResultHeader>
      
      <ScoreSummary>
        <ScoreCard>
          <h3>총점</h3>
          <p className="score">{totalScore}<span>/{totalRounds * 10}</span></p>
          <p className="percentage">{percentage}%</p>
        </ScoreCard>
        
        <ScoreCard>
          <h3>순위</h3>
          <p className="rank-number">{rank}<span>위</span></p>
          <p className="percentile">상위 {100 - rank}%</p>
        </ScoreCard>
      </ScoreSummary>
      
      <PerformanceSection>
        <h3>성과 분석</h3>
        <p>{performanceMessage}</p>
        <PerformanceBar>
          <PerformanceFill style={{ width: `${percentage}%` }} />
        </PerformanceBar>
      </PerformanceSection>
      
      <TypeAnalysis>
        <h3>T/F 유형 분석</h3>
        <TypeCards>
          <TypeCard $isUserType={userType === 'T'} $type="T">
            <h4>당신의 유형 (T)</h4>
            <p>논리적, 분석적, 객관적</p>
            <div className="type-percentage">
              <div 
                className="type-fill" 
                style={{ width: `${userType === 'T' ? 70 : 30}%` }}
                $type="T"
              ></div>
            </div>
            <span>{userType === 'T' ? '70%' : '30%'}</span>
          </TypeCard>
          
          <TypeCard $isUserType={userType === 'F'} $type="F">
            <h4>도전 유형 (F)</h4>
            <p>감정적, 공감적, 관계 지향적</p>
            <div className="type-percentage">
              <div 
                className="type-fill" 
                style={{ width: `${userType === 'F' ? 70 : 30}%` }}
                $type="F"
              ></div>
            </div>
            <span>{userType === 'F' ? '70%' : '30%'}</span>
          </TypeCard>
        </TypeCards>
      </TypeAnalysis>
      
      <ActionButtons>
        <PrimaryButton onClick={handlePlayAgain}>
          다시 플레이하기
        </PrimaryButton>
        <SecondaryButton onClick={handleNewGame}>
          새 게임 시작하기
        </SecondaryButton>
      </ActionButtons>
      
      <ShareSection>
        <p>결과를 공유해보세요!</p>
        <ShareButtons>
          <ShareButton className="twitter" aria-label="트위터로 공유">
            🐦
          </ShareButton>
          <ShareButton className="facebook" aria-label="페이스북으로 공유">
            👍
          </ShareButton>
          <ShareButton className="kakao" aria-label="카카오톡으로 공유">
            K
          </ShareButton>
        </ShareButtons>
      </ShareSection>
      </ResultContainer>
    </PageContainer>
  );
};

export default Result;