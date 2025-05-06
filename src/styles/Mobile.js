import styled from "styled-components";
import logo from "../LOGO.png";
import { GiHamburgerMenu } from "react-icons/gi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
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

  scroll-behavior: smooth;
  scrollbar-width: none;
  .scroll::webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  overflow: -moz-scrollbars-none; /* Firefox */
`;

const Header = styled.div`
  display: flex;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  background: var(--brand);
  position: relative;
`;

const Logo = styled.img`
  width: 111px;
  height: 40px;
  aspect-ratio: 111/40;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
  margin-right: "16px";
`;

const Contents = styled.div`
  display: flex;
  padding: 32px 16px;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  width: 100%;
`;

export default function Mobile({ children }) {
  return (
    <Container>
      <Content>
        <Header>
          <Logo src={logo} />
          <Menu>
            <GiHamburgerMenu size={24} color="white" />
          </Menu>
        </Header>
        <Contents>{children}</Contents>
      </Content>
    </Container>
  );
}
