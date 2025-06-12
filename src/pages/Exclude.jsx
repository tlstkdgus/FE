import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft, HiOutlineX } from "react-icons/hi";
import NavBarComponent from "../Components/NavBar";

const SUBJECTS = {
  V41009201: { name: "운영체제", desc: "AI융합전공(Software&AI) | 임승호" },
  T07201201: {
    name: "컴퓨터논리개론",
    desc: "AI융합전공(Software&AI) | 김영란",
  },
  T02253601: { name: "웹프로그래밍", desc: "AI융합전공(Software&AI) | 고석훈" },
  T07403201: { name: "종합설계", desc: "AI융합전공(Software&AI) | 고석훈" },
};

const Container = styled.div`
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  min-height: 100vh;
  background: var(--white);
  display: flex;
  flex-direction: column;
  padding-bottom: 0;
`;

const Inner = styled.div`
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
`;

const Label = styled.div`
  font-size: var(--display-medium);
  font-weight: var(--font-weight-bold);
  margin-bottom: 20px;
  color: var(--black);
  margin-top: 16px;
`;

const Description = styled.div`
  font-size: var(--body-default);
  color: var(--black);
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 12px;
  border-radius: 10px;
  border: 1.5px solid var(--gray);
  background: var(--white);
  font-size: var(--body-default);
  margin-bottom: 20px;
`;

const SelectedBox = styled.div`
  background: var(--subcolor);
  border-radius: 12px;
  padding: 14px 12px;
  margin-bottom: 24px;
  border: 1.5px solid var(--brand);
  color: var(--black);
  transition: 0.2s;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 16px 0;
  background: var(--brand);
  color: var(--white);
  border-radius: 12px;
  font-size: var(--body-button-default);
  font-weight: var(--font-weight-bold);
  margin-bottom: 40px;
  margin-top: 0;
  transition: 0.2s;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const ListTitle = styled.div`
  font-size: var(--title-h4);
  font-weight: var(--font-weight-bold);
  margin-bottom: 28px;
`;

const ExcludeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 60px;
`;

const ExcludeItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
`;

const SubText = styled.div`
  font-size: var(--body-small);
  color: var(--subtext);
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  padding: 0 0 0 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export default function Exclude() {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState(null);
  const [excludeList, setExcludeList] = useState([
    { name: "운영체제", desc: "AI융합전공(Software&AI) | 임승호" },
    { name: "웹프로그래밍", desc: "AI융합전공(Software&AI) | 고석훈" },
  ]);

  React.useEffect(() => {
    if (SUBJECTS[input.trim()]) {
      setSelected(SUBJECTS[input.trim()]);
    } else {
      setSelected(null);
    }
  }, [input]);

  const handleApply = () => {
    if (selected) {
      setExcludeList((list) => [...list, selected]);
      setInput("");
      setSelected(null);
    }
  };

  const handleRemove = (idx) => {
    setExcludeList((list) => list.filter((_, i) => i !== idx));
  };

  return (
    <Container>
      <Inner>
        <Label>수강한 과목 제외</Label>
        <Description>
          여러분이 이전에 수강한 과목의
          <br />
          학수 번호를 입력해 주세요
        </Description>
        <Input
          placeholder="학수 번호를 입력해 주세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {selected && (
          <SelectedBox>
            <div>{selected.name}</div>
            <SubText>{selected.desc}</SubText>
          </SelectedBox>
        )}
        <Button onClick={handleApply} disabled={!selected}>
          적용하기
        </Button>
        <ListTitle>제외한 과목 리스트</ListTitle>
        <ExcludeList>
          {excludeList.map((item, idx) => (
            <ExcludeItem key={idx}>
              <ItemInfo>
                <div>{item.name}</div>
                <SubText>{item.desc}</SubText>
              </ItemInfo>
              <RemoveButton onClick={() => handleRemove(idx)} aria-label="삭제">
                <HiOutlineX size={22} color="var(--subtext)" />
              </RemoveButton>
            </ExcludeItem>
          ))}
        </ExcludeList>
      </Inner>
      <NavBarComponent />
    </Container>
  );
}
