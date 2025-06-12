import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  MAJORS_BY_COLLEGE,
  COLLEGES,
  DOUBLE_MAJOR_TYPES,
  FUSION_MODULES,
} from "../data/collegeData";
import axiosInstance from "../axiosInstance";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 16px 20px; /* 헤더 영역 확보 */
`;

const FormCard = styled.div`
  background: var(--white);
  border-radius: 20px;
  padding: 32px 24px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`;

const Title = styled.h1`
  font-size: var(--title-h1);
  font-weight: var(--font-weight-bold);
  color: var(--black);
  margin-bottom: 8px;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: var(--body-default);
  color: var(--subtext);
  text-align: center;
  margin-bottom: 32px;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: var(--body-default);
  font-weight: var(--font-weight-semibold);
  color: var(--black);
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 12px;
  border: 1px solid var(--subtext);
  border-radius: 8px;
  background: var(--white);
  font-size: var(--body-default);
  transition: background 0.2s;
  &::placeholder {
    color: var(--subtext);
    font-size: var(--body-small);
    opacity: 1;
  }
  &:focus {
    background: var(--section);
    outline: none;
  }
`;

const CustomSelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Select = styled.select`
  width: 100%;
  padding: 16px 36px 16px 12px;
  border: 1px solid var(--subtext);
  border-radius: 8px;
  background: var(--white);
  font-size: var(--body-default);
  color: var(--black);
  transition: background 0.2s;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  &:focus {
    background: var(--section);
    outline: none;
  }
  &::placeholder {
    color: var(--subtext);
    font-size: var(--body-small);
    opacity: 1;
  }
  &:disabled {
    background: var(--section);
    color: var(--subtext);
    cursor: not-allowed;
  }
`;

const SelectArrow = styled.span`
  pointer-events: none;
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  &::after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid var(--subtext);
  }
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
`;

const SaveButton = styled.button`
  flex: 1;
  padding: 16px;
  background: var(--brand);
  color: var(--white);
  border: none;
  border-radius: 12px;
  font-size: var(--body-button-default);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #4f6ef7;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(48, 95, 248, 0.3);
  }

  &:disabled {
    background: var(--subtext);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 16px;
  background: var(--white);
  color: var(--subtext);
  border: 2px solid var(--section);
  border-radius: 12px;
  font-size: var(--body-button-default);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--subtext);
    color: var(--black);
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: var(--body-small);
  margin-top: 8px;
`;

const SuccessMessage = styled.div`
  color: #10b981;
  font-size: var(--body-small);
  margin-top: 8px;
