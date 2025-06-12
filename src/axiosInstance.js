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

    // 회원가입 요청 데이터 로깅
    if (config.url && config.url.includes("/auth/signup") && config.data) {
      console.log("🔍 회원가입 요청 데이터 상세 로깅:");
      console.log("- URL:", config.url);
      console.log("- Method:", config.method);
      console.log("- Headers:", config.headers);
      console.log("- Data:", JSON.stringify(config.data, null, 2));
      console.log("- name 필드:", config.data.name, "타입:", typeof config.data.name);
      console.log("- name null 체크:", config.data.name === null ? "NULL" : "NOT NULL");
      console.log("- name undefined 체크:", config.data.name === undefined ? "UNDEFINED" : "NOT UNDEFINED");
    }

    if (accessToken && !isAuthRoute) {
      // 디버깅용 로그 (토큰 전체가 아닌 일부만 표시)
      const tokenPreview =
        accessToken.substring(0, 10) +
        "..." +
        accessToken.substring(accessToken.length - 5);
      console.log(`🔹 인증 토큰이 요청에 포함됩니다. (${tokenPreview})`);
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    } else if (!isAuthRoute && !accessToken) {
      // 인증이 필요한 API인데 토큰이 없는 경우만 경고
      console.warn(
        "⚠️ 토큰이 없습니다. 로그인이 필요한 기능에 접근할 수 없습니다."
      );
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

// 토큰 관리 함수들도 export
export { getToken, setToken, removeToken };
