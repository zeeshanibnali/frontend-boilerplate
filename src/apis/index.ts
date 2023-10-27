import axios, { AxiosError, AxiosResponse } from "axios";
import { QueryClient } from "react-query";
// import token from "../token";

const tmsRequest = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/v1/"
      : "http://localhost:4000/v1/",
  timeout: 60000,
  headers: {
    Accept: "application/json",
  },
});

tmsRequest.interceptors.request.use(
  (config: any) => {
    // config.headers["x-language-code"] = i18n.language;
    return config;
  },
  (error: AxiosError) => {
    console.error("Request error", error);
    Promise.reject(error);
  },
);

tmsRequest.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalConfig: any = error.config;

    if (
      originalConfig &&
      originalConfig?.url !== "/v1/auth/login" &&
      error.response
    ) {
      // Access Token was expired
      if (error.response.status === 401 && !originalConfig?._retry) {
        originalConfig._retry = true;

        try {
          const rs = await tmsRequest.post("/v1/auth/refreshtoken", {
            refreshToken: localStorage.getItem("x-refresh-token"),
          });

          const { accessToken } = rs.data;

          localStorage.setItem("x-access-token", accessToken);

          return tmsRequest(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    handleAxiosError(error);
  },
);

export default tmsRequest;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const handleAxiosError = (error: any) => {
  let errorMessage = "An unknown error occurred.";

  // Check for network-related error
  if (error.message) {
    errorMessage = `Network Error: ${error.message}`;
  }

  // Check if error response exists
  if (error.response) {
    // Server responded with a non-2xx status code

    // Extract status code
    const statusCode = error.response.status;

    // Check if error message exists in response data
    if (error.response.data && error.response.data.message) {
      errorMessage = `Server responded with ${statusCode}: ${error.response.data.message}`;
    } else {
      switch (statusCode) {
        case 400:
          errorMessage = "Bad request. Please check input.";
          break;
        case 401:
          errorMessage = "Unauthorized.";
          break;
        case 403:
          errorMessage = "Forbidden.";
          break;
        case 404:
          errorMessage = "Not found.";
          break;
        case 500:
          errorMessage = "Internal server error";
          break;
        default:
          errorMessage = `Server responded with ${statusCode} but did not provide a specific error message.`;
      }
    }

    // Add the API URL to the error message
    errorMessage += ` API URL: ${error.response.config.url}`;
  }

  // notifyError(errorMessage);
};
