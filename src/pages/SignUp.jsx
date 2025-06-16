import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import {
  COLLEGES,
  DOUBLE_MAJOR_TYPES,
  MAJORS_BY_COLLEGE,
  FUSION_MODULES,
} from "../data/collegeData";

const Container = styled.div`
  width: 100%;
  max-width: 440px;
  min-width: 320px;
  margin: 0 auto;
  background: var(--white);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

const Title = styled.h1`
  margin-top: 16px;
  margin-bottom: 16px;
  font-size: var(--title-h1);
  font-weight: var(--font-weight-semibold);
`;

const Description = styled.div`
  color: var(--black);
  font-size: var(--body-default);
  margin-bottom: 32px;
  line-height: 1.5;
`;

const FormWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: var(--body-default);
  font-weight: var(--font-weight-semibold);
  margin-bottom: 12px;
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

const Button = styled.button`
  width: 100%;
  padding: 18px 0;
  background: var(--brand);
  color: var(--white);
  font-size: var(--body-button-default);
  font-weight: var(--font-weight-semibold);
  border: none;
  border-radius: 10px;
  margin-top: 32px;
  margin-bottom: 0;
  cursor: pointer;
`;

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    student_id: "",
    password: "",
    name: "",
    college: "",
    major: "",
    doubleMajorType: "",
    doubleMajorCollege: "", // 이중/부전공용 단과대학 (백엔드 전송 안함)
    double_major: "",
    modules: null,
    grade: "",
    semester: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: value,
      };

      // college가 변경될 때 major 초기화
      if (name === "college") {
        newData.major = "";
      } // doubleMajorType이 변경될 때 관련 필드 초기화
      if (name === "doubleMajorType") {
        if (!["DOUBLE_MAJOR", "MINOR", "INTENSIVE_MINOR"].includes(value)) {
          newData.doubleMajorCollege = "";
          newData.double_major = "";
          newData.modules = null;
        } else if (
          value !== "DOUBLE_MAJOR" &&
          prev.doubleMajorCollege === "융합전공"
        ) {
          // 이중전공이 아닌 다른 타입으로 변경 시 융합전공이 선택되어 있으면 초기화
          newData.doubleMajorCollege = "";
          newData.double_major = "";
        }
      }

      // doubleMajorCollege가 변경될 때 double_major 초기화
      if (name === "doubleMajorCollege") {
        newData.double_major = "";
        if (value !== "융합인재대학") {
          newData.modules = null;
        }
      }

      return newData;
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 필수 필드 검증 강화
    console.log("🔍 폼 데이터 전체 검증:");
    console.log("formData:", formData);

    if (!formData.name || formData.name.trim() === "") {
      alert("성함을 입력해주세요.");
      return;
    }

    if (!formData.student_id || formData.student_id.trim() === "") {
      alert("학번을 입력해주세요.");
      return;
    }

    if (!formData.password || formData.password.trim() === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    if (!formData.college || formData.college.trim() === "") {
      alert("단과대학을 선택해주세요.");
      return;
    }

    if (!formData.major || formData.major.trim() === "") {
      alert("전공을 선택해주세요.");
      return;
    }
    try {
      // API 호출을 위한 데이터 준비 - null 값 방지 및 기본값 설정
      const selectedModules =
        formData.modules && formData.modules.length > 0
          ? formData.modules.filter((m) => m && m.trim() !== "")
          : [];      const submitData = {
        student_id: formData.student_id.trim(), // 스키마에 맞게 snake_case 사용
        password: formData.password.trim(),
        name: formData.name.trim(),
        college: formData.college.trim(),
        major: formData.major.trim(),
        double_major_type:
          formData.doubleMajorType && formData.doubleMajorType.trim() !== ""
            ? formData.doubleMajorType.trim()
            : "NONE",
        double_major: ["DOUBLE_MAJOR", "MINOR", "INTENSIVE_MINOR"].includes(
          formData.doubleMajorType
        )
          ? formData.doubleMajor
            ? formData.doubleMajor.trim()
            : ""
          : "",
        modules: selectedModules.length > 0 ? selectedModules : [],
        // 개별 모듈 필드 추가 (백엔드 요구사항)
        module1: selectedModules[0] || "통번역모듈",
        module2: selectedModules[1] || "통번역모듈",
        module3: selectedModules[2] || "통번역모듈",
        grade: parseInt(formData.grade) || 1,
        semester: parseInt(formData.semester) || 1,
      };// 데이터 검증 로깅
      console.log("📤 회원가입 데이터 전송:", submitData);
      console.log("📋 각 필드 검증:");      console.log(
        "- student_id:",
        submitData.student_id,
        "타입:",
        typeof submitData.student_id,
        "길이:",
        submitData.student_id?.length
      );
      console.log(
        "- password:",
        submitData.password ? "***" : "NULL",
        "타입:",
        typeof submitData.password,
        "길이:",
        submitData.password?.length
      );
      console.log(
        "- name:",
        submitData.name,
        "타입:",
        typeof submitData.name,
        "길이:",
        submitData.name?.length
      );
      console.log(
        "- college:",
        submitData.college,
        "타입:",
        typeof submitData.college
      );
      console.log(
        "- major:",
        submitData.major,
        "타입:",
        typeof submitData.major
      );      console.log(
        "- double_major_type:",
        submitData.double_major_type,
        "타입:",
        typeof submitData.double_major_type
      );
      console.log(
        "- double_major:",
        submitData.double_major,
        "타입:",
        typeof submitData.double_major
      );
      console.log(
        "- modules:",
        submitData.modules,
        "타입:",
        typeof submitData.modules
      );
      console.log(
        "- module1:",
        submitData.module1,
        "타입:",
        typeof submitData.module1
      );
      console.log(
        "- module2:",
        submitData.module2,
        "타입:",
        typeof submitData.module2
      );
      console.log(
        "- module3:",
        submitData.module3,
        "타입:",
        typeof submitData.module3
      );
      console.log(
        "- grade:",
        submitData.grade,
        "타입:",
        typeof submitData.grade
      );
      console.log(
        "- semester:",
        submitData.semester,
        "타입:",
        typeof submitData.semester
      ); // null 값 체크
      const nullFields = Object.entries(submitData)
        .filter(
          ([key, value]) =>
            value === null &&
            ![
              "doubleMajorType",
              "doubleMajor",
              "modules",
              "module1",
              "module2",
              "module3",
            ].includes(key)
        )
        .map(([key]) => key);

      if (nullFields.length > 0) {
        console.error("❌ NULL 값이 포함된 필수 필드:", nullFields);
        alert(`다음 필드를 확인해주세요: ${nullFields.join(", ")}`);
        return;
      }

      // 회원가입 API 호출
      const response = await axiosInstance.post("/auth/signup", submitData);
      if (response.status === 200 || response.status === 201) {
        console.log("✅ 회원가입 성공:", response.data); // 회원가입 성공 시 사용자 정보를 localStorage에 저장        // 응답에서 받은 id를 userId로 사용
        const userData = {
          userId: response.data.id, // API 호출용 ID
          name: response.data.name || submitData.name,
          student_id: response.data.studentId || formData.student_id, // 학번 (표시용)
          college: response.data.college || submitData.college,
          major: response.data.major || submitData.major,
          doubleMajorType:
            response.data.doubleMajorType || submitData.doubleMajorType,
          double_major: response.data.doubleMajor || formData.double_major,
          modules: response.data.modules || submitData.modules,
          grade: response.data.grade || submitData.grade,
          semester: response.data.semester || submitData.semester,
        };

        console.log("🔍 SignUp.jsx - API 응답 데이터:", response.data);
        console.log("🔍 SignUp.jsx - 전송한 submitData:", submitData);
        console.log("🔍 SignUp.jsx - 최종 저장할 userData:", userData);

        localStorage.setItem("userData", JSON.stringify(userData));
        console.log(
          "💾 SignUp.jsx - localStorage에 사용자 정보 저장:",
          userData
        );

        navigate("/signup-complete");
      }
    } catch (error) {
      console.error("❌ 회원가입 실패:", error);
      console.error("Error response:", error.response);
      console.error("Error data:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response) {
        // 서버에서 응답을 받은 경우 (4xx, 5xx 상태코드)
        const errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          JSON.stringify(error.response.data) ||
          "회원가입에 실패했습니다.";
        alert(`회원가입 실패 (${error.response.status}): ${errorMessage}`);
      } else if (error.request) {
        // 요청은 전송되었지만 응답을 받지 못한 경우
        alert("서버와의 연결에 문제가 있습니다. 잠시 후 다시 시도해주세요.");
      } else {
        // 요청 설정 중에 오류가 발생한 경우
        alert("요청 처리 중 오류가 발생했습니다.");
      }
    }
  };
  return (
    <Container>
      <FormWrapper>
        <Title>회원가입</Title>
        <Description>
          Scheduly의 서비스를 이용하기 위해
          <br />
          회원가입을 진행해 주세요
        </Description>{" "}
        <Form onSubmit={handleSubmit}>
          <Field>
            <Label htmlFor="student_id">ID(학번)</Label>
            <Input
              id="student_id"
              name="student_id"
              value={formData.student_id}
              onChange={handleInputChange}
              placeholder="학번을 입력해 주세요"
              required
            />
          </Field>
          <Field>
            <Label htmlFor="password">PW</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="영문/대소문자/특수문자 중 3가지 이상 조합, 8~16자"
              required
            />
          </Field>
          <Field>
            <Label htmlFor="name">성함</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="이름을 입력해 주세요"
              required
            />
          </Field>{" "}
          <Field>
            <Label htmlFor="college">단과대학</Label>
            <CustomSelectWrapper>
              <Select
                id="college"
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
          </Field>{" "}
          <Field>
            <Label htmlFor="major">전공</Label>
            <CustomSelectWrapper>
              <Select
                id="major"
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
          </Field>{" "}
          <Field>
            <Label htmlFor="doubleMajorType">이중 / 부전공 타입</Label>
            <CustomSelectWrapper>
              <Select
                id="doubleMajorType"
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
          </Field>{" "}
          {(formData.doubleMajorType === "DOUBLE_MAJOR" ||
            formData.doubleMajorType === "MINOR" ||
            formData.doubleMajorType === "INTENSIVE_MINOR") && (
            <>
              {" "}
              <Field>
                <Label htmlFor="doubleMajorCollege">이중/부전공 단과대학</Label>
                <CustomSelectWrapper>
                  <Select
                    id="doubleMajorCollege"
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
                    {/* 이중전공 타입일 때만 융합전공 옵션 추가 */}
                    {formData.doubleMajorType === "DOUBLE_MAJOR" && (
                      <option value="융합전공">융합전공</option>
                    )}
                  </Select>
                  <SelectArrow />
                </CustomSelectWrapper>
              </Field>
              <Field>
                <Label htmlFor="double_major">이중/부전공</Label>
                <CustomSelectWrapper>
                  <Select
                    id="double_major"
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
              </Field>
            </>
          )}{" "}
          {formData.double_major === "융합인재학부" && (
            <Field>
              <Label htmlFor="modules">모듈 선택 (최대 3개)</Label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {FUSION_MODULES.map((module) => (
                  <div
                    key={module}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <input
                      type="checkbox"
                      id={`module-${module}`}
                      checked={formData.modules?.includes(module) || false}
                      onChange={(e) => {
                        setFormData((prev) => {
                          const currentModules = prev.modules || [];
                          if (e.target.checked) {
                            // 최대 3개까지만 선택 가능
                            if (currentModules.length < 3) {
                              return {
                                ...prev,
                                modules: [...currentModules, module],
                              };
                            } else {
                              alert(
                                "모듈은 최대 3개까지만 선택할 수 있습니다."
                              );
                              return prev;
                            }
                          } else {
                            // 체크 해제
                            const newModules = currentModules.filter(
                              (m) => m !== module
                            );
                            return {
                              ...prev,
                              modules:
                                newModules.length > 0 ? newModules : null,
                            };
                          }
                        });
                      }}
                      style={{
                        width: "16px",
                        height: "16px",
                        accentColor: "var(--brand)",
                      }}
                    />
                    <label
                      htmlFor={`module-${module}`}
                      style={{
                        fontSize: "var(--body-default)",
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                    >
                      {module}
                    </label>
                  </div>
                ))}
                {formData.modules && formData.modules.length > 0 && (
                  <div
                    style={{
                      fontSize: "var(--body-small)",
                      color: "var(--brand)",
                      marginTop: "4px",
                    }}
                  >
                    선택된 모듈: {formData.modules.join(", ")} (
                    {formData.modules.length}/3)
                  </div>
                )}
              </div>
            </Field>
          )}{" "}
          <Row>
            <Field style={{ flex: 1 }}>
              <Label htmlFor="grade">학년</Label>
              <CustomSelectWrapper>
                <Select
                  id="grade"
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
            </Field>
            <Field style={{ flex: 1 }}>
              <Label htmlFor="semester">학기</Label>
              <CustomSelectWrapper>
                <Select
                  id="semester"
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
            </Field>
          </Row>
          <Button type="submit">Sign Up</Button>
        </Form>
      </FormWrapper>
    </Container>
  );
}
