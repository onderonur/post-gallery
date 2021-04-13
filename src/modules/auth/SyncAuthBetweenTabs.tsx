import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { redirectToHome } from '@src/modules/routing/RoutingUtils';

const logoutTimestampKey = 'logout';

const SyncAuthBetweenTabs: React.FC = ({ children }) => {
  const router = useRouter();
  const { logout } = router.query;

  useEffect(() => {
    const prevTimeStamp = localStorage.getItem(logoutTimestampKey);

    const storageListener = () => {
      const timeStamp = localStorage.getItem(logoutTimestampKey);
      if (prevTimeStamp !== timeStamp) {
        redirectToHome();
      }
    };

    window.addEventListener('storage', storageListener);

    if (typeof logout === 'string' && logout !== prevTimeStamp) {
      localStorage.setItem(logoutTimestampKey, logout);
      redirectToHome();
    }

    return () => {
      window.removeEventListener('storage', storageListener);
    };
  }, [logout]);

  return <>{children}</>;
};

export default SyncAuthBetweenTabs;
