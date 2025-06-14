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

export const saveCreditPreferences = async (studentId, creditSettings) => {
  try {
    console.log(
      "🌐 axiosInstance - saveCreditPreferences 호출, studentId:",
      studentId
    );
    console.log("🌐 axiosInstance - 전송할 학점 설정:", creditSettings);
    const url = `/users/${studentId}/timetable/preferences/settings`;
    console.log("🌐 axiosInstance - 요청 URL:", url);

    const response = await axiosInstance.put(url, creditSettings);
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

export const getRecommendedTimetables = async (studentId) => {
  try {
    console.log(
      "🌐 axiosInstance - getRecommendedTimetables 호출, studentId:",
      studentId
    );
    const url = `/users/${studentId}/timetable/recommendations`;
    console.log("🌐 axiosInstance - 요청 URL:", url);

    const response = await axiosInstance.get(url);
    console.log(
      "🌐 axiosInstance - getRecommendedTimetables 응답:",
      response.data
    );
    return response.data;
  } catch (error) {
    console.error("🌐 axiosInstance - getRecommendedTimetables 오류:", error);
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

export default axiosInstance;

// 토큰 관리 함수들도 export
export { getToken, setToken, removeToken };
