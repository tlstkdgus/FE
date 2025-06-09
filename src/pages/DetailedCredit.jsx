import React from "react";
import styled from "styled-components";
import { BarContainer, StepBar, DefaultBar, PageWrapper, ContentWrapper, TitleWrapper, Title, NextButton, Subtitle } from "../Components/CreateComponent";
import { useNavigate } from "react-router-dom";
import { useSchedule } from "../context/ScheduleContext";

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    padding: 0px 16px;
`
const InputWrapper = styled.div`
    display: flex;
    gap: 16px;
    width: 100%;
    align-items: center;
`;

const InputBox = styled.input`
    display: flex;
    width: 50px;
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background: #F5F5F5;
`;

const SubtitleWrapper = styled.div`
    color: var(--Black, #111);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 25.2px */
    letter-spacing: -0.45px;
`;

// 조합별 텍스트 매핑
const combinationText = {
  major: {
    title: "전공 학점 범위를 입력해 주세요",
    subtitle: "최대 14학점까지 설정할 수 있어요",
    fields: [{ key: "major", label: "전공 설정 학점" }]
  },
  minor: {
    title: "이중/부전공 학점 범위를 입력해 주세요",
    subtitle: "최대 14학점까지 설정할 수 있어요",
    fields: [{ key: "minor", label: "이중/부전공 설정 학점" }]
  },
  liberal: {
    title: "교양 학점 범위를 입력해 주세요",
    subtitle: "최대 14학점까지 설정할 수 있어요",
    fields: [{ key: "liberal", label: "교양 설정 학점" }]
  },
  major_minor: {
    title: "전공 + 이중/부전공 학점 범위를 입력해 주세요",
    subtitle: "최대 14학점까지 설정할 수 있어요",
    fields: [
      { key: "major", label: "전공 설정 학점" },
      { key: "minor", label: "이중/부전공 설정 학점" }
    ]
  },
  major_liberal: {
    title: "전공 + 교양 학점 범위를 입력해 주세요",
    subtitle: "최대 14학점까지 설정할 수 있어요",
    fields: [
      { key: "major", label: "전공 설정 학점" },
      { key: "liberal", label: "교양 설정 학점" }
    ]
  },
  minor_liberal: {
    title: "이중/부전공 + 교양 학점 범위를 입력해 주세요",
    subtitle: "최대 14학점까지 설정할 수 있어요",
    fields: [
      { key: "minor", label: "이중/부전공 설정 학점" },
      { key: "liberal", label: "교양 설정 학점" }
    ]
  },
  all: {
    title: "전과목 학점 범위를 입력해 주세요",
    subtitle: "최대 14학점까지 설정할 수 있어요",
    fields: [
      { key: "major", label: "전공 설정 학점" },
      { key: "minor", label: "이중/부전공 설정 학점" },
      { key: "liberal", label: "교양 설정 학점" }
    ]
  }
};

export default function DetailedCredit() {
    const navigate = useNavigate();
    const { combination, detailedCredit, setDetailedCredit } = useSchedule();
    const text = combinationText[combination] || combinationText["all"];
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
                    <Title>{text.title}</Title>
                    <Subtitle>{text.subtitle}</Subtitle>
                </TitleWrapper>
                {text.fields.map(field => (
                  <InputContainer key={field.key}>
                    <SubtitleWrapper>{field.label}</SubtitleWrapper>
                    <InputWrapper>
                        최소 <InputBox value={detailedCredit[field.key] || ""} onChange={e => setDetailedCredit(dc => ({...dc, [field.key]: e.target.value}))} /> 학점
                    </InputWrapper>
                    <InputWrapper>
                        최대 <InputBox value={detailedCredit[field.key + "Max"] || ""} onChange={e => setDetailedCredit(dc => ({...dc, [field.key + "Max"]: e.target.value}))} /> 학점
                    </InputWrapper>
                  </InputContainer>
                ))}
            </ContentWrapper>
            <NextButton onClick={() => navigate("/result")}>Next</NextButton>
        </PageWrapper>
    );
}

