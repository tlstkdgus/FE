import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineXCircle,
  HiOutlineLogout,
  HiOutlineAcademicCap,
  HiOutlinePencil,
} from "react-icons/hi";
import { AiOutlineCheckCircle, AiOutlineUser } from "react-icons/ai";
import { GrPowerCycle } from "react-icons/gr";
import { getToken, removeToken } from "../axiosInstance";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const UserSection = styled.div`
  padding: 32px 16px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1.5" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="1" fill="rgba(255,255,255,0.1)"/></svg>');
    opacity: 0.3;
  }
`;

const UserCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 24px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 16px;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--brand) 0%, #667eea 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(48, 95, 248, 0.3);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 3px;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      transparent 0%,
      rgba(255, 255, 255, 0.2) 100%
    );
  }
`;

const UserDetails = styled.div`
  flex: 1;
`;

const EditButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--white);
  border: 2px solid var(--brand);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(48, 95, 248, 0.1);

  &:hover {
    background: var(--brand);
    transform: scale(1.1);
    box-shadow: 0 4px 15px rgba(48, 95, 248, 0.3);

    svg {
      color: var(--white);
    }
  }
`;

const UserName = styled.div`
  font-size: var(--title-h2);
  font-weight: var(--font-weight-bold);
  color: var(--black);
  margin-bottom: 4px;
`;

const UserMeta = styled.div`
  font-size: var(--body-default);
  color: var(--subtext);
  margin-bottom: 2px;
`;

const LoginSection = styled.div`
  padding: 60px 16px;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, var(--brand) 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
    );
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: translate(0%, 0%) rotate(0deg);
    }
    50% {
      transform: translate(-5%, -5%) rotate(180deg);
    }
  }
`;

const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px 24px;
  backdrop-filter: blur(10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  max-width: 320px;
  margin: 0 auto;
`;

const LoginMessage = styled.div`
  font-size: var(--body-large);
  color: var(--black);
  margin-bottom: 32px;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const LoginButton = styled.button`
  padding: 14px 28px;
  background: var(--brand);
  color: var(--white);
  border: none;
  border-radius: 12px;
  font-size: var(--body-button-default);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(48, 95, 248, 0.3);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(48, 95, 248, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SignUpButton = styled.button`
  padding: 14px 28px;
  background: var(--white);
  color: var(--brand);
  border: 2px solid var(--brand);
  border-radius: 12px;
  font-size: var(--body-button-default);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--brand);
    color: var(--white);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(48, 95, 248, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const MenuSection = styled.div`
  padding: 24px 16px;
`;

const MenuCard = styled.div`
  background: var(--white);
  border-radius: 16px;
  padding: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.2s ease;
  margin-bottom: 4px;

  &:hover {
    background: linear-gradient(135deg, var(--section) 0%, #f8fafc 100%);
    transform: translateX(4px);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const MenuIcon = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--subcolor) 0%, #e6f0ff 100%);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(48, 95, 248, 0.1);
`;

const MenuText = styled.div`
  font-size: var(--body-default);
  color: var(--black);
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 16px;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.2s ease;
  margin-top: 8px;

  &:hover {
    background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
    transform: translateX(4px);
  }
`;

export default function MyPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);

      // localStorage에서 사용자 정보 가져오기
      const savedUserData = localStorage.getItem("userData");
      if (savedUserData) {
        const userData = JSON.parse(savedUserData);
        setUser({
          name: userData.name || "사용자",
          major: userData.major || "전공 미설정",
          studentId: userData.studentId || "",
          doubleMajor: userData.doubleMajor || "",
        });
      } else {
        // 기본값 설정
        setUser({
          name: "신상현",
          major: "Global Business & Technology 학부",
          studentId: "202001896",
          doubleMajor: "AI융합전공",
        });
      }
    }
  }, []);

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };
  const menuItems = [
    {
      icon: <HiOutlineAcademicCap size={20} color="var(--brand)" />,
      text: "이수 학점 설정",
      path: "/credits",
    },
    {
      icon: <HiOutlineXCircle size={20} color="var(--brand)" />,
      text: "수강한 과목 제외",
      path: "/exclude",
    },
    {
      icon: <AiOutlineCheckCircle size={20} color="var(--brand)" />,
      text: "필수 과목 설정",
      path: "/essential",
    },
    {
      icon: <GrPowerCycle size={20} color="var(--brand)" />,
      text: "재수강 과목 설정",
      path: "/retake",
    },
  ];
  return (
    <Container>
      {isLoggedIn ? (
        <>
          <UserSection>
            <UserCard>
              <UserInfo>
                <Avatar>
                  <AiOutlineUser size={36} color="var(--white)" />
                </Avatar>{" "}
                <UserDetails>
                  <UserName>{user?.name}</UserName>
                  <UserMeta>{user?.major}</UserMeta>
                  {user?.doubleMajor && (
                    <UserMeta>이중/부전공: {user.doubleMajor}</UserMeta>
                  )}
                  <UserMeta>학번: {user?.studentId}</UserMeta>
                </UserDetails>
                <EditButton onClick={() => navigate("/edit-profile")}>
                  <HiOutlinePencil size={16} color="var(--brand)" />
                </EditButton>
              </UserInfo>
            </UserCard>
          </UserSection>

          <MenuSection>
            <MenuCard>
              {menuItems.map((item, index) => (
                <MenuItem key={index} onClick={() => navigate(item.path)}>
                  <MenuIcon>{item.icon}</MenuIcon>
                  <MenuText>{item.text}</MenuText>
                </MenuItem>
              ))}

              <LogoutButton onClick={handleLogout}>
                <MenuIcon>
                  <HiOutlineLogout size={20} color="var(--brand)" />
                </MenuIcon>
                <MenuText style={{ color: "var(--brand)" }}>로그아웃</MenuText>
              </LogoutButton>
            </MenuCard>
          </MenuSection>
        </>
      ) : (
        <LoginSection>
          <LoginCard>
            <LoginMessage>
              로그인이 필요한 서비스입니다.
              <br />
              로그인 후 이용해주세요.
            </LoginMessage>
            <ButtonGroup>
              <LoginButton onClick={() => navigate("/login")}>
                로그인
              </LoginButton>
              <SignUpButton onClick={() => navigate("/signup")}>
                회원가입
              </SignUpButton>
            </ButtonGroup>
          </LoginCard>
        </LoginSection>
      )}
    </Container>
  );
}
