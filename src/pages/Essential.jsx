import React, { useState } from "react";
import styled from "styled-components";
import { HiOutlineX } from "react-icons/hi";
import NavBarComponent from "../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { searchCourses, saveEssentialCourses } from "../axiosInstance";

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

const SearchResults = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const SearchResultItem = styled.div`
  background: ${(props) =>
    props.$isSelected ? "var(--subcolor)" : "var(--white)"};
  border: 1.5px solid
    ${(props) => (props.$isSelected ? "var(--brand)" : "var(--gray)")};
  border-radius: 12px;
  padding: 14px 12px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    border-color: var(--brand);
  }
`;

export default function Essential() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState(null);
  const [essentialList, setEssentialList] = useState([
    { id: 1, name: "운영체제", desc: "AI융합전공(Software&AI) | 임승호" },
    { id: 2, name: "컴퓨터논리개론", desc: "AI융합전공(Software&AI) | 김영란" },
    { id: 3, name: "종합설계", desc: "AI융합전공(Software&AI) | 고석훈" },
    { id: 4, name: "웹프로그래밍", desc: "AI융합전공(Software&AI) | 고석훈" },
  ]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchCourse = React.useCallback(async (trimmed) => {
    if (!trimmed) {
      setSelected(null);
      setSearchResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await searchCourses(trimmed);
      if (response && response.courses) {
        setSearchResults(response.courses);
      } else {
        setSearchResults([]);
      }
      setSelected(null);
    } catch (e) {
      console.error("과목 검색 오류:", e);
      setSelected(null);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    const trimmed = input.trim();

    if (!trimmed) {
      fetchCourse(trimmed);
      return;
    }

    const timeoutId = setTimeout(() => {
      fetchCourse(trimmed);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [input, fetchCourse]);
  const handleSelectCourse = (course) => {
    setSelected({
      courseCode: course.courseCode,
      courseName: course.courseName,
      department: course.department,
      credits: course.credits,
      professor: course.professor,
      // 기존 UI 호환성을 위한 매핑
      name: course.courseName,
      desc: `${course.department} | ${course.professor}`,
      code: course.courseCode,
    });
    setSearchResults([]);
  };
  const handleApply = async () => {
    if (selected) {
      // 중복 방지 검사
      const isDuplicate = essentialList.some(
        (course) => course.courseCode === selected.courseCode
      );

      if (isDuplicate) {
        alert("이미 추가된 과목입니다.");
        return;
      }

      const newCourse = {
        name: selected.name,
        desc: selected.desc,
        code: selected.code,
        courseCode: selected.courseCode,
        courseName: selected.courseName,
        department: selected.department,
        credits: selected.credits,
        professor: selected.professor,
      };
      const updatedList = [...essentialList, newCourse];
      setEssentialList(updatedList);

      // localStorage에 저장 (시간표 생성용)
      localStorage.setItem("essentialCourses", JSON.stringify(updatedList));

      // API에 저장 (과목 코드만 전송)
      try {
        const userData = localStorage.getItem("userData");
        const userId = userData ? JSON.parse(userData).userId : null;

        const courseCodes = updatedList.map((course) => course.courseCode);
        await saveEssentialCourses(userId, courseCodes);
      } catch (error) {
        console.error("필수 과목 저장 오류:", error);
      }

      setInput("");
      setSelected(null);
    }
  };
  const handleRemove = async (idx) => {
    const updatedList = essentialList.filter((_, i) => i !== idx);
    setEssentialList(updatedList);

    // API에 업데이트된 목록 저장 (과목 코드만 전송)
    try {
      const userData = localStorage.getItem("userData");
      const userId = userData ? JSON.parse(userData).userId : null;

      const courseCodes = updatedList.map((course) => course.courseCode);
      await saveEssentialCourses(userId, courseCodes);
    } catch (error) {
      console.error("필수 과목 업데이트 오류:", error);
    }
  };

  return (
    <Container>
      <Inner>
        <Label>필수 과목 설정</Label>
        <Description>
          이번 학기 시간표에 필수적으로 넣고 싶은
          <br />
          과목의 학수 번호를 입력해 주세요
        </Description>
        <Notice>
          주의사항 :<br />
          본인이 듣고자 하는 최대 학점을 초과한 필수 과목 설정이
          <br />
          불가능하며, 선택한 과목들은 시간표 생성 시 우선 반영됩니다
        </Notice>{" "}
        <Input
          placeholder="학수 번호를 입력해 주세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {/* 검색 결과 표시 */}
        {searchResults.length > 0 && (
          <SearchResults>
            {searchResults.map((course, index) => (
              <SearchResultItem
                key={`${course.courseCode}-${index}`}
                onClick={() => handleSelectCourse(course)}
              >
                <div>{course.courseName}</div>
                <SubText>
                  {course.department} | {course.professor}
                </SubText>
              </SearchResultItem>
            ))}
          </SearchResults>
        )}
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
