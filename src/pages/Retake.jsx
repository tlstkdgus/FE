import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBarComponent from "../Components/NavBar";
import { HiOutlineX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const PREV_SUBJECTS = [
  { id: 1, name: "운영체제", desc: "AI융합전공(Software&AI) | 임승호" },
  { id: 2, name: "컴퓨터논리개론", desc: "AI융합전공(Software&AI) | 김영란" },
  { id: 3, name: "종합설계", desc: "AI융합전공(Software&AI) | 고석훈" },
  { id: 4, name: "웹프로그래밍", desc: "AI융합전공(Software&AI) | 고석훈" },
  { id: 5, name: "데이터베이스", desc: "AI융합전공(Software&AI) | 이진수" },
  { id: 6, name: "알고리즘", desc: "AI융합전공(Software&AI) | 박민호" },
  { id: 7, name: "프로그래밍언어론", desc: "AI융합전공(Software&AI) | 김철수" },
  { id: 8, name: "소프트웨어공학", desc: "AI융합전공(Software&AI) | 정유진" },
  {
    id: 9,
    name: "네트워크프로그래밍",
    desc: "AI융합전공(Software&AI) | 송민재",
  },
  { id: 10, name: "인공지능", desc: "AI융합전공(Software&AI) | 한지민" },
  { id: 11, name: "컴퓨터구조", desc: "AI융합전공(Software&AI) | 이상현" },
];

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
  margin-bottom: 28px;
  line-height: 1.5;
`;

const ListTitle = styled.div`
  font-size: var(--title-h4);
  font-weight: var(--font-weight-bold);
  margin-bottom: 16px;
`;

const PrevListBox = styled.div`
  border-radius: 12px;
  margin-bottom: 20px;
  color: var(--black);
`;

const PrevList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 8px;
`;

const PrevItem = styled.div`
  padding: 12px 10px;
  border-radius: ${({ selected }) => (selected ? "10px" : "0")};
  background: ${({ selected }) => (selected ? "var(--subcolor)" : "none")};
  color: var(--black);
  border: ${({ selected }) => (selected ? "1.5px solid var(--brand)" : "none")};
  cursor: pointer;
  margin-bottom: ${({ selected }) => (selected ? "4px" : "0")};
  transition: 0.2s;
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

const RetakeListTitle = styled.div`
  font-size: var(--title-h4);
  font-weight: var(--font-weight-bold);
  margin-bottom: 16px;
`;

const RetakeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 72px;
`;

const RetakeItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
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

const SaveButton = styled.button`
  width: 100%;
  padding: 16px 0;
  background: var(--brand);
  color: var(--white);
  border-radius: 12px;
  font-size: var(--body-button-default);
  font-weight: var(--font-weight-bold);
  margin-bottom: 20px;
  margin-top: 28px;
  transition: 0.2s;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

export default function Retake() {
  const [selectedId, setSelectedId] = useState(null);
  const [retakeList, setRetakeList] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();
  // 재수강 과목 리스트가 변경될 때마다 localStorage에 자동 저장
  useEffect(() => {
    if (retakeList.length > 0) {
      localStorage.setItem("retakeCourses", JSON.stringify(retakeList));
      console.log("🔄 재수강 과목 자동 저장:", retakeList);
    }
  }, [retakeList]);

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const handleApply = () => {
    const subject = PREV_SUBJECTS.find((s) => s.id === selectedId);
    if (subject && !retakeList.some((s) => s.id === subject.id)) {
      setRetakeList((list) => [...list, subject]);
      setSelectedId(null);
    }
  };

  const handleRemove = (idx) => {
    setRetakeList((list) => list.filter((_, i) => i !== idx));
  };
  const handleSave = async () => {
    try {
      setIsSaving(true);
      console.log("📋 재수강 과목 저장 시작:", retakeList);

      // 목데이터 기반이므로 임시 userId 사용
      const userId = 1;

      // 재수강 과목 데이터를 localStorage에 저장 (목데이터 시뮬레이션)
      localStorage.setItem("retakeCourses", JSON.stringify(retakeList));

      console.log("✅ 재수강 과목 저장 완료");
      alert("재수강 과목이 저장되었습니다!");
      navigate("/main");
    } catch (error) {
      console.error("❌ 재수강 과목 저장 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  // localStorage 초기화 함수 (디버깅용)
  const clearRetakeList = () => {
    setRetakeList([]);
    localStorage.removeItem("retakeCourses");
    console.log("🗑️ 재수강 과목 리스트가 초기화되었습니다.");
  };

  return (
    <Container>
      <Inner>
        <Label>재수강 과목 설정</Label>
        <Description>
          수강한 과목 중 재수강할 과목의
          <br />
          학수 번호를 입력해 주세요
        </Description>
        <Notice>
          주의사항 :<br />
          수강한 과목 제외 페이지에서 제외하지 않은 과목은
          <br />
          아래 리스트에서 확인할 수 없으며,
          <br />
          선택한 과목들은 시간표 생성 시 우선 반영됩니다
        </Notice>
        <ListTitle>이전 수강 과목 리스트</ListTitle>
        <PrevListBox>
          <PrevList>
            {PREV_SUBJECTS.map((item) => (
              <PrevItem
                key={item.id}
                selected={selectedId === item.id}
                onClick={() => handleSelect(item.id)}
              >
                <div>{item.name}</div>
                <SubText>{item.desc}</SubText>
              </PrevItem>
            ))}
          </PrevList>
        </PrevListBox>
        <Button onClick={handleApply} disabled={selectedId === null}>
          적용하기
        </Button>
        <RetakeListTitle>재수강 선택 과목 리스트</RetakeListTitle>
        {retakeList.length > 0 && (
          <div style={{ marginBottom: '16px', textAlign: 'right' }}>
            <button
              onClick={clearRetakeList}
              style={{
                padding: '8px 16px',
                background: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              전체 삭제
            </button>
          </div>
        )}
        <RetakeList>
          {retakeList.map((item, idx) => (
            <RetakeItem key={item.id}>
              <ItemInfo>
                <div>{item.name}</div>
                <SubText>{item.desc}</SubText>
              </ItemInfo>
              <RemoveButton onClick={() => handleRemove(idx)} aria-label="삭제">
                <HiOutlineX size={22} color="var(--subtext)" />
              </RemoveButton>
            </RetakeItem>
          ))}
        </RetakeList>
        <SaveButton
          disabled={retakeList.length === 0 || isSaving}
          onClick={handleSave}
        >
          {isSaving ? "저장 중..." : "저장하기"}
        </SaveButton>
      </Inner>
      <NavBarComponent />
    </Container>
  );
}
