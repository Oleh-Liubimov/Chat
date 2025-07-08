// import {ENV} from '@utils/getEnv';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
import { backOff } from "exponential-backoff";
import { Platform } from "react-native";

const backOffOptions = {
  delayFirstAttempt: true,
  jitter: "full",
  numOfAttempts: 25,
  maxDelay: 1000,
  startingDelay: 10,
  timeMultiple: 5,
  retry: (error: unknown) => {
    return (
      axios.isAxiosError(error) &&
      error.response?.status != null &&
      error.response?.status >= 500
    );
  },
} as const;

const client = axios.create({
  baseURL: Platform.OS === "android" ? process.env.EXPO_PUBLIC_BASE_URL_ANDROID :process.env.EXPO_PUBLIC_BASE_URL_IOS,
});

client.interceptors.request.use(async(config) => {
  const token = await AsyncStorage.getItem("accessToken")

  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export async function post<TRequest, TResponse>(
  path: string,
  payload: TRequest
): Promise<TResponse> {
  const response = await backOff(
    async () => client.post<TResponse>(path, payload),
    backOffOptions
  );
  return response.data;
}

export async function patch<TRequest, TResponse>(
  path: string,
  payload: TRequest
): Promise<TResponse> {
  const response = await backOff(
    async () => client.patch<TResponse>(path, payload),
    backOffOptions
  );
  return response.data;
}

export async function put<TRequest, TResponse>(
  path: string,
  payload: TRequest
): Promise<TResponse> {
  const response = await backOff(
    async () => client.put<TResponse>(path, payload),
    backOffOptions
  );
  return response.data;
}

export async function get<TResponse>(
  path: string,
  queryParams?: { [key: string]: string | number }
): Promise<TResponse> {
  const response = await backOff(
    async () => client.get<TResponse>(path, { params: queryParams }),
    backOffOptions
  );
  return response.data;
}

export async function del<TResponse>(
  path: string,
  queryParams?: { [key: string]: string | number }
): Promise<TResponse> {
  const response = await backOff(
    async () => client.delete<TResponse>(path, { params: queryParams }),
    backOffOptions
  );
  return response.data;
}

export const isApiError = (
  error: unknown,
  expectedStatus?: number,
  expectedCode?: string
): error is AxiosError<{
  code?: string;
  data?: { [key: string]: unknown };
  error?: string;
}> => {
  return (
    axios.isAxiosError(error) &&
    (!expectedStatus || error.response?.status === expectedStatus) &&
    (!expectedCode || error.response?.data.code === expectedCode)
  );
};

export const isNetworkError = (
  error: unknown
): error is AxiosError<{
  code?: string;
  data?: { [key: string]: unknown };
  error?: string;
}> => {
  return (
    axios.isAxiosError(error) && !error.response && error.code === "ERR_NETWORK"
  );
};

export const getApiErrorCode = (error: unknown) => {
  return axios.isAxiosError(error) ? error.response?.data.code : null;
};
