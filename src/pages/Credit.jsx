import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  BarContainer,
  StepBar,
  DefaultBar,
  PageWrapper,
  ContentWrapper,
  TitleWrapper,
  Title,
  NextButton,
  Subtitle,
} from "../Components/CreateComponent";
import { useNavigate } from "react-router-dom";
import { useSchedule } from "../context/ScheduleContext";
import {
  getToken,
  getUserInfo,
} from "../axiosInstance";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 0px 16px;
  margin-bottom: 24px;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  align-items: center;
  padding: 0px 16px;
`;

const InputBox = styled.input`
  display: flex;
  width: 60px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  text-align: center;

  &:focus {
    outline: none;
    border-color: var(--brand);
    background: #fff;
  }
`;

const SubtitleWrapper = styled.div`
  color: var(--Black, #111);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.4px;
  margin-bottom: 8px;
`;

const TotalCreditWrapper = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 16px;
  margin: 16px;
  border: 1px solid #e2e8f0;
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 14px;
  margin-top: 4px;
  text-align: center;
`;

export default function Credit() {
  const navigate = useNavigate();
  const { credit, setCredit } = useSchedule();
  const [userInfo, setUserInfo] = useState(null);
  const [creditSettings, setCreditSettings] = useState({
    전공: { min: "", max: "" },
    교양: { min: "", max: "" },
    이중전공: { min: "", max: "" },
    부전공: { min: "", max: "" },
  });
  const [totalCredits, setTotalCredits] = useState({ min: "", max: "" });
  const [courseTypes, setCourseTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 사용자 정보 로드
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = getToken();
        if (!token) {
          navigate("/login");
          return;
        }

        const savedUserData = localStorage.getItem("userData");
        if (savedUserData) {
          const userData = JSON.parse(savedUserData);
          const userId =
            userData.userId || userData.student_id || userData.studentId;

          if (userId) {
            const apiUserData = await getUserInfo(userId);
            setUserInfo(apiUserData);

            // 사용자의 전공 정보에 따라 필요한 과목 타입 결정
            const types = ["전공", "교양"];
            if (apiUserData.doubleMajorType === "DOUBLE_MAJOR") {
              types.push("이중전공");
            } else if (
              apiUserData.doubleMajorType === "MINOR" ||
              apiUserData.doubleMajorType === "INTENSIVE_MINOR"
            ) {
              types.push("부전공");
            }
            setCourseTypes(types);
          }
        }
      } catch (error) {
        console.error("사용자 정보 로드 오류:", error);
        setError("사용자 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [navigate]);

  // 학점 입력 핸들러
  const handleCreditChange = (type, field, value) => {
    if (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 30)) {
      setCreditSettings((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          [field]: value,
        },
      }));
      setError("");
    }
  };

  // 전체 학점 범위 계산
  useEffect(() => {
    let minTotal = 0;
    let maxTotal = 0;

    courseTypes.forEach((type) => {
      const min = parseInt(creditSettings[type].min) || 0;
      const max = parseInt(creditSettings[type].max) || 0;
      minTotal += min;
      maxTotal += max;
    });

    setTotalCredits({ min: minTotal.toString(), max: maxTotal.toString() });
  }, [creditSettings, courseTypes]);

  // API 전송 함수
  const handleNext = async () => {
    try {
      setError("");

      // 입력 검증
      for (const type of courseTypes) {
        const min = parseInt(creditSettings[type].min) || 0;
        const max = parseInt(creditSettings[type].max) || 0;

        if (min < 0 || max < 0) {
          setError("학점은 0 이상이어야 합니다.");
          return;
        }

        if (min > max && max > 0) {
          setError(`${type} 최소 학점이 최대 학점보다 클 수 없습니다.`);
          return;
        }
      }

      const totalMin = parseInt(totalCredits.min) || 0;
      const totalMax = parseInt(totalCredits.max) || 0;

      if (totalMin < 4) {
        setError("총 최소 학점은 4학점 이상이어야 합니다.");
        return;
      }

      // API 형식에 맞게 데이터 준비
      const creditGoalsPerType = {};
      courseTypes.forEach((type) => {
        const min = parseInt(creditSettings[type].min) || 0;
        const max = parseInt(creditSettings[type].max) || 0;
        if (min > 0 || max > 0) {
          creditGoalsPerType[type] = { min, max };
        }
      });

      const apiData = {
        creditGoalsPerType,
        courseTypeCombination: courseTypes,
        minTotalCredits: totalMin,
        maxTotalCredits: totalMax,
      };
      console.log("API 전송 데이터:", apiData);      // Context에도 저장 (기존 호환성을 위해)
      setCredit({ min: totalCredits.min, max: totalCredits.max });

      // 목데이터 기반이므로 바로 결과 페이지로 이동
      console.log("✅ 목데이터 기반으로 시간표 생성 페이지로 이동합니다.");
      navigate("/result");    } catch (error) {
      console.error("시간표 생성 중 오류:", error);
      console.log("⚠️ 오류가 발생했지만 목데이터로 결과 페이지로 이동합니다.");
      navigate("/result");
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <BarContainer>
          <StepBar />
          <StepBar />
          <StepBar />
          <DefaultBar />
          <DefaultBar />
        </BarContainer>
        <ContentWrapper>
          <TitleWrapper>
            <Title>사용자 정보를 불러오는 중...</Title>
          </TitleWrapper>
        </ContentWrapper>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <BarContainer>
        <StepBar />
        <StepBar />
        <StepBar />
        <DefaultBar />
        <DefaultBar />
      </BarContainer>
      <ContentWrapper>
        <TitleWrapper>
          <Title>
            이번학기에 수강할
            <br />
            학점 범위를 입력해 주세요
          </Title>
          <Subtitle>각 과목 타입별로 학점을 설정할 수 있어요</Subtitle>
        </TitleWrapper>
        {courseTypes.map((type) => (
          <InputContainer key={type}>
            <SubtitleWrapper>{type} 학점</SubtitleWrapper>
            <InputWrapper>
              최소
              <InputBox
                type="number"
                min="0"
                max="30"
                value={creditSettings[type].min}
                onChange={(e) =>
                  handleCreditChange(type, "min", e.target.value)
                }
                placeholder="0"
              />
              학점
            </InputWrapper>
            <InputWrapper>
              최대
              <InputBox
                type="number"
                min="0"
                max="30"
                value={creditSettings[type].max}
                onChange={(e) =>
                  handleCreditChange(type, "max", e.target.value)
                }
                placeholder="0"
              />
              학점
            </InputWrapper>
          </InputContainer>
        ))}
        <TotalCreditWrapper>
          <SubtitleWrapper>총 학점 범위</SubtitleWrapper>
          <InputWrapper>최소: {totalCredits.min}학점</InputWrapper>
          <InputWrapper>최대: {totalCredits.max}학점</InputWrapper>
        </TotalCreditWrapper>{" "}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </ContentWrapper>
      <NextButton onClick={handleNext}>시간표 생성하기</NextButton>
    </PageWrapper>
  );
}
