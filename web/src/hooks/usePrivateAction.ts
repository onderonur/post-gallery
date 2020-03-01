import { useHistory } from "react-router-dom";
import URLS from "constants/urls";
import useRequireAuth from "./useRequireAuth";
import { Maybe } from "generated/graphql";

interface UsePrivateActionArgs {
  isAuthRequired?: boolean;
  action: Maybe<Function>;
}

const usePrivateAction = ({ isAuthRequired, action }: UsePrivateActionArgs) => {
  const history = useHistory();
  const requireAuth = useRequireAuth();
  if (!isAuthRequired) {
    return action;
  }
  return requireAuth(action, () => history.push(URLS.login));
};

export default usePrivateAction;
