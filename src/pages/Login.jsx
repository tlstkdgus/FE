import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  max-width: 440px;
  min-width: 320px;
  margin: 0 auto;
  background: var(--white);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const Title = styled.h1`
  margin-top: 32px;
  margin-bottom: 16px;
  font-size: var(--display-large);
  font-weight: var(--font-weight-bold);
`;

const Description = styled.div`
  color: var(--black);
  font-size: var(--body-default);
  margin-bottom: 32px;
  line-height: 1.5;
`;

const FormWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: var(--title-h2);
  font-weight: var(--font-weight-semibold);
  margin-bottom: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 12px;
  border: 1px solid var(--subtext);
  border-radius: 8px;
  background: var(--white);
  font-size: var(--body-default);
  transition: background 0.2s;
  &::placeholder {
    color: var(--subtext);
    font-size: var(--body-small);
    opacity: 1;
  }
  &:focus {
    background: var(--section);
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 18px 0;
  background: var(--brand);
  color: var(--white);
  font-size: var(--body-button-default);
  font-weight: var(--font-weight-semibold);
  border: none;
  border-radius: 10px;
  margin-top: 32px;
  margin-bottom: 0;
  cursor: pointer;
`;

const GoogleButton = styled.button`
  width: 100%;
  padding: 16px 0;
  background: var(--subcolor);
  color: var(--brand);
  font-size: var(--body-button-default);
  font-weight: var(--font-weight-semibold);
  border: 1.5px solid var(--brand);
  border-radius: 10px;
  margin-top: 16px;
  margin-bottom: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const BottomText = styled.div`
  margin-top: 32px;
  text-align: center;
  font-size: var(--body-default);
  color: var(--black);
`;

const SignUpLink = styled.span`
  color: var(--brand);
  font-weight: var(--font-weight-semibold);
  margin-left: 8px;
  cursor: pointer;
`;

const GoogleLogo = styled.div`
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 50%;
  padding: 4px;
  svg {
    width: 100%;
    height: 100%;
  }
`;

export default function Login() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 처리 로직
  };
  return (
    <Container>
      <FormWrapper>
        <Title>로그인</Title>
        <Description>
          Scheduly의 서비스를 이용하기 위해
          <br />
          로그인을 진행해 주세요
        </Description>
        <Form onSubmit={handleSubmit}>
          <Field>
            <Label htmlFor="id">ID (학번)</Label>
            <Input
              id="id"
              placeholder="아이디를 입력해 주세요"
              autoComplete="username"
            />
          </Field>
          <Field>
            <Label htmlFor="pw">PW</Label>
            <Input
              id="pw"
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              autoComplete="current-password"
            />
          </Field>
          <Button type="submit">Login</Button>
        </Form>
        <GoogleButton type="button">
          <GoogleLogo>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="22"
              height="22"
              viewBox="0 0 48 48"
            >
              <path
                fill="#fbc02d"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#e53935"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4caf50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1565c0"
                d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
          </GoogleLogo>
          학교 계정으로 로그인
        </GoogleButton>
        <BottomText>
          아직 가입하지 않으셨나요?
          <SignUpLink onClick={() => navigate("/signup")}>회원가입</SignUpLink>
        </BottomText>
      </FormWrapper>
    </Container>
  );
}
