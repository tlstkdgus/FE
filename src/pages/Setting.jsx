import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const ChooseButton = styled.button`
  width: 200px;
  height: 50px;
  margin: 10px;
  background-color: #4caf50;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
`;

export default function Setting() {
  const navigate = useNavigate();

  const gotoPage = (path) => {
    navigate(path);
  };

  return (
    <PageContainer>
      <h1>설정 페이지입니다.</h1>
      <ChooseButton onClick={() => gotoPage("/main")}>메인 페이지</ChooseButton>
      <ChooseButton onClick={() => gotoPage("/login")}>
        로그인 페이지
      </ChooseButton>
      <ChooseButton onClick={() => gotoPage("/signup")}>
        회원가입 페이지
      </ChooseButton>
      <ChooseButton onClick={() => gotoPage("/create")}>
        시간표 생성 페이지
      </ChooseButton>
      <ChooseButton onClick={() => gotoPage("/essential")}>
        필수 과목 설정 페이지
      </ChooseButton>
      <ChooseButton onClick={() => gotoPage("/exclude")}>
        과목 제외 페이지
      </ChooseButton>
      <ChooseButton onClick={() => gotoPage("/mypage")}>
        마이페이지
      </ChooseButton>
      <ChooseButton onClick={() => gotoPage("/retake")}>
        재수강 과목 설정 페이지
      </ChooseButton>
    </PageContainer>
  );
}
