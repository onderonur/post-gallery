import React, { useEffect } from "react";
import { useRouter } from "next/router";

const LOGOUT_TIMESTAMP_KEY = "logout";

const SyncAuthBetweenTabs: React.FC = ({ children }) => {
  const router = useRouter();
  const { logout } = router.query;

  useEffect(() => {
    const prevTimeStamp = localStorage.getItem(LOGOUT_TIMESTAMP_KEY);

    const redirectToHome = () => {
      window.location.href = "/";
    };

    const storageListener = () => {
      const timeStamp = localStorage.getItem(LOGOUT_TIMESTAMP_KEY);
      if (prevTimeStamp !== timeStamp) {
        redirectToHome();
      }
    };

    window.addEventListener("storage", storageListener);

    if (typeof logout === "string" && logout !== prevTimeStamp) {
      localStorage.setItem(LOGOUT_TIMESTAMP_KEY, logout);
      redirectToHome();
    }

    return () => {
      window.removeEventListener("storage", storageListener);
    };
  }, [logout]);

  return <>{children}</>;
};

export default SyncAuthBetweenTabs;
