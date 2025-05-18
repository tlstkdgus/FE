import React from "react";
import styled from "styled-components";
import Timetable from "../Components/TimeTable";
import { useNavigate } from "react-router-dom";
import { BarContainer, StepBar, DefaultBar, PageWrapper, ContentWrapper, TitleWrapper, Title, Subtitle, NextButton } from "../Components/CreateComponent";





// Figma 디자인의 예시 데이터
const timetableData = [
  { subject: "웹 프로그래밍", professor: "김00", day: "월", start: "3", end: "5" },
  { subject: "체육(요가)", professor: "김00", day: "화", start: "2", end: "3" },
  { subject: "컴퓨터 논리 개론", professor: "김00", day: "목", start: "6", end: "7" },
];

export default function Create() {
  const navigate = useNavigate();
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
        <TitleWrapper>
          <Title>현재 필수 설정된 과목으로 이루어진 시간표입니다</Title>
          <Subtitle>
          {`해당 시간표를 기반으로 추가적인 사항을 고려해 시간표를 제작합니다`}
        </Subtitle>
          </TitleWrapper>
          <Timetable data={timetableData} />
      </ContentWrapper>
      <NextButton onClick={() => navigate("/day")}>Next</NextButton>
    </PageWrapper>
  );
}
