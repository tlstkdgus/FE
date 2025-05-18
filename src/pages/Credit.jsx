import React from "react";
import styled from "styled-components";
import { BarContainer, StepBar, DefaultBar, PageWrapper, ContentWrapper, TitleWrapper, Title, NextButton, Subtitle } from "../Components/CreateComponent";
import { useNavigate } from "react-router-dom";
import { useSchedule } from "../context/ScheduleContext";

const InputWrapper = styled.div`
    display: flex;
    gap: 16px;
    width: 100%;
    align-items: center;
    padding: 0px 16px;
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
`


export default function Credit() {
    const navigate = useNavigate();
    const { credit, setCredit } = useSchedule();
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
                    <Title>이번학기에 수강할 <br /> 학점 범위를 입력해 주세요</Title>
                    <Subtitle>최소 4학점부터 입력 가능해요</Subtitle>
                </TitleWrapper>
                <InputWrapper>
                    최소
                    <InputBox value={credit.min} onChange={e => setCredit(c => ({...c, min: e.target.value}))} />
                    학점
                </InputWrapper>
                <InputWrapper>  
                    최대
                    <InputBox value={credit.max} onChange={e => setCredit(c => ({...c, max: e.target.value}))} />
                    학점
                </InputWrapper>
            </ContentWrapper>
            <NextButton onClick={() => navigate("/combination")}>Next</NextButton>
        </PageWrapper>
    );
}

