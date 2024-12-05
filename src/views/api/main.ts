import axios from "axios";

export const apiWithWeather = axios.create({
  baseURL: `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst`
});
