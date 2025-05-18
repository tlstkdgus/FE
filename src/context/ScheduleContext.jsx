import React, { createContext, useContext, useState } from "react";

const ScheduleContext = createContext();

export function ScheduleProvider({ children }) {
  // 과목 조합 (ex: "major_minor", "all" 등)
  const [combination, setCombination] = useState("");
  // 선택한 요일/시간대 (ex: ["월-1", "화-2"])
  const [selectedDays, setSelectedDays] = useState([]);
  // 전체 학점 범위
  const [credit, setCredit] = useState({ min: "", max: "" });
  // 상세 학점 (ex: { major: "", minor: "", liberal: "" })
  const [detailedCredit, setDetailedCredit] = useState({ major: "", minor: "", liberal: "" });

  return (
    <ScheduleContext.Provider value={{
      combination, setCombination,
      selectedDays, setSelectedDays,
      credit, setCredit,
      detailedCredit, setDetailedCredit
    }}>
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  return useContext(ScheduleContext);
} 