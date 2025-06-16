import { useState, useEffect } from 'react';
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

const GameContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const GameHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const GameTitle = styled.h1`
  font-size: ${({ theme }) => theme.textSizes.title2};
  color: ${({ theme }) => theme.colors.gray100};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.gray10};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.mainT100}, ${({ theme }) => theme.colors.mainT80});
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: width 0.5s ease;
`;

const ScenarioContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.gray0};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.effects.mainShadow};
`;

const ScenarioText = styled.p`
  font-size: ${({ theme }) => theme.textSizes.headline};
  color: ${({ theme }) => theme.colors.gray100};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const ResponsesTitle = styled.h3`
  font-size: ${({ theme }) => theme.textSizes.subtitle1};
  color: ${({ theme }) => theme.colors.gray80};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ResponseOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ResponseButton = styled.button`
  position: relative;
  padding: ${({ theme }) => theme.spacing.lg};
  border: 2px solid ${({ theme, $isSelected }) => 
    $isSelected ? theme.colors.mainT100 : theme.colors.gray20};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme, $isSelected }) => 
    $isSelected ? theme.colors.mainT10 : theme.colors.gray0};
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.mainT100};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.effects.tShadow};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ResponseType = styled.span`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background-color: ${({ theme, $type }) => 
    $type === 'T' ? theme.colors.systemInfo : theme.colors.systemWin};
  color: ${({ theme }) => theme.colors.gray0};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.textSizes.caption};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ResponseText = styled.p`
  font-size: ${({ theme }) => theme.textSizes.body1};
  color: ${({ theme }) => theme.colors.gray90};
  margin: 0;
  line-height: 1.6;
`;

const OrDivider = styled.div`
  text-align: center;
  margin: ${({ theme }) => theme.spacing.md} 0;
  color: ${({ theme }) => theme.colors.gray60};
  font-size: ${({ theme }) => theme.textSizes.body2};
  position: relative;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.gray20};
  }
  
  &::before {
    left: 0;
  }
  
  &::after {
    right: 0;
  }
`;

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  font-size: ${({ theme }) => theme.textSizes.comp2};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray0};
  background-color: ${({ theme }) => theme.colors.mainT100};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.gray80};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.effects.tShadow};
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray30};
    cursor: not-allowed;
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const EvaluationResult = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.xl} 0;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme, $isCorrect }) => 
    $isCorrect ? theme.colors.systemWin10 : theme.colors.systemLose10};
  border: 1px solid ${({ theme, $isCorrect }) => 
    $isCorrect ? theme.colors.systemWin : theme.colors.systemLose};
  color: ${({ theme, $isCorrect }) => 
    $isCorrect ? theme.colors.systemWin : theme.colors.systemLose};
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const ScoreText = styled.p`
  font-size: ${({ theme }) => theme.textSizes.headline};
  font-weight: 700;
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

// Sample scenarios for the game
const scenarios = [
  {
    id: 1,
    question: '동료가 실수로 중요한 발표 자료를 망쳤을 때, 당신의 반응은?',
    thinking: '어떤 부분이 문제였는지 분석하고 개선 방안을 제안한다.',
    feeling: '동료의 기분이 얼마나 상했을지 걱정하며 위로의 말을 건넨다.'
  },
  {
    id: 2,
    question: '팀 프로젝트에서 의견이 엇갈릴 때, 당신은?',
    thinking: '각 의견의 장단점을 논리적으로 분석해 최선의 해결책을 찾는다.',
    feeling: '팀원들의 감정을 고려해 모두가 만족할 수 있는 중간 지점을 찾는다.'
  },
  {
    id: 3,
    question: '새로운 아이디어를 제시할 때, 당신은?',
    thinking: '데이터와 사실에 기반해 체계적으로 설명한다.',
    feeling: '아이디어가 사람들에게 미칠 감정적 영향을 강조한다.'
  },
  {
    id: 4,
    question: '갈등이 발생했을 때, 당신의 대처 방식은?',
    thinking: '객관적인 기준을 세우고 논리적으로 해결하려고 노력한다.',
    feeling: '상대방의 감정을 이해하고 공감하며 해결책을 모색한다.'
  },
  {
    id: 5,
    question: '의사 결정을 내릴 때, 가장 중요하게 생각하는 것은?',
    thinking: '합리성과 객관적 데이터',
    feeling: '사람들의 감정과 가치관'
  }
];

