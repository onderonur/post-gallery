import { useEffect } from "react";
import useQueryString from "./useQueryString";

const useSyncLogoutBetweenTabs = () => {
  const { logout } = useQueryString();

  useEffect(() => {
    const logoutTimeStampKey = "logout";
    const prevTimeStamp = localStorage.getItem(logoutTimeStampKey);

    const redirectToHome = () => {
      window.location.href = "/";
    };

    const storageListener = () => {
      const timeStamp = localStorage.getItem(logoutTimeStampKey);
      if (prevTimeStamp !== timeStamp) {
        redirectToHome();
      }
    };

    window.addEventListener("storage", storageListener);

    if (logout) {
      const logoutTimeStampKey = "logout";
      const prevTimeStamp = localStorage.getItem(logoutTimeStampKey);
      if (typeof logout === "string" && logout !== prevTimeStamp) {
        localStorage.setItem(logoutTimeStampKey, logout);
        redirectToHome();
      }
    }

    return () => {
      window.removeEventListener("storage", storageListener);
    };
  }, [logout]);
};

export default useSyncLogoutBetweenTabs;
