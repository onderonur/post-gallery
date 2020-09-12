import urls from '@src/utils/urls';
import useRequireAuth from './useRequireAuth';
import { Maybe } from '@src/generated/graphql';
import { useRouter } from 'next/router';

interface UsePrivateActionArgs {
  isAuthRequired?: boolean;
  action: Maybe<Function>;
}

const usePrivateAction = ({ isAuthRequired, action }: UsePrivateActionArgs) => {
  const router = useRouter();
  const requireAuth = useRequireAuth();
  if (!isAuthRequired) {
    return action;
  }
  return requireAuth(action, () => router.push(urls.login.href));
};

export default usePrivateAction;
