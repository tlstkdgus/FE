import axios from "axios";

// 토큰 관리 함수들
const getToken = () => {
  return localStorage.getItem("accessToken");
};

const setToken = (token) => {
  localStorage.setItem("accessToken", token);
};

const removeToken = () => {
  localStorage.removeItem("accessToken");
};

// 환경 변수 디버깅
console.log("환경 변수 BASE_URL:", process.env.REACT_APP_BASE_URL);

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // 쿠키를 포함한 요청 설정
});

// 요청 인터셉터 (Authorization 헤더 자동 추가)
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = getToken(); // 토큰 서비스에서 토큰 가져오기 (자동으로 만료 확인)    // 토큰이 필요한 API 요청인지 확인 (로그인, 회원가입은 토큰이 필요없음)
    const isAuthRoute =
      config.url &&
      (config.url.includes("/auth/login") ||
        config.url.includes("/auth/signup"));
    if (accessToken && !isAuthRoute) {
      // 디버깅용 로그 (토큰 전체가 아닌 일부만 표시)
      const tokenPreview =
        accessToken.substring(0, 10) +
        "..." +
        accessToken.substring(accessToken.length - 5);
      console.log(`🔹 인증 토큰이 요청에 포함됩니다. (${tokenPreview})`);
      console.log(`🔹 요청 URL: ${config.baseURL}${config.url}`);
      console.log(`🔹 요청 메서드: ${config.method?.toUpperCase()}`);
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    } else if (!isAuthRoute && !accessToken) {
      // 인증이 필요한 API인데 토큰이 없는 경우만 경고
      console.warn(
        "⚠️ 토큰이 없습니다. 로그인이 필요한 기능에 접근할 수 없습니다."
      );
      console.warn(`⚠️ 요청 URL: ${config.baseURL}${config.url}`);
    }

    return config;
  },
  (error) => {
    console.error("🔹 요청 인터셉터 오류:", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (응답 로깅)
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`✅ API 응답 성공:`, {
      url: response.config.url,
      method: response.config.method?.toUpperCase(),
      status: response.status,
      statusText: response.statusText,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error(`❌ API 응답 오류:`, {
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

// API 함수들
export const getUserInfo = async (userId = null) => {
  try {
    console.log("🌐 axiosInstance - getUserInfo 호출, userId:", userId);

    // userId가 없으면 토큰을 통해 현재 사용자 정보 가져오기 시도
    const url = userId ? `/users/${userId}/mypage` : `/users/me`;
    console.log("🌐 axiosInstance - 요청 URL:", url);

    const response = await axiosInstance.get(url);
    console.log("🌐 axiosInstance - getUserInfo 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("🌐 axiosInstance - getUserInfo 오류:", error);
    console.error("🌐 axiosInstance - 오류 상세:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
    });
    throw error;
  }
};

export const updateUserProfile = async (userId, profileData) => {
  try {
    console.log("🌐 axiosInstance - updateUserProfile 호출, userId:", userId);
    console.log("🌐 axiosInstance - 전송할 데이터:", profileData);
    const url = `/users/${userId}/mypage`;
    console.log("🌐 axiosInstance - 요청 URL:", url);

    const response = await axiosInstance.put(url, profileData);
    console.log("🌐 axiosInstance - updateUserProfile 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("🌐 axiosInstance - updateUserProfile 오류:", error);
    console.error("🌐 axiosInstance - 오류 상세:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
    });
    throw error;
  }
};

export const saveTimePreferences = async (studentId, timePreferences) => {
  try {
    console.log(
      "🌐 axiosInstance - saveTimePreferences 호출, studentId:",
      studentId
    );
    console.log("🌐 axiosInstance - 전송할 시간 선호도:", timePreferences);
    const url = `/users/${studentId}/timetable/preferences/time`;
    console.log("🌐 axiosInstance - 요청 URL:", url);

    const response = await axiosInstance.put(url, timePreferences);
    console.log("🌐 axiosInstance - saveTimePreferences 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("🌐 axiosInstance - saveTimePreferences 오류:", error);
    console.error("🌐 axiosInstance - 오류 상세:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
    });
    throw error;
  }
};

export const saveCreditPreferences = async (studentId, creditPreferences) => {
  try {
    console.log(
      "🌐 axiosInstance - saveCreditPreferences 호출, studentId:",
      studentId
    );
    console.log("🌐 axiosInstance - 전송할 학점 선호도:", creditPreferences);
    const url = `/users/${studentId}/timetable/preferences/credits`;
    console.log("🌐 axiosInstance - 요청 URL:", url);

    const response = await axiosInstance.put(url, creditPreferences);
    console.log(
      "🌐 axiosInstance - saveCreditPreferences 응답:",
      response.data
    );
    return response.data;
  } catch (error) {
    console.error("🌐 axiosInstance - saveCreditPreferences 오류:", error);
    console.error("🌐 axiosInstance - 오류 상세:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
    });
    throw error;
  }
};

export const saveEssentialCourses = async (studentId, essentialCourses) => {
  try {
    console.log(
      "🌐 axiosInstance - saveEssentialCourses 호출, studentId:",
      studentId
    );
    console.log("🌐 axiosInstance - 전송할 필수과목:", essentialCourses);

    // 입력값 검증
    if (!essentialCourses || !Array.isArray(essentialCourses)) {
      throw new Error("필수과목 데이터가 올바르지 않습니다.");
    }

    // 과목 코드들만 추출
    const courseCodes = essentialCourses
      .map((course) =>
        typeof course === "string" ? course : course.courseCode
      )
      .filter(Boolean);

    console.log("📤 전송할 과목 코드들:", courseCodes);

    const url = `/preferences/required?userId=${studentId}`;
    console.log("🌐 axiosInstance - 요청 URL:", url);

    // 과목 코드들을 직접 서버에 전송
    const dataToSend = {
      essentialCourses: courseCodes,
    };

    const response = await axiosInstance.put(url, dataToSend);
    console.log("🌐 axiosInstance - saveEssentialCourses 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("🌐 axiosInstance - saveEssentialCourses 오류:", error);
    console.error("🌐 axiosInstance - 오류 상세:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
    });
    throw error;
  }
};

export const saveExcludedCourses = async (studentId, excludedCourses) => {
  try {
    console.log(
      "🌐 axiosInstance - saveExcludedCourses 호출, studentId:",
      studentId
    );
    console.log("🌐 axiosInstance - 전송할 제외과목:", excludedCourses);

    // 입력값 검증
    if (!excludedCourses || !Array.isArray(excludedCourses)) {
      throw new Error("제외과목 데이터가 올바르지 않습니다.");
    }

    // 과목 코드들만 추출
    const courseCodes = excludedCourses
      .map((course) =>
        typeof course === "string" ? course : course.courseCode
      )
      .filter(Boolean);

    console.log("🌐 전송할 과목 코드들:", courseCodes);

    const url = `/preferences/completed?userId=${studentId}`;
    console.log("🌐 axiosInstance - 요청 URL:", url);

    // 과목 코드들을 직접 서버에 전송
    const dataToSend = {
      excludedCourses: courseCodes,
    };

    const response = await axiosInstance.put(url, dataToSend);
    console.log("🌐 axiosInstance - saveExcludedCourses 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("🌐 axiosInstance - saveExcludedCourses 오류:", error);
    console.error("🌐 axiosInstance - 오류 상세:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
    });
    throw error;
  }
};

export const postCompletedReferences = async (
  studentId,
  completedReferences
) => {
  try {
    console.log(
      "🌐 axiosInstance - postCompletedReferences 호출, studentId:",
      studentId
    );
    console.log("🌐 axiosInstance - 전송할 완료 과목:", completedReferences);

    // 입력값 검증
    if (!completedReferences || !Array.isArray(completedReferences)) {
      throw new Error("완료 과목 데이터가 올바르지 않습니다.");
    }

    // 과목 코드들만 추출
    const courseCodes = completedReferences
      .map((course) =>
        typeof course === "string" ? course : course.courseCode
      )
      .filter(Boolean);

    console.log("📤 전송할 과목 코드들:", courseCodes);

    const url = `/preferences/completed?userId=${studentId}`;
    console.log("🌐 axiosInstance - 요청 URL:", url);

    // 과목 코드들을 직접 서버에 전송
    const dataToSend = {
      completedCourses: courseCodes,
    };

    const response = await axiosInstance.post(url, dataToSend);
    console.log(
      "🌐 axiosInstance - postCompletedReferences 응답:",
      response.data
    );
    return response.data;
  } catch (error) {
    console.error("🌐 axiosInstance - postCompletedReferences 오류:", error);
    console.error("🌐 axiosInstance - 오류 상세:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
    });
    throw error;
  }
};

export const deleteCompletedReference = async (studentId, referenceId) => {
  try {
    console.log("🌐 axiosInstance - deleteCompletedReference 호출:", {
      studentId,
      referenceId,
    });

    const url = `/preferences/completed?userId=${studentId}`;
    console.log("🌐 axiosInstance - 요청 URL:", url);

    const response = await axiosInstance.delete(url);
    console.log(
      "🌐 axiosInstance - deleteCompletedReference 응답:",
      response.data
    );
    return response.data;
  } catch (error) {
    console.error("🌐 axiosInstance - deleteCompletedReference 오류:", error);
    console.error("🌐 axiosInstance - 오류 상세:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
    });
    throw error;
  }
};

export const getRecommendedTimetables = async (userId) => {
  try {
    console.log(
      "🌐 axiosInstance - getRecommendedTimetables 호출, userId:",
      userId
    );

    const url = `/users/${userId}/timetable/recommendation`;
    console.log("🌐 axiosInstance - 요청 URL:", url);

    const response = await axiosInstance.get(url);
    console.log(
      "🌐 axiosInstance - getRecommendedTimetables 응답:",
      response.data
    );

    // API 응답이 courses 형식이면 변환
    if (response.data && response.data.courses) {
      return {
        message: "추천 시간표가 성공적으로 생성되었습니다.",
        data: response.data.courses.map((course, index) => ({
          timetableId: index + 1,
          timetableName: `추천 시간표 ${index + 1}`,
          courses: [course],
          creditsByType: {
            [course.department]: course.credits,
          },
          totalCredits: course.credits,
        })),
      };
    }

    return response.data;
  } catch (error) {
    console.error("🌐 axiosInstance - getRecommendedTimetables 오류:", error);
    throw error;
  }
};

export const saveTimetable = async (studentId, timetableId) => {
  try {
    console.log("🌐 axiosInstance - saveTimetable 호출:", {
      studentId,
      timetableId,
    });

    const url = `/users/${studentId}/timetable/save`;
    console.log("🌐 axiosInstance - 요청 URL:", url);

    const response = await axiosInstance.post(url, { timetableId });
    console.log("🌐 axiosInstance - saveTimetable 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("🌐 axiosInstance - saveTimetable 오류:", error);
    console.error("🌐 axiosInstance - 오류 상세:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
    });
    throw error;
  }
};

export const getSavedTimetable = async (studentId, timetableId) => {
  try {
    console.log("🌐 axiosInstance - getSavedTimetable 호출:", {
      studentId,
      timetableId,
    });

    const url = `/users/${studentId}/timetable/${timetableId}`;
    console.log("🌐 axiosInstance - 요청 URL:", url);

    const response = await axiosInstance.get(url);
    console.log("🌐 axiosInstance - getSavedTimetable 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("🌐 axiosInstance - getSavedTimetable 오류:", error);
    console.error("🌐 axiosInstance - 오류 상세:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
    });
    throw error;
  }
};

export const searchCourseByCode = async (courseCode) => {
  try {
    console.log("🌐 axiosInstance - searchCourseByCode 호출:", { courseCode });

    // 실제 API 엔드포인트 사용 - q 파라미터로 과목번호 검색
    const response = await axiosInstance.get(
      `/courses/search?q=${encodeURIComponent(courseCode)}`
    );
    console.log("🌐 axiosInstance - searchCourseByCode 응답:", response.data);

    // API 응답 형식: { courses: [ { courseCode, courseName, department, credits, grade } ] }
    if (
      response.data &&
      response.data.courses &&
      response.data.courses.length > 0
    ) {
      // 첫 번째 매칭 결과 반환 (정확한 코드 매칭 우선)
      const exactMatch = response.data.courses.find(
        (course) => course.courseCode === courseCode
      );
      return exactMatch || response.data.courses[0];
    }

    return null;
  } catch (error) {
    console.error("🌐 axiosInstance - searchCourseByCode 오류:", error);
    throw error;
  }
};

export const login = async (loginData) => {
  try {
    console.log("🌐 axiosInstance - login 호출");
    console.log("🌐 axiosInstance - 전송할 로그인 데이터:", loginData);

    const response = await axiosInstance.post("/auth/login", loginData);
    console.log("🌐 axiosInstance - login 응답:", response.data);

    // 로그인 성공 시 토큰 저장
    if (response.data.accessToken) {
      setToken(response.data.accessToken);
      console.log("🌐 axiosInstance - 토큰 저장 완료");
    }

    return response.data;
  } catch (error) {
    console.error("🌐 axiosInstance - login 오류:", error);
    console.error("🌐 axiosInstance - 오류 상세:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
    });
    throw error;
  }
};

export const signup = async (signupData) => {
  try {
    console.log("🌐 axiosInstance - signup 호출");
    console.log("🌐 axiosInstance - 전송할 회원가입 데이터:", signupData);

    const response = await axiosInstance.post("/auth/signup", signupData);
    console.log("🌐 axiosInstance - signup 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("🌐 axiosInstance - signup 오류:", error);
    console.error("🌐 axiosInstance - 오류 상세:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
    });
    throw error;
  }
};

export const logout = async () => {
  try {
    console.log("🌐 axiosInstance - logout 호출");

    const response = await axiosInstance.post("/auth/logout");
    console.log("🌐 axiosInstance - logout 응답:", response.data);

    // 로그아웃 시 토큰 제거
    removeToken();
    console.log("🌐 axiosInstance - 토큰 제거 완료");

    return response.data;
  } catch (error) {
    console.error("🌐 axiosInstance - logout 오류:", error);
    console.error("🌐 axiosInstance - 오류 상세:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
    });

    // 로그아웃 실패해도 토큰은 제거
    removeToken();
    console.log("🌐 axiosInstance - 오류 발생했지만 토큰 제거 완료");

    throw error;
  }
};