`;

export default function EditProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    student_id: "",
    email: "",
    college: "",
    major: "",
    doubleMajorType: "",
    doubleMajorCollege: "", // 이중/부전공용 단과대학 (백엔드 전송 안함)
    double_major: "",
    modules: null,
    grade: "",
    semester: "",
  });

  const [availableMajors, setAvailableMajors] = useState([]);
  const [availableDoubleMajors, setAvailableDoubleMajors] = useState([]);

  // 초기 데이터 로드
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const savedUserData = localStorage.getItem("userData");

        if (savedUserData) {
          const userData = JSON.parse(savedUserData);
          setFormData({
            name: userData.name || "",
            student_id: userData.student_id || "",
            email: userData.email || "",
            college: userData.college || "",
            major: userData.major || "",
            doubleMajorType: userData.doubleMajorType || "",
            doubleMajorCollege: userData.doubleMajorCollege || "",
            double_major: userData.double_major || "",
            modules: userData.modules || null,
            grade: userData.grade || "",
            semester: userData.semester || "",
          });
        } else {
          setFormData({
            name: "신상현",
            student_id: "202001896",
            email: "user@example.com",
            college: "경상대학",
            major: "Global_Business_Technology학부",
            doubleMajorType: "NONE",
            doubleMajorCollege: "",
            double_major: "",
            modules: null,
            grade: "4",
            semester: "1",
          });
        }
      } catch (error) {
        console.error("사용자 데이터 로드 오류:", error);
        setFormData({
          name: "",
          student_id: "",
          email: "",
          college: "",
          major: "",
          doubleMajorType: "NONE",
          doubleMajorCollege: "",
          double_major: "",
          modules: null,
          grade: "",
          semester: "",
        });
      }
    };

    loadUserData();
  }, []);

  // 단과대학 변경 시 전공 목록 업데이트
  useEffect(() => {
    if (formData.college) {
      const majors = MAJORS_BY_COLLEGE[formData.college] || [];
      setAvailableMajors(majors);

      if (!majors.includes(formData.major)) {
        setFormData((prev) => ({ ...prev, major: "" }));
      }
    }
  }, [formData.college]);

  // 이중전공용 단과대학 변경 시 전공 목록 업데이트
  useEffect(() => {
    if (formData.doubleMajorCollege) {
      const majors = MAJORS_BY_COLLEGE[formData.doubleMajorCollege] || [];
      setAvailableDoubleMajors(majors);

      if (!majors.includes(formData.double_major)) {
        setFormData((prev) => ({ ...prev, double_major: "" }));
      }
    }
  }, [formData.doubleMajorCollege]);

  // 이중전공 타입 변경 시 관련 필드 초기화
  useEffect(() => {
    if (formData.doubleMajorType) {
      if (
        !["DOUBLE_MAJOR", "MINOR", "INTENSIVE_MINOR"].includes(
          formData.doubleMajorType
        )
      ) {
        setFormData((prev) => ({
          ...prev,
          doubleMajorCollege: "",
          double_major: "",
          modules: null,
        }));
      }
    }

    if (formData.double_major !== "융합인재대학") {
      setFormData((prev) => ({
        ...prev,
        modules: null,
      }));
    }
  }, [formData.doubleMajorType, formData.double_major]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: value,
      };

      // doubleMajorCollege가 변경될 때 double_major 초기화
      if (name === "doubleMajorCollege") {
        newData.double_major = "";
        if (value !== "융합인재대학") {
          newData.modules = null;
        }
      }

      return newData;
    });

    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (
        !formData.name ||
        !formData.student_id ||
        !formData.email ||
        !formData.college ||
        !formData.major ||
        !formData.grade ||
        !formData.semester
      ) {
        throw new Error("필수 항목을 모두 입력해주세요.");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("올바른 이메일 형식을 입력해주세요.");
      }

      // 백엔드로 보낼 데이터 (doubleMajorCollege는 제외)
      const updateData = {
        name: formData.name,
        student_id: formData.student_id,
        email: formData.email,
        college: formData.college,
        major: formData.major,
        double_major_type:
          formData.doubleMajorType === "NONE" ? null : formData.doubleMajorType,
        double_major: formData.double_major || null,
        modules: formData.modules,
        grade: parseInt(formData.grade) || 1,
        semester: parseInt(formData.semester) || 1,
      };

      console.log("프로필 업데이트:", updateData);

      // localStorage에는 doubleMajorCollege도 포함해서 저장 (UI 상태 유지용)
      const localStorageData = { ...formData };
      localStorage.setItem("userData", JSON.stringify(localStorageData));

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess("프로필이 성공적으로 업데이트되었습니다!");

      setTimeout(() => {
        navigate("/mypage");
      }, 2000);
    } catch (err) {
      console.error("프로필 업데이트 오류:", err);
      setError(err.message || "프로필 업데이트에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormCard>
        <Title>개인정보 수정</Title>
        <Subtitle>프로필 정보를 수정할 수 있습니다</Subtitle>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>이름 *</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="이름을 입력해 주세요"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>학번 *</Label>
            <Input
              type="text"
              name="student_id"
              value={formData.student_id}
              onChange={handleInputChange}
              placeholder="학번을 입력해 주세요"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>이메일 *</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="이메일을 입력해 주세요"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>단과대학 *</Label>
            <CustomSelectWrapper>
              <Select
                name="college"
                value={formData.college}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  단과대학을 선택하세요
                </option>
                {COLLEGES.map((college) => (
                  <option key={college} value={college}>
                    {college}
                  </option>
                ))}
              </Select>
              <SelectArrow />
            </CustomSelectWrapper>
          </FormGroup>

          <FormGroup>
            <Label>전공 *</Label>
            <CustomSelectWrapper>
              <Select
                name="major"
                value={formData.major}
                onChange={handleInputChange}
                required
                disabled={!formData.college}
              >
                <option value="" disabled>
                  {formData.college
                    ? "전공을 선택하세요"
                    : "단과대학을 먼저 선택하세요"}
                </option>
                {formData.college &&
                  MAJORS_BY_COLLEGE[formData.college]?.map((major) => (
                    <option key={major} value={major}>
                      {major}
                    </option>
                  ))}
              </Select>
              <SelectArrow />
            </CustomSelectWrapper>
          </FormGroup>

          <FormGroup>
            <Label>이중/부전공 타입 *</Label>
            <CustomSelectWrapper>
              <Select
                name="doubleMajorType"
                value={formData.doubleMajorType}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  타입을 선택하세요
                </option>
                {DOUBLE_MAJOR_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Select>
              <SelectArrow />
            </CustomSelectWrapper>
          </FormGroup>

          {(formData.doubleMajorType === "DOUBLE_MAJOR" ||
            formData.doubleMajorType === "MINOR" ||
            formData.doubleMajorType === "INTENSIVE_MINOR") && (
            <>
              <FormGroup>
                <Label>이중/부전공 단과대학 *</Label>
                <CustomSelectWrapper>
                  <Select
                    name="doubleMajorCollege"
                    value={formData.doubleMajorCollege}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>
                      단과대학을 선택하세요
                    </option>
                    {COLLEGES.map((college) => (
                      <option key={college} value={college}>
                        {college}
                      </option>
                    ))}
                  </Select>
                  <SelectArrow />
                </CustomSelectWrapper>
              </FormGroup>

              <FormGroup>
                <Label>이중/부전공 *</Label>
                <CustomSelectWrapper>
                  <Select
                    name="double_major"
                    value={formData.double_major}
                    onChange={handleInputChange}
                    required
                    disabled={!formData.doubleMajorCollege}
                  >
                    <option value="" disabled>
                      {formData.doubleMajorCollege
                        ? "이중/부전공을 선택하세요"
                        : "단과대학을 먼저 선택하세요"}
                    </option>
                    {formData.doubleMajorCollege &&
                      MAJORS_BY_COLLEGE[formData.doubleMajorCollege]?.map(
                        (major) => (
                          <option key={major} value={major}>
                            {major}
                          </option>
                        )
                      )}
                  </Select>
                  <SelectArrow />
                </CustomSelectWrapper>
              </FormGroup>
            </>
          )}

          {formData.double_major === "융합인재학부" && (
            <FormGroup>
              <Label>모듈 선택 *</Label>
              <CustomSelectWrapper>
                <Select
                  name="modules"
                  value={formData.modules?.[0] || ""}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      modules: e.target.value ? [e.target.value] : null,
                    }));
                  }}
                  required
                >
                  <option value="" disabled>
                    모듈을 선택하세요
                  </option>
                  {FUSION_MODULES.map((module) => (
                    <option key={module} value={module}>
                      {module}
                    </option>
                  ))}
                </Select>
                <SelectArrow />
              </CustomSelectWrapper>
            </FormGroup>
          )}

          <Row>
            <FormGroup style={{ flex: 1 }}>
              <Label>학년 *</Label>
              <CustomSelectWrapper>
                <Select
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    학년
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </Select>
                <SelectArrow />
              </CustomSelectWrapper>
            </FormGroup>

            <FormGroup style={{ flex: 1 }}>
              <Label>학기 *</Label>
              <CustomSelectWrapper>
                <Select
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    학기
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </Select>
                <SelectArrow />
              </CustomSelectWrapper>
            </FormGroup>
          </Row>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <ButtonGroup>
            <CancelButton
              type="button"
              onClick={() => navigate("/mypage")}
              disabled={loading}
            >
              취소
            </CancelButton>
            <SaveButton type="submit" disabled={loading}>
              {loading ? "저장 중..." : "저장하기"}
            </SaveButton>
          </ButtonGroup>
        </form>
      </FormCard>
    </Container>
  );
}
