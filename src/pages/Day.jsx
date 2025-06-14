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
} from "../Components/CreateComponent";
import Timetable from "../Components/TimeTable";
import { useNavigate } from "react-router-dom";
import { useSchedule } from "../context/ScheduleContext";
import { saveTimePreferences, getUserInfo } from "../axiosInstance";
import { useState } from "react";

const TimetableWrapper = styled.div`
  width: 100%;
`;

export default function Day() {
  const navigate = useNavigate();
  const { selectedDays, setSelectedDays } = useSchedule();
  const [isLoading, setIsLoading] = useState(false); // 선택된 시간대를 API 형식으로 변환하는 함수
  const convertToApiFormat = (selectedCells) => {
    if (!selectedCells || selectedCells.length === 0) {
      return [];
    }

    // 한국어 요일을 영어 요일로 변환하는 매핑
    const dayMapping = {
      월: "Mon",
      화: "Tue",
      수: "Wed",
      목: "Thu",
      금: "Fri",
    };

    // 요일별로 그룹화
    const dayGroups = {};
    selectedCells.forEach((cellId) => {
      // cellId는 "월-9", "화-10" 형태의 문자열
      const [koreanDay, timeStr] = cellId.split("-");
      const englishDay = dayMapping[koreanDay]; // 한국어 요일을 영어로 변환
      const period = parseInt(timeStr, 10); // 시간을 숫자로 변환

      if (!englishDay) {
        console.warn(`⚠️ 알 수 없는 요일: ${koreanDay}`);
        return;
      }

      if (!dayGroups[englishDay]) {
        dayGroups[englishDay] = [];
      }
      dayGroups[englishDay].push(period);
    });

    // API 형식으로 변환 - 요구되는 형식에 맞게 수정
    return Object.entries(dayGroups).map(([day, periods]) => {
      const sortedPeriods = periods.sort((a, b) => a - b);
      return {
        요일: day,
        교시들: sortedPeriods,
      };
    });
  };
  const handleNext = async () => {
    setIsLoading(true);
    try {
      // localStorage에서 모든 사용자 데이터 확인
      const savedUserData = localStorage.getItem("userData");
      const savedToken = localStorage.getItem("accessToken");

      console.log("🔍 Day.jsx - 저장된 userData (전체):", savedUserData);
      console.log("🔍 Day.jsx - 저장된 token 존재여부:", !!savedToken);

      let studentId = null;
      let userData = null;

      if (savedUserData) {
        userData = JSON.parse(savedUserData);
        console.log("🔍 Day.jsx - 파싱된 userData 객체:", userData);        // MyPage.jsx와 동일한 방식으로 userId 추출 (API 호출용)
        studentId = userData.userId || userData.student_id || userData.studentId;

        console.log("🔍 Day.jsx - 추출된 studentId:", studentId);
        console.log("🔍 Day.jsx - userData의 모든 키:", Object.keys(userData));
      }
      if (!studentId) {
        console.warn("⚠️ Day.jsx - studentId가 없습니다.");
        console.warn("⚠️ Day.jsx - 전체 userData:", userData);
        alert("사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요.");
        navigate("/login");
        return;
      } // API를 통해 실제 사용자 정보 확인
      try {
        console.log("🔍 Day.jsx - API를 통한 사용자 정보 조회 시작...");
        const apiUserInfo = await getUserInfo();
        console.log("🔍 Day.jsx - API에서 가져온 사용자 정보:", apiUserInfo); // API에서 가져온 정보로 studentId 업데이트
        if (apiUserInfo && apiUserInfo.studentId) {
          const apiStudentId = apiUserInfo.studentId; // 카멜케이스만 사용
          console.log("🔍 Day.jsx - API에서 추출한 studentId:", apiStudentId);

          // API 정보와 localStorage 정보가 다르면 업데이트
          if (apiStudentId !== studentId) {
            console.log(
              "🔍 Day.jsx - localStorage와 API의 studentId가 다릅니다. API 정보를 사용합니다."
            );
            studentId = apiStudentId;
          }
        }
      } catch (apiError) {
        console.warn("⚠️ Day.jsx - API 사용자 정보 조회 실패:", apiError);
        console.warn(
          "⚠️ Day.jsx - localStorage의 studentId를 계속 사용합니다:",
          studentId
        );
      }

      // 선택된 시간대를 API 형식으로 변환
      const preferredTimeSlots = convertToApiFormat(selectedDays);

      console.log("🔍 Day.jsx - 원본 selectedDays:", selectedDays);
      console.log(
        "🔍 Day.jsx - 변환된 preferredTimeSlots:",
        preferredTimeSlots
      );

      if (preferredTimeSlots.length === 0) {
        console.warn("⚠️ Day.jsx - 선택된 시간대가 없습니다.");
        alert("원하는 시간대를 선택해주세요.");
        return;
      }

      // API 호출
      const timePreferences = {
        preferredTimeSlots: preferredTimeSlots,
      };

      console.log("🚀 Day.jsx - API 호출 시작:", timePreferences);
      const response = await saveTimePreferences(studentId, timePreferences);
      console.log("✅ Day.jsx - API 응답:", response);

      // 성공 시 다음 페이지로 이동
      navigate("/credit");
    } catch (error) {
      console.error("❌ Day.jsx - 시간 선호도 저장 오류:", error);
      console.error(
        "❌ Day.jsx - 오류 상세:",
        error.response?.data || error.message
      );

      // 에러 처리
      const errorMessage =
        error.response?.data?.message || "시간 선호도 저장에 실패했습니다.";
      alert(`오류가 발생했습니다: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <BarContainer>
        <StepBar />
        <StepBar />
        <DefaultBar />
        <DefaultBar />
        <DefaultBar />
      </BarContainer>
      <ContentWrapper>
        <TitleWrapper>
          <Title>원하는 강의 요일과 시간대를 클릭해 주세요</Title>
        </TitleWrapper>
        <TimetableWrapper>
          <Timetable
            selectable
            selectedCells={selectedDays}
            onSelect={setSelectedDays}
          />
        </TimetableWrapper>
      </ContentWrapper>
      <NextButton onClick={handleNext} disabled={isLoading}>
        {isLoading ? "저장 중..." : "Next"}
      </NextButton>
    </PageWrapper>
  );
}
