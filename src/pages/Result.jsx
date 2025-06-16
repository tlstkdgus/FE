import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  PageWrapper,
  ContentWrapper,
  TitleWrapper,
  Title,
  NextButton,
  Subtitle,
} from "../Components/CreateComponent";
import { useNavigate } from "react-router-dom";
import { GrCycle } from "react-icons/gr";
import { IoMdArrowDropdown } from "react-icons/io";
import Timetable from "../Components/TimeTable";
import { useSchedule } from "../context/ScheduleContext";
import { saveTimetable } from "../axiosInstance";

const ResetButton = styled.div`
  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  background: #e7f5ff;
  color: #111;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.35px;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

const FilterItem = styled.div`
  width: 100%;
  display: flex;
  padding: 0px 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: #111;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 25.2px */
  letter-spacing: -0.45px;
`;

const CheckBtn = styled.div`
  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid #305ff8;
  background: #fff;
  color: #111111;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 19.6px */
  letter-spacing: -0.35px;
`;

const CreditWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;
const CreditInput = styled.input`
  display: flex;
  width: 42px;
  height: 30px;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid #305ff8;
  background: #fff;
`;
const DropdownWrapper = styled.div`
  display: flex;
  padding: 8px 10px 8px 20px;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid #305ff8;
  background: #fff;
`;
const SubTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;
const SubTitle = styled.div`
  color: #111;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 28px */
  letter-spacing: -0.5px;
`;

const SubText = styled.div`
  color: #111;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 22.4px */
  letter-spacing: -0.4px;
`;

const TimetableWrapper = styled.div`
  border-radius: 8px;
  border: 1px solid #111;
`;

const SubtableWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  align-self: stretch;
`;

const days = ["월", "화", "수", "목", "금"];
const times = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

// 모든 과목에 일관된 색상을 부여하는 함수
const generateSubjectColors = (subjects) => {
  const colors = [
    "#E7F5FF",
    "#FFF0F5",
    "#F0FFF4",
    "#FFFAF0",
    "#F3F0FF",
    "#EBFBEE",
    "#E6FFFA",
    "#FFF5F5",
    "#FEFCBF",
    "#EDF2FF",
  ];

  const subjectColors = {};
  subjects.forEach((subject, index) => {
    subjectColors[subject] = colors[index % colors.length];
  });

  return subjectColors;
};

