import { Maybe } from '@src/generated/graphql';
import { useViewer } from '@src/modules/auth/ViewerContext';
import { ID } from '@src/types';
import { urls } from '@src/modules/routing/RoutingUtils';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export const useRequireAuth = () => {
  const viewer = useViewer();

  const requireAuth = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (authenticated: any, fallback: any = null) => {
      if (!viewer) {
        return fallback;
      }
      return authenticated;
    },
    [viewer],
  );

  return requireAuth;
};

export const useRequireOwner = (ownerId: Maybe<ID>) => {
  const viewer = useViewer();

  const requireOwner = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (matched: any, fallback: any = null) => {
      if (!viewer || !ownerId || viewer.id !== ownerId) {
        return fallback;
      }
      return matched;
    },
    [ownerId, viewer],
  );

  return requireOwner;
};

interface UsePrivateActionArgs {
  isAuthRequired?: boolean;
  action: Maybe<Function>;
}

export const usePrivateAction = ({
  isAuthRequired,
  action,
}: UsePrivateActionArgs) => {
  const router = useRouter();
  const requireAuth = useRequireAuth();
  if (!isAuthRequired) {
    return action;
  }
  return requireAuth(action, () => router.push(urls.login.href));
};
