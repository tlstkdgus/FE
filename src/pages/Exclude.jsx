import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft, HiOutlineX } from "react-icons/hi";
import NavBarComponent from "../Components/NavBar";
import {
  postCompletedReferences,
  deleteCompletedReference,
  searchCourses,
} from "../axiosInstance";

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

export default function Exclude() {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState(null);
  const [excludeList, setExcludeList] = useState([
    { id: 1, name: "데이터베이스", desc: "AI융합전공(Software&AI) | 박교수" },
    { id: 2, name: "자료구조", desc: "AI융합전공(Software&AI) | 최교수" },
    {
      id: 3,
      name: "프로그래밍언어론",
      desc: "AI융합전공(Software&AI) | 정교수",
    },
  ]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // 초기 완료 과목 목록 로딩
  React.useEffect(() => {
    const loadCompletedCourses = async () => {
      try {
        const userData = localStorage.getItem("userData");
        const userId = userData ? JSON.parse(userData).userId : null;

        if (userId) {
          // 기존 완료 과목 목록을 불러오는 API가 있다면 여기서 호출
          // const completedCourses = await getCompletedReferences(userId);
          // setExcludeList(completedCourses);
        }
      } catch (error) {
        console.error("완료 과목 목록 로딩 오류:", error);
      }
    };

    loadCompletedCourses();
  }, []);
  const fetchCourse = useCallback(async (trimmed) => {
    if (!trimmed) {
      setSelected(null);
      setSearchResults([]);
      setLoading(false);
      return;
    }
    const userData = localStorage.getItem("userData");
    const userId = userData ? JSON.parse(userData).userId : null;
    if (!userId) {
      setSelected(null);
      setSearchResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // searchCourses 함수를 사용하여 과목 검색
      const response = await searchCourses(trimmed);
      // API 응답이 { courses: [...] } 형식인 경우
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

  // setTimeout을 사용한 지연 검색 (debounce 대체)
  React.useEffect(() => {
    const trimmed = input.trim();

    // 검색어가 비어있으면 즉시 처리
    if (!trimmed) {
      fetchCourse(trimmed);
      return;
    }

    // 500ms 지연 후 검색 실행
    const timeoutId = setTimeout(() => {
      fetchCourse(trimmed);
    }, 500);

    // cleanup function으로 이전 timeout 취소
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
    });
    setSearchResults([]); // 선택 후 검색 결과 숨김
  };

  const handleApply = async () => {
    if (selected) {
      // 이미 추가된 과목인지 확인
      const isAlreadyAdded = excludeList.some(
        (item) => item.courseCode === selected.courseCode
      );
      if (isAlreadyAdded) {
        alert("이미 추가된 과목입니다.");
        return;
      }

      const newList = [...excludeList, selected];
      setExcludeList(newList);
      setInput("");
      setSelected(null);

      // userId 가져오기 (localStorage의 userData에서)
      const userData = localStorage.getItem("userData");
      const userId = userData ? JSON.parse(userData).userId : null;

      // courseCode만 추출
      const courseCodes = newList
        .map((item) => item.courseCode)
        .filter(Boolean);

      try {
        await postCompletedReferences(userId, courseCodes);
        alert("이전 수강 과목이 성공적으로 저장되었습니다.");
      } catch (e) {
        alert("저장에 실패했습니다.");
      }
    }
  };

  const handleRemove = async (idx) => {
    const removed = excludeList[idx];
    const userData = localStorage.getItem("userData");
    const userId = userData ? JSON.parse(userData).userId : null;

    try {
      await deleteCompletedReference(userId, [removed.courseCode]);
      setExcludeList((list) => list.filter((_, i) => i !== idx));
      alert("과목이 성공적으로 삭제되었습니다.");
    } catch (e) {
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <Container>
      <Inner>
        <Label>수강한 과목 제외</Label>
        <Description>
          여러분이 이전에 수강한 과목의
          <br />
          학수번호를 입력해 주세요
        </Description>{" "}
        <Input
          placeholder="학수번호를 입력해 주세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {/* 검색 중 로딩 표시 */}
        {loading && (
          <div
            style={{
              textAlign: "center",
              color: "var(--subtext)",
              fontSize: "var(--body-default)",
              padding: "20px 0",
            }}
          >
            검색 중...
          </div>
        )}{" "}
        {/* 검색 결과가 없을 때 메시지 */}
        {!loading &&
          input.trim() &&
          searchResults.length === 0 &&
          !selected && (
            <div
              style={{
                textAlign: "center",
                color: "var(--subtext)",
                fontSize: "var(--body-default)",
                padding: "20px 0",
                background: "var(--gray-light)",
                borderRadius: "12px",
                marginBottom: "20px",
              }}
            >
              검색 결과가 없습니다.
            </div>
          )}
        {/* 검색 결과 표시 */}
        {searchResults.length > 0 && !selected && !loading && (
          <SearchResults>
            {" "}
            {searchResults.map((course, index) => (
              <SearchResultItem
                key={`${course.courseCode || course.학수번호}-${index}`}
                $isSelected={false}
                onClick={() => handleSelectCourse(course)}
              >
                <div style={{ fontWeight: "bold" }}>
                  {course.courseName || course.교과목명}
                </div>
                <SubText>
                  {course.courseCode || course.학수번호} |{" "}
                  {course.department || course.개설영역} |{" "}
                  {course.professor || course.담당교수}
                </SubText>
              </SearchResultItem>
            ))}
          </SearchResults>
        )}
        {/* 선택된 과목 표시 */}
        {selected && (
          <SelectedBox>
            <div style={{ fontWeight: "bold" }}>{selected.courseName}</div>
            <SubText>
              {selected.courseCode} | {selected.department} |{" "}
              {selected.professor}
            </SubText>
          </SelectedBox>
        )}
        <Button onClick={handleApply} disabled={!selected}>
          적용하기
        </Button>{" "}
        <ListTitle>이미 수강한 과목 목록</ListTitle>
        <ExcludeList>
          {excludeList.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "var(--subtext)",
                fontSize: "var(--body-default)",
                padding: "40px 0",
              }}
            >
              아직 추가된 과목이 없습니다.
            </div>
          ) : (
            excludeList.map((item, idx) => (
              <ExcludeItem key={idx}>
                <ItemInfo>
                  <div style={{ fontWeight: "bold" }}>{item.courseName}</div>
                  <SubText>
                    {item.courseCode} | {item.department} | {item.professor}
                  </SubText>
                </ItemInfo>
                <RemoveButton
                  onClick={() => handleRemove(idx)}
                  aria-label="삭제"
                >
                  <HiOutlineX size={22} color="var(--subtext)" />
                </RemoveButton>
              </ExcludeItem>
            ))
          )}
        </ExcludeList>
      </Inner>
      <NavBarComponent />
    </Container>
  );
}
