import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SelectContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.gray0};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.effects.mainShadow};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

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

const Title = styled.h1`
  font-size: ${({ theme }) => theme.textSizes.title2};
  color: ${({ theme }) => theme.colors.gray100};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SelectionForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray100};
  font-size: ${({ theme }) => theme.textSizes.body1};
`;

const FormInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.textSizes.body1};
  border: 1px solid ${({ theme }) => theme.colors.gray20};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.mainT100};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.mainT10}`};
  }
`;

const TypeLabel = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray100};
  font-size: ${({ theme }) => theme.textSizes.body1};
`;

const TypeSelection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const TypeButton = styled.button`
  flex: 1;
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.md}`};
  border: 2px solid ${({ theme, $isSelected }) => 
    $isSelected ? theme.colors.mainT100 : theme.colors.gray20};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme, $isSelected }) => 
    $isSelected ? theme.colors.mainT10 : theme.colors.gray0};
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.mainT100};
    background-color: ${({ theme }) => theme.colors.mainT10};
  }
`;

const TypeLetter = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.textSizes.title3};
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.mainT100};
`;

const TypeDesc = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.textSizes.body2};
  color: ${({ theme }) => theme.colors.gray80};
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.systemWin};
  margin-top: ${({ theme }) => `-${theme.spacing.md}`};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.textSizes.caption};
  text-align: center;
`;

const StartGameButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  font-size: ${({ theme }) => theme.textSizes.comp2};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray0};
  background-color: ${({ theme }) => theme.colors.mainT100};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: center;
  margin-top: ${({ theme }) => theme.spacing.md};
  width: 100%;
  max-width: 300px;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray80};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.effects.tShadow};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray30};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const Select = () => {
  const [nickname, setNickname] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!nickname.trim()) {
      setError('닉네임을 입력해주세요.');
      return;
    }
    
    if (!selectedType) {
      setError('T/F 유형을 선택해주세요.');
      return;
    }
    
    // Save user data to localStorage or context/state management
    localStorage.setItem('userData', JSON.stringify({
      nickname,
      userType: selectedType
    }));
    
    // Navigate to game
    navigate('/game');
  };

  return (
    <PageContainer>
      <SelectContainer>
        <Title>게임 설정</Title>
      <SelectionForm onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel htmlFor="nickname">닉네임</FormLabel>
          <FormInput
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력하세요"
          />
        </FormGroup>
        
        <FormGroup>
          <TypeLabel>당신의 T/F 유형을 선택하세요</TypeLabel>
          <TypeSelection>
            <TypeButton
              type="button"
              $isSelected={selectedType === 'T'}
              onClick={() => setSelectedType('T')}
            >
              <TypeLetter>T</TypeLetter>
              <TypeDesc>(Thinking) - 논리적, 분석적</TypeDesc>
            </TypeButton>
            <TypeButton
              type="button"
              $isSelected={selectedType === 'F'}
              onClick={() => setSelectedType('F')}
            >
              <TypeLetter>F</TypeLetter>
              <TypeDesc>(Feeling) - 감정적, 공감적</TypeDesc>
            </TypeButton>
          </TypeSelection>
        </FormGroup>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <StartGameButton 
          type="submit" 
          disabled={!nickname.trim() || !selectedType}
        >
          게임 시작하기
        </StartGameButton>
      </SelectionForm>
      </SelectContainer>
    </PageContainer>
  );
};

export default Select;
