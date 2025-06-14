import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axiosInstance, { setToken } from "../axiosInstance";

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

  &:disabled {
    background: var(--subtext);
    cursor: not-allowed;
  }
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

  const [formData, setFormData] = useState({
    student_id: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("로그인 데이터:", formData);

      const loginData = {
        student_id: formData.student_id,
        password: formData.password,
      };

      console.log("변환된 로그인 데이터:", loginData);

      // 로그인 API 호출
      const response = await axiosInstance.post("/auth/login", loginData);
      if (response.status === 200) {
        console.log("🔍 Login.jsx - 로그인 성공 전체 응답:", response.data);
        console.log(
          "🔍 Login.jsx - response.data.user_id:",
          response.data.user_id
        );
        console.log("🔍 Login.jsx - response.data.name:", response.data.name);
        console.log("🔍 Login.jsx - response.data.token:", response.data.token);

        // 토큰이 응답에 있다면 저장
        const token =
          response.data.token ||
          response.data.accessToken ||
          response.data.access_token;
        if (token) {
          setToken(token);
          console.log("🔑 Login.jsx - 토큰 저장 완료");
        } else {
          console.warn("응답에서 토큰을 찾을 수 없습니다:", response.data);
        }

        // 로그인 응답에서 직접 user_id, name 추출
        const userId = response.data.user_id;
        const name = response.data.name;

        console.log("🔍 Login.jsx - 추출된 userId:", userId);
        console.log("🔍 Login.jsx - 추출된 name:", name);

        if (userId) {
          // 사용자 정보를 localStorage에 저장
          const userData = {
            userId: userId, // API 호출용 ID (response.data.user_id)
            name: name || "",
            student_id: formData.student_id, // 로그인 폼에서 입력한 학번
            college: "",
            major: "",
            doubleMajorType: "",
            double_major: "",
            modules: [],
            grade: "",
            semester: "",
          };
          localStorage.setItem("userData", JSON.stringify(userData));
          console.log(
            "💾 Login.jsx - localStorage에 사용자 정보 저장:",
            userData
          );
          console.log(
            "💾 Login.jsx - 저장된 userId (API 호출용):",
            userData.userId
          );
        } else {
          console.warn(
            "⚠️ Login.jsx - 응답에서 user_id를 찾을 수 없습니다. student_id만 저장합니다."
          );
          // 최소한 student_id라도 저장 (로그인 폼에서 입력한 값)
          const userData = {
            userId: null, // API 호출용 ID가 없음
            student_id: formData.student_id,
            name: name || "",
            college: "",
            major: "",
            doubleMajorType: "",
            double_major: "",
            modules: [],
            grade: "",
            semester: "",
          };
          localStorage.setItem("userData", JSON.stringify(userData));
          console.log("💾 Login.jsx - 최소 userData 저장:", userData);
        }

        // 로그인 성공 시 메인 페이지로 이동
        navigate("/main");
      }
    } catch (error) {
      console.error("로그인 실패:", error);

      if (error.response) {
        // 서버에서 응답을 받은 경우 (4xx, 5xx 상태코드)
        const errorMessage =
          error.response.data?.message || "로그인에 실패했습니다.";
        alert(errorMessage);
      } else if (error.request) {
        // 요청은 전송되었지만 응답을 받지 못한 경우
        alert("서버와의 연결에 문제가 있습니다. 잠시 후 다시 시도해주세요.");
      } else {
        // 요청 설정 중에 오류가 발생한 경우
        alert("요청 처리 중 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <FormWrapper>
        <Title>로그인</Title>
        <Description>
          Scheduly의 서비스를 이용하기 위해
          <br />
          로그인을 진행해 주세요
        </Description>{" "}
        <Form onSubmit={handleSubmit}>
          <Field>
            <Label htmlFor="student_id">ID (학번)</Label>
            <Input
              id="student_id"
              name="student_id"
              value={formData.student_id}
              onChange={handleInputChange}
              placeholder="아이디를 입력해 주세요"
              autoComplete="username"
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
              placeholder="비밀번호를 입력해 주세요"
              autoComplete="current-password"
              required
            />
          </Field>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "로그인 중..." : "Login"}
          </Button>
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
