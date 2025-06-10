import React, { useState } from "react";
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

  const [formData, setFormData] = useState({
    student_id: "",
    password: "",
    name: "",
    college: "",
    major: "",
    doubleMajorType: "",
    double_major: "",
    modules: [],
    grade: 0,
    semester: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // API 호출을 위한 데이터 준비
    const submitData = {
      ...formData,
      grade: parseInt(formData.grade) || 0,
      semester: parseInt(formData.semester) || 0,
    };

    console.log("회원가입 데이터:", submitData);

    // TODO: API 호출 구현
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
        </Description>{" "}
        <Form onSubmit={handleSubmit}>
          <Field>
            <Label htmlFor="student_id">ID(학번)</Label>
            <Input
              id="student_id"
              name="student_id"
              value={formData.student_id}
              onChange={handleInputChange}
              placeholder="학번을 입력해 주세요"
              required
            />
          </Field>
          <Field>
            <Label htmlFor="password">PW</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="영문/대소문자/특수문자 중 3가지 이상 조합, 8~16자"
              required
            />
          </Field>
          <Field>
            <Label htmlFor="name">성함</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="이름을 입력해 주세요"
              required
            />
          </Field>
          <Field>
            <Label htmlFor="college">단과대학</Label>
            <CustomSelectWrapper>
              <Select
                id="college"
                name="college"
                value={formData.college}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  단과대학을 선택하세요
                </option>
                <option value="경상대학">경상대학</option>
                <option value="통번역대학">통번역대학</option>
                <option value="공과대학">공과대학</option>
                <option value="자연과학대학">자연과학대학</option>
                <option value="국제지역대학">국제지역대학</option>
                <option value="인문대학">인문대학</option>
                <option value="국가전략언어대학"></option>
                <option value="융합인재대학">융합인재대학</option>
                <option value="Culture&Technology융합대학">
                  Culture&Technology 융합대학
                </option>
                <option value="AI융합대학">AI융합대학</option>
                <option value="바이오메디컬공학부">바이오메디컬공학부</option>
              </Select>
              <SelectArrow />
            </CustomSelectWrapper>
          </Field>
          <Field>
            <Label htmlFor="major">전공</Label>
            <CustomSelectWrapper>
              <Select
                id="major"
                name="major"
                value={formData.major}
                onChange={handleInputChange}
                required
              >
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
            <Label htmlFor="doubleMajorType">이중 / 부전공 타입</Label>
            <CustomSelectWrapper>
              <Select
                id="doubleMajorType"
                name="doubleMajorType"
                value={formData.doubleMajorType}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  타입을 선택하세요
                </option>
                <option value="없음">없음</option>
                <option value="전공심화">전공심화</option>
                <option value="이중/부전공">이중/부전공</option>
              </Select>
              <SelectArrow />
            </CustomSelectWrapper>
          </Field>
          {formData.doubleMajorType === "이중/부전공" && (
            <Field>
              <Label htmlFor="double_major">이중 / 부전공</Label>
              <CustomSelectWrapper>
                <Select
                  id="double_major"
                  name="double_major"
                  value={formData.double_major}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    이중/부전공을 선택하세요
                  </option>
                </Select>
                <SelectArrow />
              </CustomSelectWrapper>
            </Field>
          )}
          {formData.double_major === "융합인재대학" && (
            <Field>
              <Label htmlFor="modules">모듈 선택</Label>
              <CustomSelectWrapper>
                <Select
                  id="modules"
                  name="modules"
                  value={formData.modules[0] || ""}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      modules: e.target.value ? [e.target.value] : [],
                    }));
                  }}
                >
                  <option value="" disabled>
                    모듈을 선택하세요
                  </option>
                  <option value="AI융합전공">AI융합전공</option>
                  <option value="바이오헬스융합전공">바이오헬스융합전공</option>
                  <option value="미디어아트융합전공">미디어아트융합전공</option>
                  <option value="글로벌리더십융합전공">
                    글로벌리더십융합전공
                  </option>
                </Select>
                <SelectArrow />
              </CustomSelectWrapper>
            </Field>
          )}{" "}
          <Row>
            <Field style={{ flex: 1 }}>
              <Label htmlFor="grade">학년</Label>
              <CustomSelectWrapper>
                <Select
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  required
                >
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
                <Select
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                  required
                >
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
