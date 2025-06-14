import styled from "styled-components";

export const BarContainer = styled.div`
  display: flex;
  width: 320px;
  align-items: center;
  justify-content: center;
`;

export const StepBar = styled.div`
  height: 3px;
  flex: 1 0 0;
  background: #305ff8;
`;

export const DefaultBar = styled.div`
  height: 3px;
  flex: 1 0 0;
  background: #d9d9d9;
`;

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: #fff;
  gap: 32px;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 24px 0px;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  border-radius: 8px;
  border: 1px solid #111111;
`;

export const TitleWrapper = styled.div`
  display: flex;
  padding: 0px 16px;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  align-self: stretch;
`;

export const Title = styled.div`
  font-family: "Pretendard", sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: #111;
  line-height: 1.4;
  letter-spacing: -0.025em;
  margin-bottom: 10px;
  text-align: left;
`;

export const Subtitle = styled.div`
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #111;
  line-height: 1.4;
  letter-spacing: -0.025em;
  white-space: pre-line;
  text-align: left;
`;

export const NextButton = styled.button`
  width: 320px;
  height: 64px;
  background: #305ff8;
  border-radius: 10px;
  border: none;
  color: #fff;
  font-family: "Pretendard", sans-serif;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  margin: 18px 0 0 0;
  display: block;
  cursor: pointer;
`;
