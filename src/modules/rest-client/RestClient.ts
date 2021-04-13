import { fetcher, FetcherPostConfig } from '@shared/fetcher';
import { SocialAccountType, GraphMedia } from '@src/generated/graphql';

interface LoginInput {
  socialAccountType: SocialAccountType;
  token: string;
}

class AuthClient {
  login = async (input: LoginInput) => {
    const { success } = await fetcher.post<{ success: true }>(
      '/api/auth/login',
      input,
    );
    return success;
  };

  logout = async () => {
    const { success } = await fetcher.post('/api/auth/logout');
    return success;
  };
}

class UploadClient {
  async uploadImage(file: File, config: FetcherPostConfig) {
    const formData = new FormData();
    formData.append('image', file);
    const media = await fetcher.post<GraphMedia>(
      '/api/upload',
      formData,
      config,
    );
    return media;
  }
}

class RestClient {
  auth = new AuthClient();
  upload = new UploadClient();
}

export default new RestClient();
