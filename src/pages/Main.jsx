import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BsExclamationCircle } from "react-icons/bs";
import { useState, useEffect } from "react";
import { getToken, getUserInfo } from "../axiosInstance";
import Timetable from "../Components/TimeTable";

const MainContainer = styled.div`
  width: 100%;
`;

const Card = styled.div`
  background: var(--white);
  border: 2px solid var(--brand);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 16px;
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0 4px 20px rgba(48, 95, 248, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(48, 95, 248, 0.2);
    border-color: #4f6ef7;
  }
`;

const CenterCard = styled(Card)`
  display: flex;
  height: 350px;
  min-height: 350px;
  padding: 32px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  align-self: stretch;
  border-radius: 16px;
  border: 2px solid var(--brand);
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(48, 95, 248, 0.05) 0%,
      rgba(103, 126, 234, 0.05) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover {
    background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
  }
`;

const Title = styled.div`
  font-size: var(--display-small);
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.4;
  background: linear-gradient(135deg, var(--black) 0%, #374151 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Highlight = styled.span`
  color: var(--brand);
  background: linear-gradient(135deg, var(--brand) 0%, #667eea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
`;

const InfoList = styled.div`
  margin-top: 2px;
`;

const Info = styled.div`
  font-size: var(--body-default);
  color: var(--black);
  margin-bottom: 8px;
  font-weight: 400;
  line-height: 1.6;
  padding: 4px 0;
  transition: color 0.2s ease;

  &:hover {
    color: var(--brand);
  }
`;

const ExclamationCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2.5px solid var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
`;

const ExclamationMark = styled.div`
  font-size: 32px;
  color: #111;
  font-weight: 700;
  line-height: 1;
`;

const GuideText = styled.div`
  color: var(--black);
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.45px;
  position: relative;
  z-index: 1;
`;

const Button = styled.button`
  margin-top: 0;
  padding: 12px 24px;
  width: 180px;
  background: var(--white);
  border: 2px solid var(--brand);
  border-radius: 12px;
  color: var(--brand);
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(48, 95, 248, 0.1);

  &:hover {
    background: var(--brand);
    color: var(--white);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(48, 95, 248, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default function Main() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: "게스트",
    major: "로그인이 필요합니다",
    subMajor: "",
    studentId: "",
    credits: "",
  });

  useEffect(() => {
    const loadUserData = async () => {
      const token = getToken();
      if (token) {
        setIsLoggedIn(true);
        try {
          // localStorage에서 userId 가져오기
          const savedUserData = localStorage.getItem("userData");
          let userId = null;

          console.log("🔍 Main.jsx - savedUserData:", savedUserData);
          if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            userId =
              userData.userId || userData.student_id || userData.studentId;
            console.log("🔍 Main.jsx - parsed userData:", userData);
            console.log("🔍 Main.jsx - extracted userId:", userId);
          }

          // 크레딧 정보 가져오기
          const savedCredits = localStorage.getItem("userCredits");
          const credits = savedCredits
            ? JSON.parse(savedCredits)
            : { completed: "109", total: "134" };
          if (userId) {
            console.log("🚀 Main.jsx - API 호출 시작, userId:", userId);
            // API로 최신 사용자 정보 가져오기
            const apiUserData = await getUserInfo(userId);
            console.log("✅ Main.jsx - API 응답 데이터:", apiUserData);

            // API 응답을 기존 형식에 맞게 변환
            const formattedUser = {
              name: apiUserData.name || "사용자",
              major: apiUserData.major || "전공 미설정",
              subMajor: apiUserData.doubleMajor || "",
              studentId: apiUserData.studentId,
              credits: `${credits.completed}/${credits.total}`,
            };
            console.log("🔄 Main.jsx - 변환된 사용자 데이터:", formattedUser);

            setUser(formattedUser); // localStorage에도 업데이트된 정보 저장
            const updatedUserData = {
              userId: userId, // API 호출에 사용한 userId 저장
              name: apiUserData.name,
              student_id: apiUserData.studentId,
              college: apiUserData.college,
              major: apiUserData.major,
              doubleMajorType: apiUserData.doubleMajorType,
              double_major: apiUserData.doubleMajor,
              modules: [
                apiUserData.module1,
                apiUserData.module2,
                apiUserData.module3,
              ].filter(Boolean),
              grade: apiUserData.grade,
              semester: apiUserData.semester,
            };
            localStorage.setItem("userData", JSON.stringify(updatedUserData));
            console.log(
              "💾 Main.jsx - localStorage에 저장된 데이터:",
              updatedUserData
            );
          } else {
            console.log(
              "⚠️ Main.jsx - userId가 없어서 localStorage 데이터 사용"
            );
            // userId가 없으면 localStorage 데이터 사용
            if (savedUserData) {
              const userData = JSON.parse(savedUserData);
              setUser({
                name: userData.name || "사용자",
                major: userData.major || "전공 미설정",
                subMajor: userData.double_major || "",
                studentId: userData.student_id || userData.studentId || "",
                credits: `${credits.completed}/${credits.total}`,
              });
            } else {
              // 기본값 설정
              setUser({
                name: "신상현",
                major: "Global Business & Technology 학부",
                subMajor: "AI융합전공",
                studentId: "202001896",
                credits: `${credits.completed}/${credits.total}`,
              });
            }
          }
        } catch (error) {
          console.error("❌ Main.jsx - 사용자 정보 로드 오류:", error);
          console.error(
            "❌ Main.jsx - 오류 상세:",
            error.response?.data || error.message
          );
          // API 오류 시 localStorage 데이터로 폴백
          const savedUserData = localStorage.getItem("userData");
          const savedCredits = localStorage.getItem("userCredits");
          const credits = savedCredits
            ? JSON.parse(savedCredits)
            : { completed: "109", total: "134" };

          if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            setUser({
              name: userData.name || "사용자",
              major: userData.major || "전공 미설정",
              subMajor: userData.double_major || "",
              studentId: userData.student_id || userData.studentId || "",
              credits: `${credits.completed}/${credits.total}`,
            });
          }
        }
      }
      setLoading(false);
    };

    loadUserData();
  }, []);

  // localStorage에서 시간표 불러오기
  const savedTimetable = JSON.parse(
    localStorage.getItem("finalTimetable") || "null"
  );
  return (
    <MainContainer>
      {loading ? (
        <Card>
          <Title>사용자 정보를 불러오는 중...</Title>
        </Card>
      ) : isLoggedIn ? (
        <Card onClick={() => navigate("/mypage")}>
          <Title>
            반갑습니다 <Highlight>{user.name}</Highlight> 회원님
          </Title>{" "}
          <InfoList>
            <Info>본전공 : {user.major}</Info>
            {user.subMajor && <Info>이중/부전공 : {user.subMajor}</Info>}
            <Info>학번 : {user.studentId}</Info>
            <Info>취득 학점 : {user.credits}</Info>
          </InfoList>
        </Card>
      ) : (
        <Card>
          <Title>환영합니다!</Title>
          <InfoList>
            <Info>로그인하여 개인화된 시간표 서비스를 이용해보세요</Info>
          </InfoList>
          <Button
            style={{ marginTop: 16, width: "fit-content" }}
            onClick={() => navigate("/login")}
          >
            로그인하기
          </Button>
        </Card>
      )}
      {savedTimetable ? (
        <Card>
          <Title>나의 시간표</Title>
          <Timetable data={savedTimetable} />{" "}
          <Button
            style={{
              marginTop: 16,
              background: "var(--white)",
              color: "var(--brand)",
              border: "2px solid var(--brand)",
            }}
            onClick={() => {
              localStorage.removeItem("finalTimetable");
              window.location.reload();
            }}
          >
            시간표 삭제
          </Button>
        </Card>
      ) : (
        <CenterCard>
          <BsExclamationCircle style={{ width: 64, height: 64 }} />
          <GuideText>
            아직 생성된 시간표가 없어요!
            <br />
            시간표를 생성하러 가 볼까요?
          </GuideText>
          <Button onClick={() => navigate("/create")}>
            시간표 생성하기{" "}
            <span style={{ fontSize: "18px", fontWeight: 700 }}>&rarr;</span>
          </Button>
        </CenterCard>
      )}
    </MainContainer>
  );
}
