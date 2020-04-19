import { useViewer } from "@/components/ViewerProvider";

const useRequireAuth = () => {
  const viewer = useViewer();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const requireAuth = (authenticated: any, fallback: any = null) => {
    if (!viewer) {
      return fallback;
    }
    return authenticated;
  };
  return requireAuth;
};

export default useRequireAuth;
