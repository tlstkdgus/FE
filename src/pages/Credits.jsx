import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const Content = styled.div`
  padding: 24px 16px;
`;

const Title = styled.h1`
  font-size: var(--title-h1);
  font-weight: var(--font-weight-bold);
  color: var(--black);
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: var(--body-default);
  color: var(--subtext);
  margin-bottom: 32px;
  line-height: 1.5;
`;

const Card = styled.div`
  background: var(--white);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
`;

const SectionTitle = styled.h2`
  font-size: var(--title-h2);
  font-weight: var(--font-weight-bold);
  color: var(--black);
  margin-bottom: 16px;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: var(--body-default);
  font-weight: var(--font-weight-semibold);
  color: var(--black);
  margin-bottom: 8px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: var(--body-default);
  background: var(--white);
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand);
    box-shadow: 0 0 0 3px rgba(48, 95, 248, 0.1);
  }

  &::placeholder {
    color: var(--subtext);
  }
`;

const Unit = styled.span`
  font-size: var(--body-default);
  color: var(--subtext);
  font-weight: var(--font-weight-medium);
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 12px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, var(--brand) 0%, #667eea 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
  width: ${(props) => Math.min(props.percentage, 100)}%;
`;

const ProgressText = styled.div`
  font-size: var(--body-small);
  color: var(--subtext);
  margin-top: 8px;
  text-align: center;
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 16px;
  background: var(--brand);
  color: var(--white);
  border: none;
  border-radius: 12px;
  font-size: var(--body-button-default);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(48, 95, 248, 0.3);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(48, 95, 248, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #d1d5db;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const InfoCard = styled.div`
  background: linear-gradient(135deg, var(--subcolor) 0%, #e6f0ff 100%);
  border: 2px solid var(--brand);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
`;

const InfoText = styled.p`
  font-size: var(--body-default);
  color: var(--black);
  margin: 0;
  line-height: 1.5;
`;

export default function Credits() {
  const navigate = useNavigate();
  const [credits, setCredits] = useState({
    completed: "", // 이수 학점
    total: "", // 총 졸업 학점
  });
  const [savedCredits, setSavedCredits] = useState(null);

  // 컴포넌트 마운트 시 저장된 학점 정보 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("userCredits");
    if (saved) {
      const parsedCredits = JSON.parse(saved);
      setCredits(parsedCredits);
      setSavedCredits(parsedCredits);
    } else {
      // 기본값 설정 (실제로는 API에서 가져와야 함)
      const defaultCredits = {
        completed: "109",
        total: "134",
      };
      setCredits(defaultCredits);
      setSavedCredits(defaultCredits);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // 숫자만 입력 가능하도록 필터링
    if (value === "" || /^\d+$/.test(value)) {
      setCredits((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    if (!credits.completed || !credits.total) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (parseInt(credits.completed) > parseInt(credits.total)) {
      alert("이수 학점이 총 졸업 학점보다 클 수 없습니다.");
      return;
    }

    // localStorage에 저장 (실제로는 API 호출)
    localStorage.setItem("userCredits", JSON.stringify(credits));
    setSavedCredits(credits);
    alert("학점 정보가 저장되었습니다.");
    navigate("/main");
  };

  const completedNum = parseInt(credits.completed) || 0;
  const totalNum = parseInt(credits.total) || 1;
  const percentage = (completedNum / totalNum) * 100;
  const remaining = Math.max(totalNum - completedNum, 0);

  return (
    <Container>
      <Content>
        <Title>이수 학점 설정</Title>
        <Description>
          현재까지 이수한 학점과 졸업 요구 학점을 설정해주세요.
        </Description>

        <InfoCard>
          <InfoText>
            💡 <strong>이수 학점</strong>: 현재까지 취득한 총 학점 수<br />
            📚 <strong>졸업 학점</strong>: 졸업을 위해 필요한 총 학점 수
          </InfoText>
        </InfoCard>

        <Card>
          <SectionTitle>학점 정보</SectionTitle>

          <InputGroup>
            <Label htmlFor="completed">현재 이수 학점</Label>
            <InputWrapper>
              <Input
                id="completed"
                name="completed"
                type="text"
                value={credits.completed}
                onChange={handleInputChange}
                placeholder="109"
                maxLength="3"
              />
              <Unit>학점</Unit>
            </InputWrapper>
          </InputGroup>

          <InputGroup>
            <Label htmlFor="total">총 졸업 학점</Label>
            <InputWrapper>
              <Input
                id="total"
                name="total"
                type="text"
                value={credits.total}
                onChange={handleInputChange}
                placeholder="134"
                maxLength="3"
              />
              <Unit>학점</Unit>
            </InputWrapper>
          </InputGroup>

          {credits.completed && credits.total && (
            <>
              <ProgressBar>
                <ProgressFill percentage={percentage} />
              </ProgressBar>
              <ProgressText>
                졸업까지 <strong>{remaining}학점</strong> 남았습니다 (
                {percentage.toFixed(1)}% 완료)
              </ProgressText>
            </>
          )}
        </Card>

        <SaveButton onClick={handleSave}>학점 정보 저장</SaveButton>
      </Content>
    </Container>
  );
}
