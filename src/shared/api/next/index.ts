import { BASE_URL } from "@/shared/constants";
import axios from "axios";

export const nextApiWithOpenAPI = axios.create({
  baseURL: BASE_URL
});
