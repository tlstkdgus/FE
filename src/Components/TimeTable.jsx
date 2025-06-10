import React from "react";
import styled from "styled-components";

// 원래 시간대로 복원 (오전 9시부터 오후 9시까지)
const days = ["월", "화", "수", "목", "금"];
const times = ["9", "10", "11", "12", "1", "2", "3", "4", "5", "6", "7", "8"];

const TableWrapper = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const Table = styled.table`
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
`;

const Th = styled.th`
  border: 1px solid #e5e5ec;
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #111;
  text-align: center;
  background: #fff;
  width: ${(props) => (props.$isTime ? "31px" : "auto")};
  min-width: ${(props) => (props.$isTime ? "31px" : "auto")};
  height: 40px;
  padding: 0;
  box-sizing: border-box;
`;

const Td = styled.td`
  border: 1px solid #e5e5ec;
  height: 40px;
  text-align: center;
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  color: #111;
  background: ${(props) =>
    props.selected ? "var(--MidBlue, rgba(48, 95, 248, 0.30))" : "#fff"};
  cursor: pointer;
  user-select: none;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`;

const SubjectCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 3px;
  padding: 4px;
  position: absolute;
  box-sizing: border-box;
  z-index: 2;
  pointer-events: none;
`;

const SubjectName = styled.div`
  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #111;
  line-height: 1.4;
  letter-spacing: -0.025em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const ProfessorName = styled.div`
  font-family: "Pretendard", sans-serif;
  font-size: 10px;
  font-weight: 400;
  color: #111;
  line-height: 1.4;
  letter-spacing: -0.025em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const getSubjectColor = (subject) => {
  const colorMap = {};
  // 랜덤 파스텔 색상 생성
  const pastel = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 85%)`;
  };
  return pastel();
};

function Timetable({
  data = [],
  selectable = false,
  onSelect,
  selectedCells = [],
}) {
  const tableRef = React.useRef(null);
  const wrapperRef = React.useRef(null);
  const [cardRects, setCardRects] = React.useState([]);
  const [dragging, setDragging] = React.useState(false);
  const [dragAdd, setDragAdd] = React.useState(true);

  // 드래그 셀 선택 핸들러
  const handleMouseDown = (id) => {
    setDragging(true);
    if (onSelect) {
      if (selectedCells.includes(id)) {
        setDragAdd(false);
        onSelect(selectedCells.filter((cell) => cell !== id));
      } else {
        setDragAdd(true);
        onSelect([...selectedCells, id]);
      }
    }
  };

  const handleMouseOver = (id) => {
    if (!dragging) return;
    if (onSelect) {
      if (dragAdd && !selectedCells.includes(id)) {
        onSelect([...selectedCells, id]);
      } else if (!dragAdd && selectedCells.includes(id)) {
        onSelect(selectedCells.filter((cell) => cell !== id));
      }
    }
  };

  const handleMouseUp = () => setDragging(false);

  React.useEffect(() => {
    if (!selectable) return;
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [selectable]);

  // 카드 위치 계산 (리사이징 및 데이터 변경 시)
  const calculateCardRects = React.useCallback(() => {
    if (!tableRef.current || !data.length) return;

    const tableRect = tableRef.current.getBoundingClientRect();
    const rects = [];

    data.forEach((item) => {
      const { day, start, end, time, subject, professor } = item;
      const startTime = start || time;
      const endTime = end || time;

      const dayIndex = days.indexOf(day); // 요일 인덱스
      const startIndex = times.indexOf(startTime); // 시작 시간 인덱스
      const endIndex = times.indexOf(endTime); // 종료 시간 인덱스

      if (dayIndex === -1 || startIndex === -1 || endIndex === -1) return;

      // 테이블 구조: 첫 번째 열은 시간 표시, 그 다음부터 요일
      // 따라서 요일 셀은 dayIndex + 2 (1부터 시작 + 시간 열)
      const firstCell = tableRef.current.querySelector(
        `tbody tr:nth-child(${startIndex + 1}) td:nth-child(${dayIndex + 2})`
      );

      if (!firstCell) return;

      // 첫 번째 셀의 위치와 크기
      const firstCellRect = firstCell.getBoundingClientRect();

      // 마지막 셀이 있으면 높이 계산을 위해 가져옴
      let height = firstCellRect.height;
      if (endIndex > startIndex) {
        const lastCell = tableRef.current.querySelector(
          `tbody tr:nth-child(${endIndex + 1}) td:nth-child(${dayIndex + 2})`
        );
        if (lastCell) {
          const lastCellRect = lastCell.getBoundingClientRect();
          height = lastCellRect.bottom - firstCellRect.top;
        }
      }

      // 테이블 기준 상대 위치 계산
      const left = firstCellRect.left - tableRect.left;
      const top = firstCellRect.top - tableRect.top;
      const width = firstCellRect.width;

      rects.push({
        subject,
        professor,
        color: getSubjectColor(subject),
        left,
        top,
        width,
        height,
      });
    });

    setCardRects(rects);
  }, [data]);

  // 초기 렌더링 및 리사이징, 데이터 변경 시 카드 위치 재계산
  React.useEffect(() => {
    calculateCardRects();

    // 리사이징 이벤트 리스너
    const handleResize = () => {
      calculateCardRects();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateCardRects]);

  // 시간표 및 카드 렌더링
  return (
    <TableWrapper ref={wrapperRef}>
      <Table ref={tableRef}>
        <thead>
          <tr>
            <Th $isTime></Th>
            {days.map((day) => (
              <Th key={day}>{day}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time) => (
            <tr key={time}>
              <Th $isTime>{time}</Th>
              {days.map((day) => {
                const cellId = `${day}-${time}`;
                return (
                  <Td
                    key={cellId}
                    selected={selectedCells.includes(cellId)}
                    onMouseDown={() => handleMouseDown(cellId)}
                    onMouseOver={() => handleMouseOver(cellId)}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* 과목 카드 렌더링 */}
      {cardRects.map((card, idx) => (
        <SubjectCard
          key={idx}
          style={{
            left: `${card.left}px`,
            top: `${card.top}px`,
            width: `${card.width}px`,
            height: `${card.height}px`,
            background: card.color,
          }}
        >
          <SubjectName>{card.subject}</SubjectName>
          <ProfessorName>{card.professor}</ProfessorName>
        </SubjectCard>
      ))}
    </TableWrapper>
  );
}

export default Timetable;
