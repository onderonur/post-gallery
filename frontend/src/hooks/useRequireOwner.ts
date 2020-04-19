import { ID } from "@/types";
import { useViewer } from "@/components/ViewerProvider";
import { Maybe } from "@/generated/graphql";

const useRequireOwner = (ownerId: Maybe<ID>) => {
  const viewer = useViewer();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const requireOwner = (matched: any, fallback: any = null) => {
    if (!viewer || !ownerId || viewer.id !== ownerId) {
      return fallback;
    }
    return matched;
  };
  return requireOwner;
};

export default useRequireOwner;
