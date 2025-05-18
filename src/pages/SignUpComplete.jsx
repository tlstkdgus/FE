import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { AiOutlineCheck } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  background: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const Card = styled.div`
  width: 320px;
  height: 320px;
  border: 2px solid var(--brand);
  border-radius: 12px;
  background: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin-bottom: 32px;
`;

const CheckCircle = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--brand);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

const Title = styled.div`
  font-size: var(--title-h2);
  font-weight: var(--font-weight-bold);
  color: var(--black);
  margin-bottom: 12px;
  text-align: center;
`;

const Desc = styled.div`
  font-size: var(--body-medium-small);
  color: var(--black);
  text-align: center;
  line-height: 1.5;
`;

const Button = styled.button`
  width: 140px;
  padding: 14px 0;
  background: var(--brand);
  color: var(--white);
  font-size: var(--body-button-default);
  font-weight: var(--font-weight-semibold);
  border: none;
  border-radius: 12px;
  cursor: pointer;
`;

export default function SignUpComplete() {
  const navigate = useNavigate();
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <ContentBox>
          <Card>
            <CheckCircle>
              <AiOutlineCheck size={36} color="#fff" />
            </CheckCircle>
            <Title>회원가입이 완료되었습니다!</Title>
            <Desc>
              Scheduly가 여러분에게
              <br />
              좋은 시간표를 제안해 드릴게요!
            </Desc>
          </Card>
          <Button onClick={() => navigate("/login")}>로그인하기</Button>
        </ContentBox>
      </Wrapper>
    </>
  );
}
