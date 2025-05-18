import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const TopSpace = styled.div`
  height: 8px;
`;

const Card = styled.div`
  background: var(--white);
  border: 2px solid var(--brand);
  border-radius: 10px;
  padding: 22px 20px 18px 20px;
  margin-bottom: 28px;
  margin-left: 16px;
  margin-right: 16px;
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CenterCard = styled(Card)`
  align-items: center;
  text-align: center;
  margin-top: 0;
  min-height: 310px;
  padding-top: 36px;
  padding-bottom: 36px;
  justify-content: center;
`;

const Title = styled.div`
  font-size: var(--display-small);
  font-weight: 700;
  margin-bottom: 12px;
  line-height: 1.5;
`;

const Highlight = styled.span`
  color: var(--brand);
`;

const InfoList = styled.div`
  margin-top: 2px;
`;

const Info = styled.div`
  font-size: var(--body-default);
  color: var(--black);
  margin-bottom: 2px;
  font-weight: 400;
  line-height: 1.6;
`;

const ExclamationCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2.5px solid var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
`;

const ExclamationMark = styled.div`
  font-size: 32px;
  color: #111;
  font-weight: 700;
  line-height: 1;
`;

const GuideText = styled.div`
  color: var(--black);
  font-size: var(--body-default);
  font-weight: 400;
  margin-bottom: 18px;
  line-height: 1.6;
`;

const Button = styled.button`
  margin-top: 0;
  padding: 10px 0;
  width: 180px;
  background: var(--white);
  border: 1.5px solid var(--brand);
  border-radius: 8px;
  color: var(--brand);
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: background 0.2s;
  &:hover {
    background: var(--subcolor);
  }
`;

export default function Main() {
  const navigate = useNavigate();
  const user = {
    name: "신상현",
    major: "Global Business & Technology 학부",
    subMajor: "AI융합전공",
    studentId: "202001896",
    credits: "109/134",
  };

  return (
    <MainContainer>
      <TopSpace />
      <Card>
        <Title>
          반갑습니다 <Highlight>{user.name}</Highlight> 회원님
        </Title>
        <InfoList>
          <Info>본전공 : {user.major}</Info>
          <Info>이중/부전공 : {user.subMajor}</Info>
          <Info>학번 : {user.studentId}</Info>
          <Info>취득 학점 : {user.credits}</Info>
        </InfoList>
      </Card>
      <CenterCard>
        <ExclamationCircle>
          <ExclamationMark>!</ExclamationMark>
        </ExclamationCircle>
        <GuideText>
          아직 생성된 시간표가 없어요!<br />
          시간표를 생성하러 가 볼까요?
        </GuideText>
        <Button onClick={() => navigate("/create")}>시간표 생성하기 <span style={{fontSize: '18px', fontWeight: 700}}>&rarr;</span></Button>
      </CenterCard>
    </MainContainer>
  );
}