const Game = () => {
  const [currentRound, setCurrentRound] = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const [selectedResponse, setSelectedResponse] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const navigate = useNavigate();

  // Get user data from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || !userData.nickname || !userData.userType) {
      navigate('/select');
    }
  }, [navigate]);

  const handleResponseSelect = (response) => {
    setSelectedResponse(response);
  };

  const handleSubmit = () => {
    if (!selectedResponse) return;

    // Simulate AI evaluation (in a real app, this would be an API call)
    setIsEvaluating(true);
    
    // Simulate API delay
    setTimeout(() => {
      const isCorrect = Math.random() > 0.3; // 70% chance of being correct
      const score = isCorrect ? 10 : 0;
      
      setEvaluationResult({
        isCorrect,
        score,
        feedback: isCorrect 
          ? '잘하셨습니다! 당신의 선택은 반대 유형의 사고방식을 잘 반영하고 있습니다.'
          : '아쉽네요. 다음 기회에 더 잘할 수 있을 거예요!'
      });
      
      // Save the response
      const newResponse = {
        scenarioId: scenarios[currentRound].id,
        response: selectedResponse,
        isCorrect,
        score
      };
      
      setUserResponses([...userResponses, newResponse]);
      
      // Reset for next round or finish game
      setTimeout(() => {
        if (currentRound < scenarios.length - 1) {
          setCurrentRound(currentRound + 1);
          setSelectedResponse('');
          setEvaluationResult(null);
          setIsEvaluating(false);
        } else {
          // Calculate total score and navigate to results
          const totalScore = [...userResponses, newResponse].reduce(
            (sum, resp) => sum + resp.score, 0
          );
          
          // Save results to localStorage
          localStorage.setItem('gameResults', JSON.stringify({
            totalScore,
            totalRounds: scenarios.length,
            responses: [...userResponses, newResponse]
          }));
          
          navigate('/result');
        }
      }, 2000);
    }, 1000);
  };

  const currentScenario = scenarios[currentRound];
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  
  // Determine which response is which type based on user's selected type
  const isThinkingUser = userData.userType === 'T';
  const responseA = isThinkingUser ? currentScenario.feeling : currentScenario.thinking;
  const responseB = isThinkingUser ? currentScenario.thinking : currentScenario.feeling;
  const responseAType = isThinkingUser ? 'F' : 'T';
  const responseBType = isThinkingUser ? 'T' : 'F';
  const progressPercentage = ((currentRound) / scenarios.length) * 100;

  return (
    <PageContainer>
      <GameContainer>
      <GameHeader>
        <GameTitle>라운드 {currentRound + 1} / {scenarios.length}</GameTitle>
        <ProgressBar>
          <ProgressFill style={{ width: `${progressPercentage}%` }} />
        </ProgressBar>
      </GameHeader>
      
      <ScenarioContainer>
        <ScenarioText>{currentScenario.question}</ScenarioText>
        
        <ResponsesTitle>당신의 반응을 선택하세요:</ResponsesTitle>
        
        <ResponseOptions>
          <ResponseButton
            onClick={() => handleResponseSelect(responseA)}
            disabled={isEvaluating}
            $isSelected={selectedResponse === responseA}
          >
            <ResponseType $type={responseAType}>Type {responseAType}</ResponseType>
            <ResponseText>{responseA}</ResponseText>
          </ResponseButton>
          
          <OrDivider>또는</OrDivider>
          
          <ResponseButton
            onClick={() => handleResponseSelect(responseB)}
            disabled={isEvaluating}
            $isSelected={selectedResponse === responseB}
          >
            <ResponseType $type={responseBType}>Type {responseBType}</ResponseType>
            <ResponseText>{responseB}</ResponseText>
          </ResponseButton>
        </ResponseOptions>
        
        {evaluationResult && (
          <EvaluationResult $isCorrect={evaluationResult.isCorrect}>
            <p>{evaluationResult.feedback}</p>
            {evaluationResult.isCorrect && (
              <ScoreText>+{evaluationResult.score}점 획득!</ScoreText>
            )}
          </EvaluationResult>
        )}
        
        <SubmitButton 
          onClick={handleSubmit}
          disabled={!selectedResponse || isEvaluating}
        >
          {isEvaluating ? '평가 중...' : '제출하기'}
        </SubmitButton>
      </ScenarioContainer>
      </GameContainer>
    </PageContainer>
  );
};

export default Game;