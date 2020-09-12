import { CustomError } from './CustomError';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { RequestHeader } from './RequestHeader';

function handleResponse(response: AxiosResponse) {
  return response.data;
}

function handleError(err: AxiosError) {
  const { response } = err;
  const status = response?.status || 500;
  const data = response?.data;
  const message = data.message || response?.statusText;
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
  get = <Response = any>(url: string) => {
    return axios.get<Response>(url).then(handleResponse).catch(handleError);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post = <Response = any, PostData = any>(
    url: string,
    data?: PostData,
    config?: FetcherPostConfig,
  ): Promise<Response> => {
    return axios
      .post<Response>(url, data, {
        // https://gist.github.com/virolea/e1af9359fe071f24de3da3500ff0f429
        onUploadProgress: config?.onUploadProgress
          ? (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              );
              config.onUploadProgress(percentCompleted);
            }
          : undefined,
      })
      .then(handleResponse)
      .catch(handleError);
  };
}

export const fetcher = new Fetcher();
