import { useEffect } from "react";
import useQueryString from "./useQueryString";
import URLS from "constants/urls";

const useSyncLogoutBetweenTabs = () => {
  const { logout } = useQueryString();

  useEffect(() => {
    const logoutTimeStampKey = "logout";
    const prevTimeStamp = localStorage.getItem(logoutTimeStampKey);

    const redirectToHome = () => {
      window.location.href = URLS.posts;
    };

    const storageListener = () => {
      const timeStamp = localStorage.getItem(logoutTimeStampKey);
      if (prevTimeStamp !== timeStamp) {
        redirectToHome();
      }
    };

    window.addEventListener("storage", storageListener);

    if (typeof logout === "string" && logout !== prevTimeStamp) {
      localStorage.setItem(logoutTimeStampKey, logout);
      redirectToHome();
    }

    return () => {
      window.removeEventListener("storage", storageListener);
    };
  }, [logout]);
};

export default useSyncLogoutBetweenTabs;
