import styled from "styled-components";
import logo from "../LOGO.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import NavBarComponent from "../Components/NavBar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  min-height: 100vh;
`;

const Content = styled.div`
  width: 100%;
  max-width: 440px;
  min-width: 320px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: var(--white);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;

  scroll-behavior: smooth;
  scrollbar-width: none;
  .scroll::webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
`;

const Header = styled.div`
  display: flex;
  padding: 16px;
  height: 72px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  background: var(--brand);
  flex-shrink: 0;
`;

const Logo = styled.img`
  width: 111px;
  height: 40px;
  aspect-ratio: 111/40;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
  margin-right: "16px";
  cursor: pointer;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Contents = styled.div`
  display: flex;
  padding: 32px 16px;
  flex-direction: column;
  flex: 1 1 0%;
  min-height: 0;
  width: 100%;
  overflow-y: auto;
  padding-bottom: ${(props) =>
    props.hasNavBar ? "calc(72px + 16px)" : "32px"};
`;

export default function Mobile({ children }) {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const showNavBar = ["/main", "/essential", "/exclude", "/retake"].includes(
    currentPath
  ); // 뒤로가기 버튼을 표시할 페이지들
  const showBackButton = [
    "/essential",
    "/exclude",
    "/retake",
    "/credits",
    "/mypage",
    "/login",
    "/signup",
    "/signup-complete",
    "/create",
    "/day",
    "/credit",
    "/combination",
    "/result",
    "/edit-profile",
  ].includes(currentPath);

  // 햄버거 메뉴를 표시할 페이지들 (메인 페이지)
  const showHamburgerMenu = ["/main"].includes(currentPath);
  const handleBack = () => {
    // 페이지별 뒤로가기 로직 - 대부분 홈으로 이동
    switch (currentPath) {
      case "/mypage":
        navigate("/main");
        break;
      case "/essential":
      case "/exclude":
      case "/retake":
      case "/credits":
        // 이 페이지들은 기본적으로 홈으로 이동
        navigate("/main");
        break;

      case "/edit-profile":
        navigate("/mypage");
        break;
      case "/login":
      case "/signup":
        navigate("/main");
        break;

      case "/signup-complete":
        // 회원가입 완료 후에는 로그인 페이지로
        navigate("/login");
        break;

      case "/create":
        navigate("/main");
        break;

      case "/day":
      case "/credit":
        // 시간표 생성 플로우에서는 이전 단계로
        navigate("/create");
        break;

      case "/combination":
        // day나 credit에서 온 경우에만 이전 페이지로, 아니면 create로
        const referrer = document.referrer;
        if (
          referrer &&
          (referrer.includes("/day") || referrer.includes("/credit"))
        ) {
          navigate(-1);
        } else {
          navigate("/create");
        }
        break;

      case "/result":
        navigate("/combination");
        break;

      default:
        // 기본적으로 홈으로 이동
        navigate("/main");
        break;
    }
  };

  return (
    <Container>
      <Content>
        <Header>
          {showBackButton && (
            <BackButton onClick={handleBack}>
              <HiArrowLeft size={24} color="white" />
            </BackButton>
          )}
          <Logo src={logo} />
          {showHamburgerMenu && (
            <Menu>
              <GiHamburgerMenu
                size={24}
                color="white"
                onClick={() => navigate("/mypage")}
              />
            </Menu>
          )}
        </Header>
        <Contents hasNavBar={showNavBar}>{children}</Contents>
        {showNavBar && <NavBarComponent />}
      </Content>
    </Container>
  );
}
