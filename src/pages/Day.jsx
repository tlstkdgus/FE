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

const TimetableWrapper = styled.div`
  width: 100%;
`;

export default function Day() {
  const navigate = useNavigate();
  const { selectedDays, setSelectedDays } = useSchedule();

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
      <NextButton onClick={() => navigate("/credit")}>Next</NextButton>
    </PageWrapper>
  );
}
