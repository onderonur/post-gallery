import { CustomError } from './CustomError';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { RequestHeader } from './RequestHeader';
import { to } from './to';

function handleResponse<ResponseData>(response: AxiosResponse<ResponseData>) {
  return response.data;
}

function handleError(err: AxiosError) {
  const { response } = err;
  const status = response?.status || 500;
  const message = response?.data.message || response?.statusText;
  throw new CustomError(status, message);
}

export interface FetcherPostConfig {
  onUploadProgress: (percentCompleted: number) => void;
}

class Fetcher {
  setCSRFToken = (csrfToken: string) => {
    axios.defaults.headers.common[RequestHeader.CSRF_TOKEN] = csrfToken;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get = async <ResponseData = any>(url: string) => {
    const result = await to<AxiosResponse<ResponseData>, AxiosError>(
      axios.get<ResponseData>(url),
    );
    if (result.error) {
      throw handleError(result.error);
    }
    return handleResponse(result.data);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post = async <ResponseData = any, PostData = any>(
    url: string,
    data?: PostData,
    config?: FetcherPostConfig,
  ): Promise<ResponseData> => {
    const result = await to<AxiosResponse<ResponseData>, AxiosError>(
      axios.post<ResponseData>(url, data, {
        // https://gist.github.com/virolea/e1af9359fe071f24de3da3500ff0f429
        onUploadProgress: config?.onUploadProgress
          ? (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              );
              config.onUploadProgress(percentCompleted);
            }
          : undefined,
      }),
    );
    if (result.error) {
      throw handleError(result.error);
    }
    return handleResponse(result.data);
  };
}

export const fetcher = new Fetcher();
