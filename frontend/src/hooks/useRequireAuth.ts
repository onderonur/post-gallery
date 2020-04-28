import { useViewer } from "@/components/ViewerProvider";
import { useCallback } from "react";

const useRequireAuth = () => {
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

export default useRequireAuth;
