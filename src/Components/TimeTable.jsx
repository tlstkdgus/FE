import React from "react";
import styled from "styled-components";

const days = ["월", "화", "수", "목", "금"];
const times = [
"9", "10", "11", "12", "1", "2", "3", "4", "5", "6", "7", "8"
];

const TableWrapper = styled.div`
width: 358px;
background: #fff;
border-radius: 8px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
overflow: hidden;
position: relative;
border-collapse: collapse;
table-layout: fixed;
`;

const Table = styled.table`
border-collapse: collapse;
table-layout: fixed;
`;

const Th = styled.th`
border: 1px solid #E5E5EC;
font-family: 'Pretendard', sans-serif;
font-size: 14px;
font-weight: 400;
color: #111;
text-align: center;
background: #fff;
width: ${props => props.$isTime ? "31px" : "auto"};
min-width: ${props => props.$isTime ? "31px" : "auto"};
max-width: ${props => props.$isTime ? "31px" : "auto"};
height: 40px;
min-height: 40px;
max-height: 40px;
padding: 0;
box-sizing: border-box;
`;

const Td = styled.td`
border: 1px solid #E5E5EC;
width: 65px;
min-width: 65px;
max-width: 65px;
height: 40px;
min-height: 40px;
max-height: 40px;
text-align: center;
font-family: 'Pretendard', sans-serif;
font-size: 14px;
color: #111;
background: ${props => (props.selected ? "var(--MidBlue, rgba(48, 95, 248, 0.30))" : "#fff")};
cursor: pointer;
user-select: none;
padding: 0;
box-sizing: border-box;
`;

const SubjectCard = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
gap: 3px;
padding: 0px 4px;
align-self: stretch;
position: absolute;
box-sizing: border-box;
`;

const SubjectName = styled.div`
font-family: 'Pretendard', sans-serif;
font-size: 12px;
font-weight: 600;
color: #111;
line-height: 1.4;
letter-spacing: -0.025em;
`;

const ProfessorName = styled.div`
font-family: 'Pretendard', sans-serif;
font-size: 10px;
font-weight: 400;
color: #111;
line-height: 1.4;
letter-spacing: -0.025em;
`;


const getSubjectColor = (subject) => {
const colorMap = {
'웹 프로그래밍': '#DDF7EB',
'체육(요가)': '#DDEBF7',
'컴퓨터 논리 개론': '#F7DDDD'
};
return colorMap[subject] || '#eee';
};

function Timetable({
data = [],
selectable = false,
onSelect,
selectedCells = []
}) {
const tableRef = React.useRef(null);
const wrapperRef = React.useRef(null);
const [cardPositions, setCardPositions] = React.useState([]);
// 드래그 상태 관리
const [dragging, setDragging] = React.useState(false);
const [dragAdd, setDragAdd] = React.useState(true); // true: 추가, false: 해제

// 셀 위치를 계산하는 함수
const calculatePositions = () => {
if (!tableRef.current || !wrapperRef.current) return;

const tableRect = tableRef.current.getBoundingClientRect();
const wrapperRect = wrapperRef.current.getBoundingClientRect();

// 테이블 내 상대 위치로 조정
const offsetX = tableRect.left - wrapperRect.left;
const offsetY = tableRect.top - wrapperRect.top;

const newPositions = data.map(item => {
const day = item.day;
const start = item.start || item.time;
const end = item.end || item.time;

const dayIndex = days.indexOf(day);
const startIndex = times.indexOf(start);
const endIndex = times.indexOf(end);

if (dayIndex === -1 || startIndex === -1 || endIndex === -1) {
return null;
}

// 시간과 요일에 해당하는 셀 찾기
const startCell = tableRef.current.querySelector(`tbody tr:nth-child(${startIndex + 1}) td:nth-child(${dayIndex + 2})`);

if (!startCell) return null;

// 셀의 위치 및 크기 가져오기
const cellRect = startCell.getBoundingClientRect();

// 카드 높이 계산 (여러 셀에 걸친 경우)
let height = cellRect.height;

if (endIndex > startIndex) {
const endCell = tableRef.current.querySelector(`tbody tr:nth-child(${endIndex + 1}) td:nth-child(${dayIndex + 2})`);
if (endCell) {
const endCellRect = endCell.getBoundingClientRect();
height = (endCellRect.bottom - cellRect.top);
}
}

// 테이블 내 상대 위치로 변환
return {
...item,
position: {
x: cellRect.left - tableRect.left,
y: cellRect.top - tableRect.top,
width: cellRect.width,
height: height
}
};
}).filter(Boolean);

setCardPositions(newPositions);
};

// 마운트 및 데이터 변경시 위치 계산
React.useEffect(() => {
// selectable 모드에서는 카드 위치 계산을 하지 않음
if (selectable) return;

calculatePositions();

window.addEventListener('resize', calculatePositions);
return () => {
window.removeEventListener('resize', calculatePositions);
};
}, [data, selectable]);

// 각 셀의 고유 id: `${day}-${time}`
const cellList = [];
times.forEach(time => {
days.forEach(day => {
cellList.push({ id: `${day}-${time}`, day, time });
});
});

// 드래그 셀 선택 핸들러
const handleMouseDown = (id) => {
setDragging(true);
if (onSelect) {
if (selectedCells.includes(id)) {
setDragAdd(false);
onSelect(selectedCells.filter(cell => cell !== id));
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
onSelect(selectedCells.filter(cell => cell !== id));
}
}
};
const handleMouseUp = () => setDragging(false);

React.useEffect(() => {
if (!selectable) return;
window.addEventListener('mouseup', handleMouseUp);
return () => window.removeEventListener('mouseup', handleMouseUp);
}, [selectable]);

// 읽기 전용 모드(기존 필수과목 표시)
return (
<TableWrapper ref={wrapperRef}>
<Table ref={tableRef}>
<thead>
<tr>
<Th $isTime></Th>
{days.map(day => <Th key={day}>{day}</Th>)}
</tr>
</thead>
<tbody>
{times.map(time => (
<tr key={time}>
<Th $isTime>{time}</Th>
{days.map(day => {
// 기존 필수과목 표시 로직 (data 활용)
const cell = data.find(
d =>
d.day === day &&
Number(time) >= Number(d.start || d.time) &&
Number(time) <= Number(d.end || d.time)
);
return (
<Td
key={day + time}
selected={selectedCells.includes(day + time)}
onMouseDown={() => handleMouseDown(day + time)}
onMouseOver={() => handleMouseOver(day + time)}
style={{ cursor: 'pointer' }}
>
{cell ? (
<>
<div style={{ fontWeight: 600 }}>{cell.subject}</div>
<div style={{ fontSize: 12 }}>{cell.professor}</div>
</>
) : null}
</Td>
);
})}
</tr>
))}
</tbody>
</Table>

{/* 과목 카드 절대 위치로 추가 (실제 DOM 위치 기반) */}
{!selectable && cardPositions.map((item, index) => (
<SubjectCard
key={index}
style={{
left: `${item.position.x}px`,
top: `${item.position.y}px`,
width: `${item.position.width}px`,
height: `${item.position.height}px`,
background: getSubjectColor(item.subject)
}}
>
<SubjectName>{item.subject}</SubjectName>
<ProfessorName>{item.professor}</ProfessorName>
</SubjectCard>
))}
</TableWrapper>
);
}

export default Timetable;
