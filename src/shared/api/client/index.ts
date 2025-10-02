import {
  CLIENT_ASTRONOMY_ENDPOINT,
  CLIENT_BASE_URL,
  CLIENT_WEATHER_ENDPOINT
} from "@/shared/constants";
import axios from "axios";

export const apiWithOpenAPI = axios.create({
  baseURL: CLIENT_BASE_URL
});

apiWithOpenAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("네트워크 오류 또는 서버 응답 없음");
      return Promise.reject(error);
    }

    const status = error.response.status;

    switch (status) {
      case 400:
        console.error("잘못된 요청 (400)");
        // 사용자 입력 검증 메시지 표시 등
        break;
      case 401:
        console.error("인증 실패 (401)");
        // 예: 로그인 페이지로 리다이렉션, 토큰 재발급 시도 등
        break;
      case 403:
        console.error("권한 없음 (403)");
        // 접근 권한 없는 페이지로 이동 처리 등
        break;
      case 404:
        console.error("리소스 없음 (404)");
        // 404 페이지 보여주기 등
        break;
      case 500:
        console.error("서버 내부 오류 (500)");
        // 서버 문제 공통 알림
        break;
      case 503:
        console.error("서비스 이용 불가 (503)");
        // 서버 유지보수 안내 표시 등
        break;
      default:
        console.error(`예상치 못한 에러 발생 (${status})`);
      // 기타 상태 처리
    }
    return Promise.reject(error);
  }
);

export const getClientWeatherInformation = async (x: number, y: number) => {
  const response = await apiWithOpenAPI(CLIENT_WEATHER_ENDPOINT, {
    params: {
      gridX: x,
      gridY: y
    }
  });

  return response.data;
};

export const getClientAstronomyInformation = async (
  lat: number,
  lon: number
) => {
  const response = await apiWithOpenAPI(CLIENT_ASTRONOMY_ENDPOINT, {
    params: {
      lat,
      lon
    }
  });

  return response.data;
};
