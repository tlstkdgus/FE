import React from "react";
import styled from "styled-components";
import Timetable from "../Components/TimeTable";
import { useNavigate } from "react-router-dom";
import {
  BarContainer,
  StepBar,
  DefaultBar,
  PageWrapper,
  ContentWrapper,
  TitleWrapper,
  Title,
  Subtitle,
  NextButton,
} from "../Components/CreateComponent";

// 과목별 색상 생성 함수
const generateSubjectColors = (subjects) => {
  const colors = [
    "#FFE5E5",
    "#FFF0E5",
    "#FFFAE5",
    "#F0FFE5",
    "#E5F5FF",
    "#E5E5FF",
    "#F0E5FF",
    "#FFE5F5",
    "#E5FFE5",
    "#E5FFFF",
    "#FFFFE5",
    "#FFE5E0",
    "#F5E5FF",
    "#E0E5FF",
    "#E5F0FF",
  ];

  const subjectColors = {};
  subjects.forEach((subject, index) => {
    subjectColors[subject] = colors[index % colors.length];
  });

  return subjectColors;
};

// 필수과목 기반 시간표 데이터
const timetableData = [
  {
    subject: "운영체제",
    professor: "임승호",
    day: "월",
    start: "1",
    end: "3",
    location: "공학관 302",
  },
  {
    subject: "컴퓨터논리개론",
    professor: "김영란",
    day: "화",
    start: "2",
    end: "4",
    location: "공학관 401",
  },
  {
    subject: "종합설계",
    professor: "고석훈",
    day: "수",
    start: "3",
    end: "5",
    location: "공학관 501",
  },
  {
    subject: "웹프로그래밍",
    professor: "고석훈",
    day: "목",
    start: "1",
    end: "3",
    location: "공학관 301",
  },
];

export default function Create() {
  const navigate = useNavigate();

  // 시간표의 모든 과목들로 색상 생성
  const allSubjects = Array.from(
    new Set(timetableData.map((item) => item.subject))
  );
  const subjectColors = generateSubjectColors(allSubjects);

  return (
    <PageWrapper>
      <BarContainer>
        <StepBar />
        <DefaultBar />
        <DefaultBar />
        <DefaultBar />
        <DefaultBar />
      </BarContainer>
      <ContentWrapper>
        {" "}
        <TitleWrapper>
          <Title>필수과목 기반 시간표 미리보기</Title>
          <Subtitle>
            설정된 필수과목들로 구성된 기본 시간표입니다.
            <br />
            이를 바탕으로 추가 조건을 반영한 최적의 시간표를 생성합니다.
          </Subtitle>
        </TitleWrapper>
        <Timetable data={timetableData} subjectColors={subjectColors} />
      </ContentWrapper>
      <NextButton onClick={() => navigate("/day")}>Next</NextButton>
    </PageWrapper>
  );
}
