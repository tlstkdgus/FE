import React from "react";
import styled from "styled-components";
import { HiOutlineXCircle } from "react-icons/hi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { GrPowerCycle } from "react-icons/gr";

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
`;

export default function NavBarComponent() {
  return (
    <NavBar className="body-medium-small">
      <NavItem>
        <HiOutlineXCircle size={20} color="var(--brand)" />
        수강한 과목
        <br /> 제외
      </NavItem>
      <NavItem>
        <AiOutlineCheckCircle size={20} color="var(--brand)" />
        필수 과목
        <br /> 설정
      </NavItem>
      <NavItem>
        <GrPowerCycle size={20} color="var(--brand)" />
        재수강 과목
        <br /> 설정
      </NavItem>
    </NavBar>
  );
}
