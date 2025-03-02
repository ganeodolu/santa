import { BASE_URL } from "@/shared/constants";
import axios from "axios";

export const apiWithOpenAPI = axios.create({
  baseURL: BASE_URL
});
