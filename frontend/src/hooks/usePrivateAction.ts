import URLS from "@/constants/urls";
import useRequireAuth from "./useRequireAuth";
import { Maybe } from "@/generated/graphql";
import { useRouter } from "next/router";

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
  return requireAuth(action, () => router.push(URLS.login));
};

export default usePrivateAction;
