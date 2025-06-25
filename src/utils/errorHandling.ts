import axios from "axios";
import { ApiError } from "../types";

export const handleApiError = (error: unknown, source: string): ApiError => {
  if (axios.isAxiosError(error)) {
    console.error(`${source} API error:`, error.response?.data);
    return {
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
      code: error.response?.statusText,
    };
  }
  console.error(`${source} unknown error:`, error);
  return {
    message: error instanceof Error ? error.message : "Unknown error occurred",
  };
};
