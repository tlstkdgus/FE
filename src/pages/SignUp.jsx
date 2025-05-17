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
  position: relative;
`;

const Title = styled.h1`
  margin-top: 16px;
  margin-bottom: 16px;
  font-size: var(--title-h1);
  font-weight: var(--font-weight-semibold);
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
  font-size: var(--body-default);
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

const CustomSelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Select = styled.select`
  width: 100%;
  padding: 16px 36px 16px 12px;
  border: 1px solid var(--subtext);
  border-radius: 8px;
  background: var(--white);
  font-size: var(--body-default);
  color: var(--black);
  transition: background 0.2s;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  &:focus {
    background: var(--section);
    outline: none;
  }
  &::placeholder {
    color: var(--subtext);
    font-size: var(--body-small);
    opacity: 1;
  }
`;

const SelectArrow = styled.span`
  pointer-events: none;
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  &::after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid var(--subtext);
  }
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
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

export default function SignUp() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 성공 시
    navigate("/signup-complete");
  };
  return (
    <Container>
      <FormWrapper>
        <Title>회원가입</Title>
        <Description>
          Scheduly의 서비스를 이용하기 위해
          <br />
          회원가입을 진행해 주세요
        </Description>
        <Form onSubmit={handleSubmit}>
          <Field>
            <Label htmlFor="studentId">ID(학번)</Label>
            <Input id="studentId" placeholder="학번을 입력해 주세요" />
          </Field>
          <Field>
            <Label htmlFor="password">PW</Label>
            <Input
              id="password"
              type="password"
              placeholder="영문/대소문자/특수문자 중 3가지 이상 조합, 8~16자"
            />
          </Field>
          <Field>
            <Label htmlFor="name">성함</Label>
            <Input id="name" placeholder="" />
          </Field>
          <Field>
            <Label htmlFor="major">전공</Label>
            <CustomSelectWrapper>
              <Select id="major" defaultValue="">
                <option value="" disabled>
                  전공을 선택하세요
                </option>
                <option value="Global Business & Technology전공">
                  Global Business & Technology전공
                </option>
                <option value="러시아학과">러시아학과</option>
                <option value="언어인지과학과">언어인지과학과</option>
                {/* 데이터 추가 예정 */}
              </Select>
              <SelectArrow />
            </CustomSelectWrapper>
          </Field>
          <Field>
            <Label htmlFor="minor">이중 / 부전공</Label>
            <CustomSelectWrapper>
              <Select id="minor" defaultValue="">
                <option value="" disabled>
                  이중/부전공을 선택하세요
                </option>
                <option value="없음">없음</option>
                <option value="Global Business & Technology전공">
                  Global Business & Technology전공
                </option>
                <option value="러시아학과">러시아학과</option>
                <option value="언어인지과학과">언어인지과학과</option>
                {/* 데이터 추가 예정 */}
              </Select>
              <SelectArrow />
            </CustomSelectWrapper>
          </Field>
          <Row>
            <Field style={{ flex: 1 }}>
              <Label htmlFor="grade">학년</Label>
              <CustomSelectWrapper>
                <Select id="grade" defaultValue="">
                  <option value="" disabled>
                    학년
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </Select>
                <SelectArrow />
              </CustomSelectWrapper>
            </Field>
            <Field style={{ flex: 1 }}>
              <Label htmlFor="semester">학기</Label>
              <CustomSelectWrapper>
                <Select id="semester" defaultValue="">
                  <option value="" disabled>
                    학기
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </Select>
                <SelectArrow />
              </CustomSelectWrapper>
            </Field>
          </Row>
          <Button type="submit">Sign Up</Button>
        </Form>
      </FormWrapper>
    </Container>
  );
}
