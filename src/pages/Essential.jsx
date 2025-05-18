import React, { useState } from "react";
import styled from "styled-components";
import NavBarComponent from "../Components/NavBar";
import { HiOutlineX } from "react-icons/hi";

const SUBJECTS = {
  "V41009201": { name: "운영체제", desc: "AI 융합전공 | 교수명" },
  "T07201201": { name: "컴퓨터 구조", desc: "AI 융합전공 | 교수명" },
  "T07403201": { name: "종합설계", desc: "AI 융합전공 | 교수명" },
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
  margin-bottom: 16px;
`;

const Notice = styled.div`
  font-size: var(--body-small);
  color: #f44336;
  margin-bottom: 16px;
  line-height: 1.5;
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

const EssentialList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 72px;
`;

const EssentialItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  row-gap: 6px;
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

export default function Essential() {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState(null);
  const [essentialList, setEssentialList] = useState([
    { name: "운영체제", desc: "AI융합전공(Software&AI) | 임승호" },
    { name: "웹프로그래밍", desc: "AI융합전공(Software&AI) | 고석훈" },
    { name: "컴퓨터논리개론", desc: "AI융합전공(Software&AI) | 김영란" },
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
      setEssentialList(list => [...list, selected]);
      setInput("");
      setSelected(null);
    }
  };

  const handleRemove = idx => {
    setEssentialList(list => list.filter((_, i) => i !== idx));
  };

  return (
    <Container>
      <Inner>
        <Label>필수 과목 설정</Label>
        <Description>
          이번 학기 시간표에 필수적으로 넣고 싶은<br />
          과목의 학수 번호를 입력해 주세요
        </Description>
        <Notice>
          주의사항 :<br />
          본인이 듣고자 하는 최대 학점을 초과한 필수 과목 설정이<br />
          불가능하며, 선택한 과목들은 시간표 생성 시 우선 반영됩니다
        </Notice>
        <Input
          placeholder="학수 번호를 입력해 주세요"
          value={input}
          onChange={e => setInput(e.target.value)}
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
        <ListTitle>필수 과목 리스트</ListTitle>
        <EssentialList>
          {essentialList.map((item, idx) => (
            <EssentialItem key={idx}>
              <ItemInfo>
                <div>{item.name}</div>
                <SubText>{item.desc}</SubText>
              </ItemInfo>
              <RemoveButton onClick={() => handleRemove(idx)} aria-label="삭제">
                <HiOutlineX size={22} color="var(--subtext)" />
              </RemoveButton>
            </EssentialItem>
          ))}
        </EssentialList>
      </Inner>
      <NavBarComponent />
    </Container>
  );
}