// 범용 과목 검색 (과목명, 교수명, 학과명, 과목코드 등으로 검색 가능)
export const searchCourses = async (searchQuery, filters = {}) => {
  try {
    console.log("🌐 axiosInstance - searchCourses 호출:", {
      searchQuery,
      filters,
    });

    const params = new URLSearchParams();

    // q 파라미터로 검색어 추가
    if (searchQuery) {
      params.append("q", searchQuery);
    }

    // 필터 옵션들 추가
    if (filters.department) {
      params.append("department", filters.department);
    }
    if (filters.professor) {
      params.append("professor", filters.professor);
    }
    if (filters.credits) {
      params.append("credits", filters.credits);
    }
    if (filters.grade) {
      params.append("grade", filters.grade);
    }
    if (filters.courseCode) {
      params.append("courseCode", filters.courseCode);
    }

    const url = `/courses/search?${params.toString()}`;
    console.log("🌐 axiosInstance - 요청 URL:", url);

    const response = await axiosInstance.get(url);
    console.log("🌐 axiosInstance - searchCourses 응답:", response.data);

    return response.data;
  } catch (error) {
    console.error("🌐 axiosInstance - searchCourses 오류:", error);
    throw error;
  }
};

// 특정 과목 상세 정보 조회
export const getCourseDetails = async (courseCode) => {
  try {
    console.log("🌐 axiosInstance - getCourseDetails 호출:", courseCode);

    const url = `/courses/${encodeURIComponent(courseCode)}`;
    console.log("🌐 axiosInstance - 요청 URL:", url);

    const response = await axiosInstance.get(url);
    console.log("🌐 axiosInstance - getCourseDetails 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("🌐 axiosInstance - getCourseDetails 오류:", error);
    throw error;
  }
};

// 과목 시간표 정보 조회 (실제 수업 시간 포함)
export const getCourseSchedule = async (courseCode) => {
  try {
    console.log("🌐 axiosInstance - getCourseSchedule 호출:", courseCode);

    const url = `/courses/${encodeURIComponent(courseCode)}/schedule`;
    console.log("🌐 axiosInstance - 요청 URL:", url);

    const response = await axiosInstance.get(url);
    console.log("🌐 axiosInstance - getCourseSchedule 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("🌐 axiosInstance - getCourseSchedule 오류:", error);

    // API 실패 시 기본 시간표 정보 반환
    return {
      courseCode: courseCode,
      actualClassTimes: [{ 요일: "월", 교시들: [1, 2, 3] }],
    };
  }
};

// 시간표 추천 생성 (실제 과목 검색 기반)
export const generateRecommendedTimetables = async (userId, preferences) => {
  try {
    console.log("🌐 axiosInstance - generateRecommendedTimetables 호출:", {
      userId,
      preferences,
    });

    const url = `/users/${userId}/timetable/generate`;
    console.log("🌐 axiosInstance - 요청 URL:", url);

    const requestData = {
      preferences: preferences,
      useRealCourseData: true, // 실제 과목 데이터 사용 플래그
    };

    const response = await axiosInstance.post(url, requestData);
    console.log(
      "🌐 axiosInstance - generateRecommendedTimetables 응답:",
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(
      "🌐 axiosInstance - generateRecommendedTimetables 오류:",
      error
    );
    console.error("🌐 axiosInstance - 실제 API 실패, 목업 데이터로 대체");
  }
};

// 사용자 선호도에 따른 과목 필터링
export const getFilteredCourses = async (filters) => {
  try {
    console.log("🌐 axiosInstance - getFilteredCourses 호출:", filters);

    const params = new URLSearchParams();

    // 필터 조건들 추가
    if (filters.department) params.append("department", filters.department);
    if (filters.grade) params.append("grade", filters.grade);
    if (filters.credits) params.append("credits", filters.credits);
    if (filters.professor) params.append("professor", filters.professor);
    if (filters.timeSlots)
      params.append("timeSlots", JSON.stringify(filters.timeSlots));
    if (filters.excludeTimeSlots)
      params.append(
        "excludeTimeSlots",
        JSON.stringify(filters.excludeTimeSlots)
      );
    if (filters.requiredCourses)
      params.append("requiredCourses", JSON.stringify(filters.requiredCourses));
    if (filters.excludedCourses)
      params.append("excludedCourses", JSON.stringify(filters.excludedCourses));

    const url = `/courses/filter?${params.toString()}`;
    console.log("🌐 axiosInstance - 요청 URL:", url);

    const response = await axiosInstance.get(url);
    console.log("🌐 axiosInstance - getFilteredCourses 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("🌐 axiosInstance - getFilteredCourses 오류:", error);

    // API 실패 시 빈 배열 반환
    return [];
  }
};

// 과목 정보 검증을 위한 헬퍼 함수
// 실시간 과목 검색 함수
export const searchCoursesRealtime = async (query, options = {}) => {
  try {
    const params = new URLSearchParams();
    params.append("q", query);

    // 추가 옵션들
    Object.keys(options).forEach((key) => {
      if (options[key]) {
        params.append(key, options[key]);
      }
    });

    const response = await axiosInstance.get(
      `/courses/search?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error("실시간 과목 검색 중 오류 발생:", error);
    throw error;
  }
};

// 시간표 추천 요청 함수
export const requestTimetableRecommendation = async (preferences) => {
  try {
    const response = await axiosInstance.post(
      "/timetable/recommend",
      preferences
    );
    return response.data;
  } catch (error) {
    console.error("시간표 추천 요청 중 오류 발생:", error);
    throw error;
  }
};

export default axiosInstance;

// 토큰 관리 함수들도 export
export { getToken, setToken, removeToken };
