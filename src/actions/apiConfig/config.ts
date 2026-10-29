"use server";

import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { envConfig } from "../config";

const apiClient = axios.create({
  baseURL: envConfig.apiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
}

export async function apiServerRequest<T = any>(
  endpoint: string,
  options: {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    data?: any;
    params?: Record<string, any>;
    config?: AxiosRequestConfig;
  } = {},
): Promise<ApiResponse<T>> {
  const { method = "GET", data, params, config } = options;

  try {
    const response = await apiClient.request<T>({
      url: endpoint,
      method,
      data,
      params,
      ...config,
    });

    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    const status = error.response?.status;
    const cookieStore = await cookies();

    if (status === 401) {
      cookieStore.delete("authToken");
      cookieStore.delete("user");

      return {
        success: false,
        status: 401,
        error: "Sesión expirada o no autorizada.",
      };
    }

    return {
      success: false,
      status: status || 500,
      error: error.response?.data?.message || "Error al procesar la solicitud",
    };
  }
}
//IO