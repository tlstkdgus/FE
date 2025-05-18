import React from "react";
import { useNavigate } from "react-router-dom";
import { BarContainer, StepBar, DefaultBar, PageWrapper, ContentWrapper, TitleWrapper, Title, NextButton, Subtitle } from "../Components/CreateComponent";
import styled from "styled-components";
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from "react-icons/md";
import { useSchedule } from "../context/ScheduleContext";


const CombinationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
    padding: 0px 16px;
`;

const CombinationItem = styled.div`
    display: flex;
    padding: 12px 16px;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    border-radius: 8px;
    border: 1px solid #E5E5EC;
    color: #111;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 22.4px */
    letter-spacing: -0.4px;
    cursor: pointer;
    background: ${props => props.selected ? "#E7F5FF" : "#fff"};
    border-color: ${props => props.selected ? "#305FF8" : "#E5E5EC"};
`;

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
  { key: "all", label: "전과목" }
];

export default function Combination() {
    const navigate = useNavigate();
    const { combination, setCombination } = useSchedule();

    return (
        <PageWrapper>
            <BarContainer>
                <StepBar />
                <StepBar />
                <StepBar />
                <StepBar />
                <DefaultBar />
            </BarContainer>
            <ContentWrapper>
                <TitleWrapper>
                    <Title>시간표를 구성할 과목 조합을<br/>선택해 주세요</Title>
                </TitleWrapper>
                <CombinationWrapper>
                    {combinations.map(item => (
                        <CombinationItem
                            key={item.key}
                            selected={combination === item.key}
                            onClick={() => setCombination(item.key)}
                        >
                            {combination === item.key
                                ? <MdRadioButtonChecked color="#305FF8" />
                                : <MdRadioButtonUnchecked color="#B0B0B0" />}
                            {item.label}
                        </CombinationItem>
                    ))}
                </CombinationWrapper>
            </ContentWrapper>
            <NextButton onClick={() => navigate("/detailedcredit")}>Next</NextButton>
        </PageWrapper>
    )
}
