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

export default function DetailedCredit() {
    const navigate = useNavigate();
    const { detailedCredit, setDetailedCredit } = useSchedule();
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
                    <Title>해당 조합으로 수강할 <br/> 학점 범위를 입력해 주세요</Title>
                    <Subtitle>최대 14학점까지 설정할 수 있어요</Subtitle>
                </TitleWrapper>
                <InputContainer>
                <SubtitleWrapper>이중/부전공 설정 학점</SubtitleWrapper>
                    <InputWrapper>
                        최소 <InputBox value={detailedCredit.minor} onChange={e => setDetailedCredit(dc => ({...dc, minor: e.target.value}))} />  학점
                    </InputWrapper>
                    <InputWrapper>
                        최대 <InputBox value={detailedCredit.minorMax || ""} onChange={e => setDetailedCredit(dc => ({...dc, minorMax: e.target.value}))} /> 학점
                    </InputWrapper>
                </InputContainer>
                <InputContainer>
                    <SubtitleWrapper>교양 설정 학점</SubtitleWrapper>
                    <InputWrapper>
                        최소 <InputBox value={detailedCredit.liberal} onChange={e => setDetailedCredit(dc => ({...dc, liberal: e.target.value}))} /> 학점
                    </InputWrapper>
                    <InputWrapper>
                        최대 <InputBox value={detailedCredit.liberalMax || ""} onChange={e => setDetailedCredit(dc => ({...dc, liberalMax: e.target.value}))} /> 학점
                    </InputWrapper>
                </InputContainer>
            </ContentWrapper>
            <NextButton onClick={() => navigate("/result")}>Next</NextButton>
        </PageWrapper>
    );
}

