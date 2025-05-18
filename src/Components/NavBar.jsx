import React from "react";
import styled from "styled-components";
import { HiOutlineXCircle } from "react-icons/hi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { GrPowerCycle } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const NavBar = styled.div`
  display: flex;
  width: var(--content-width, 100%);
  height: auto;
  max-width: 440px;
  padding: 8px 16px;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--line);
  background: var(--white);
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  margin: 0 auto;
`;

const NavItem = styled.div`
  display: flex;
  width: 94px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 8px;
  flex-shrink: 0;
  cursor: pointer;
`;

export default function NavBarComponent() {
  const navigate = useNavigate();
  return (
    <NavBar className="body-medium-small">
      <NavItem onClick={() => navigate("/exclude")}>
        <HiOutlineXCircle size={20} color="var(--brand)" />
        수강한 과목
        <br /> 제외
      </NavItem>
      <NavItem onClick={() => navigate("/essential")}>
        <AiOutlineCheckCircle size={20} color="var(--brand)" />
        필수 과목
        <br /> 설정
      </NavItem>
      <NavItem onClick={() => navigate("/retake")}>
        <GrPowerCycle size={20} color="var(--brand)" />
        재수강 과목
        <br /> 설정
      </NavItem>
    </NavBar>
  );
}