const MiniTimetable = ({ data, isSelected, onClick, subjectColors }) => {
  return (
    <div
      onClick={onClick}
      style={{
        width: 120,
        height: 160,
        border: `2px solid ${isSelected ? "#305FF8" : "#111"}`,
        borderRadius: 8,
        overflow: "hidden",
        cursor: "pointer",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "15%",
          borderBottom: "1px solid #eee",
        }}
      >
        <div style={{ width: "10%", borderRight: "1px solid #eee" }}></div>
        {days.map((day) => (
          <div
            key={day}
            style={{
              flex: 1,
              fontSize: "6px",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRight: "1px solid #eee",
            }}
          >
            {day}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flex: 1 }}>
        <div
          style={{
            width: "10%",
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid #eee",
          }}
        >
          {times.map((time) => (
            <div
              key={time}
              style={{
                flex: 1,
                fontSize: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderBottom: "1px solid #eee",
              }}
            >
              {time}
            </div>
          ))}
        </div>
        {days.map((day) => (
          <div
            key={day}
            style={{
              flex: 1,
              position: "relative",
              borderRight: "1px solid #eee",
            }}
          >
            {times.map((time, idx) => (
              <div
                key={time}
                style={{
                  position: "absolute",
                  top: `${idx * (100 / times.length)}%`,
                  height: `${100 / times.length}%`,
                  width: "100%",
                  borderBottom: "1px solid #eee",
                }}
              />
            ))}
            {data
              .filter((item) => item.day === day)
              .map((item, idx) => {
                const startIdx = times.indexOf(item.start);
                const endIdx = times.indexOf(item.end);
                let duration;
                if (startIdx === -1 || endIdx === -1) return null;
                if (endIdx >= startIdx) {
                  duration = endIdx - startIdx;
                } else {
                  duration = times.length - startIdx + endIdx;
                }
                return (
                  <div
                    key={idx}
                    style={{
                      position: "absolute",
                      top: `${startIdx * (100 / times.length)}%`,
                      height: `${duration * (100 / times.length)}%`,
                      width: "94%",
                      margin: "0 3%",
                      backgroundColor: subjectColors[item.subject],
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  />
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
};

const combinations = [
  { key: "major", label: "전공만" },
  { key: "minor", label: "이중/부전공만" },
  { key: "liberal", label: "교양만" },
  { key: "charity", label: "자선만" },
  { key: "major_minor", label: "전공+이중/부전공" },
  { key: "major_liberal", label: "전공+교양" },
  { key: "major_charity", label: "전공+자선" },
  { key: "minor_liberal", label: "이중/부전공+교양" },
  { key: "minor_charity", label: "이중/부전공+자선" },
  { key: "major_minor_liberal", label: "전공+이중/부전공+교양" },
  { key: "major_minor_charity", label: "전공+이중/부전공+자선" },
  { key: "all", label: "전과목" },
];

const ModalBg = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalBox = styled.div`
  background: #fff;
  border-radius: 12px;
  width: 400px;
  padding: 20px 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
`;
const DropdownMenu = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  background: #fff;
  border: 1px solid #305ff8;
  border-radius: 8px;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(48, 95, 248, 0.08);
`;
const DropdownItem = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  font-size: 15px;
  color: #111;
  background: ${({ selected }) => (selected ? "#E7F5FF" : "#fff")};
  &:hover {
    background: #f0f4ff;
  }
`;

export default function Result() {
  const navigate = useNavigate();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [timetableList, setTimetableList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const {
    combination,
    setCombination,
    credit,
    setCredit,
    detailedCredit,
    selectedDays,
  } = useSchedule();
  const [showDayModal, setShowDayModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // 목 시간표 데이터
  const MOCK_TIMETABLES = [
    {
      id: 1,
      name: "추천 시간표 1",
      courses: [
        {
          subject: "웹 프로그래밍",
          professor: "김00",
          day: "월",
          start: "3",
          end: "5",
          location: "공학관 301",
        },
        {
          subject: "체육(요가)",
          professor: "김00",
          day: "화",
          start: "2",
          end: "3",
          location: "체육관",
        },
        {
          subject: "컴퓨터 논리 개론",
          professor: "김00",
          day: "목",
          start: "6",
          end: "7",
          location: "공학관 401",
        },
        {
          subject: "운영체제",
          professor: "임승호",
          day: "수",
          start: "1",
          end: "3",
          location: "공학관 302",
        },
      ],
    },
    {
      id: 2,
      name: "추천 시간표 2",
      courses: [
        {
          subject: "웹 프로그래밍",
          professor: "김00",
          day: "화",
          start: "1",
          end: "3",
          location: "공학관 301",
        },
        {
          subject: "컴퓨터 논리 개론",
          professor: "김00",
          day: "목",
          start: "3",
          end: "4",
          location: "공학관 401",
        },
        {
          subject: "종합설계",
          professor: "고석훈",
          day: "금",
          start: "2",
          end: "4",
          location: "공학관 501",
        },
        {
          subject: "운영체제",
          professor: "임승호",
          day: "월",
          start: "6",
          end: "8",
          location: "공학관 302",
        },
      ],
    },
    {
      id: 3,
      name: "추천 시간표 3",
      courses: [
        {
          subject: "체육(요가)",
          professor: "김00",
          day: "월",
          start: "1",
          end: "2",
          location: "체육관",
        },
        {
          subject: "웹 프로그래밍",
          professor: "김00",
          day: "수",
          start: "3",
          end: "5",
          location: "공학관 301",
        },
        {
          subject: "컴퓨터 논리 개론",
          professor: "김00",
          day: "금",
          start: "1",
          end: "2",
          location: "공학관 401",
        },
        {
          subject: "종합설계",
          professor: "고석훈",
          day: "화",
          start: "6",
          end: "8",
          location: "공학관 501",
        },
      ],
    },
  ];

  // 추천 시간표 데이터 로드
  useEffect(() => {
    const loadRecommendedTimetables = () => {
      try {
        // 목 데이터를 즉시 설정
        console.log("✅ Result.jsx - 목 시간표 데이터 로드:", MOCK_TIMETABLES);
        setTimetableList(MOCK_TIMETABLES);
        setLoading(false);
      } catch (error) {
        console.error("❌ Result.jsx - 추천 시간표 로드 오류:", error);
        setTimetableList([]);
        setLoading(false);
      }
    };

    loadRecommendedTimetables();
  }, []);

  // API 응답 데이터를 TimeTable 컴포넌트에서 사용할 수 있는 형식으로 변환
  const convertApiDataToTimetableFormat = (apiData) => {
    if (!apiData || !apiData.scheduledCourses) {
      return [];
    }

    return apiData.scheduledCourses.flatMap((course) => {
      return course.actualClassTimes.flatMap((classTime) => {
        return classTime.교시들.map((period) => ({
          subject: course.courseName,
          professor: course.professor,
          day: classTime.요일,
          start: period.toString(),
          end: period.toString(),
          courseCode: course.courseCode,
          credits: course.credits,
          classroom: course.classroom,
          department: course.department,
        }));
      });
    });
  };

  // (예시) 현재 선택된 조건을 콘솔에 출력
  React.useEffect(() => {
    console.log("조합:", combination);
    console.log("요일/시간:", selectedDays);
    console.log("학점:", credit);
    console.log("상세학점:", detailedCredit);
  }, [combination, selectedDays, credit, detailedCredit]);

  // 로딩 중일 때 표시할 컴포넌트
  if (loading) {
    return (
      <PageWrapper>
        <ContentWrapper>
          <TitleWrapper>
            <Title>추천 시간표를 생성하는 중...</Title>
            <Subtitle>잠시만 기다려주세요</Subtitle>
          </TitleWrapper>
        </ContentWrapper>
      </PageWrapper>
    );
  }

  // 시간표에 있는 모든 과목을 추출하여 중복 제거
  const allSubjects = Array.from(
    new Set(
      timetableList.flatMap((timetable) => {
        if (timetable.scheduledCourses) {
          // API 응답 형식인 경우
          return timetable.scheduledCourses.map((course) => course.courseName);
        } else if (Array.isArray(timetable)) {
          // 기존 형식인 경우
          return timetable.map((item) => item.subject);
        }
        return [];
      })
    )
  );

  // 모든 시간표에서 사용할 일관된 과목 색상 생성
  const subjectColors = generateSubjectColors(allSubjects);

  // 최소/최대 학점 기본값 처리
  const minCredit =
    credit.min || detailedCredit.minor || detailedCredit.liberal || "";
  const maxCredit =
    credit.max || detailedCredit.minorMax || detailedCredit.liberalMax || "";

  // 시간표가 없을 때 처리
  if (!timetableList || timetableList.length === 0) {
    return (
      <PageWrapper>
        <ContentWrapper>
          <TitleWrapper>
            <Title>추천 시간표가 없습니다</Title>
            <Subtitle>설정을 다시 확인해주세요</Subtitle>
          </TitleWrapper>
          <NextButton onClick={() => navigate("/credit")}>
            설정 다시 하기
          </NextButton>
        </ContentWrapper>
      </PageWrapper>
    );
  }

  // 시간표 저장 함수
  const handleSaveTimetable = async () => {
    try {
      setSaving(true);

      // localStorage에서 사용자 정보 가져오기
      const savedUserData = localStorage.getItem("userData");
      if (!savedUserData) {
        alert("사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요.");
        navigate("/login");
        return;
      }

      const userData = JSON.parse(savedUserData);
      const userId =
        userData.userId || userData.student_id || userData.studentId;

      if (!userId) {
        alert("사용자 ID를 찾을 수 없습니다.");
        return;
      }

      // 현재 선택된 시간표 가져오기
      const selectedTimetable = timetableList[selectedIdx];
      if (!selectedTimetable) {
        alert("선택된 시간표가 없습니다.");
        return;
      }

      // timetableId 확인
      const timetableId = selectedTimetable.timetableId;
      if (timetableId === undefined || timetableId === null) {
        console.warn("⚠️ timetableId가 없습니다. 0으로 설정합니다.");
      }

      console.log("💾 시간표 저장 중...", {
        userId,
        timetableId: timetableId || 0,
        selectedTimetable,
      });

      // 시간표 저장 API 호출
      await saveTimetable(userId, timetableId || 0);

      // localStorage에도 저장 (기존 호환성을 위해)
      const selectedTimetableForStorage =
        selectedTimetable.scheduledCourses || selectedTimetable;
      localStorage.setItem(
        "finalTimetable",
        JSON.stringify(selectedTimetableForStorage)
      );

      alert("시간표가 성공적으로 저장되었습니다!");
      navigate("/main");
    } catch (error) {
      console.error("❌ 시간표 저장 오류:", error);
      alert("시간표 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageWrapper>
      <ContentWrapper>
        <TitleWrapper
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Title style={{ marginBottom: "0px" }}>필터링</Title>
          <ResetButton>
            <GrCycle style={{ width: "12px", height: "12px" }} />
            초기화
          </ResetButton>
        </TitleWrapper>
        <FilterWrapper>
          <FilterItem>
            요일/시간대
            <CheckBtn onClick={() => setShowDayModal(true)}>
              표 확인하기
            </CheckBtn>
            {showDayModal && (
              <ModalBg onClick={() => setShowDayModal(false)}>
                <ModalBox onClick={(e) => e.stopPropagation()}>
                  <div style={{ marginBottom: 8, fontWeight: 600 }}>
                    요일/시간대 확인
                  </div>
                  <div style={{ margin: "16px 0" }}>
                    <Timetable
                      selectable={false}
                      selectedCells={selectedDays}
                      style={{ width: 320 }}
                    />
                  </div>
                  <div style={{ marginTop: 16, textAlign: "right" }}>
                    <button
                      onClick={() => setShowDayModal(false)}
                      style={{
                        padding: "6px 16px",
                        borderRadius: 4,
                        background: "#305FF8",
                        color: "#fff",
                        border: "none",
                      }}
                    >
                      확인
                    </button>
                  </div>
                </ModalBox>
              </ModalBg>
            )}
          </FilterItem>
          <FilterItem>
            학점 범위
            <CreditWrapper>
              최소{" "}
              <CreditInput
                value={minCredit}
                onChange={(e) =>
                  setCredit((c) => ({ ...c, min: e.target.value }))
                }
              />
              최대{" "}
              <CreditInput
                value={maxCredit}
                onChange={(e) =>
                  setCredit((c) => ({ ...c, max: e.target.value }))
                }
              />
            </CreditWrapper>
          </FilterItem>
          <FilterItem style={{ position: "relative" }}>
            수강강의조합
            <DropdownWrapper
              tabIndex={0}
              onClick={() => setShowDropdown((v) => !v)}
            >
              {combinations.find((item) => item.key === combination)?.label ||
                "조합 선택"}
              <IoMdArrowDropdown />
              {showDropdown && (
                <DropdownMenu>
                  {combinations.map((item) => (
                    <DropdownItem
                      key={item.key}
                      onClick={() => {
                        setCombination(item.key);
                        setShowDropdown(false);
                      }}
                      selected={combination === item.key}
                    >
                      {item.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              )}
            </DropdownWrapper>
          </FilterItem>
          <FilterItem>
            <NextButton onClick={handleSaveTimetable}>
              {saving ? "저장 중..." : "시간표 저장하기"}
            </NextButton>
          </FilterItem>
        </FilterWrapper>
      </ContentWrapper>
      <SubTextContainer>
        <SubTitle>제안 시간표</SubTitle>
        <SubText>
          필터링 조건에 맞춰 아래와 같은 시간표를 제안해요
          <br />
          제안 시간표가 마음에 들지 않으시다면, <br />
          해당 과목을 클릭해 보세요
        </SubText>

        <SubTitle>학점 조합</SubTitle>
        <CreditWrapper>
          이중/부전공{" "}
          <CreditInput
            value={detailedCredit.minorMax}
            readOnly
            style={{ width: 40, background: "#f5f5f5" }}
          />
          + 교양{" "}
          <CreditInput
            value={detailedCredit.liberalMax}
            readOnly
            style={{ width: 40, background: "#f5f5f5" }}
          />
        </CreditWrapper>
      </SubTextContainer>
      <TimetableWrapper>
        <Timetable
          data={
            convertApiDataToTimetableFormat(timetableList[selectedIdx]) || []
          }
          subjectColors={subjectColors}
        />
      </TimetableWrapper>
      <SubtableWrapper>
        {timetableList.map((miniData, idx) => (
          <MiniTimetable
            key={idx}
            data={convertApiDataToTimetableFormat(miniData) || []}
            isSelected={selectedIdx === idx}
            onClick={() => setSelectedIdx(idx)}
            subjectColors={subjectColors}
          />
        ))}
      </SubtableWrapper>
      <NextButton onClick={handleSaveTimetable} disabled={saving}>
        {saving ? "저장 중..." : "저장하기"}
      </NextButton>
    </PageWrapper>
  );
}
