import { ID } from "@/types";
import { useViewer } from "@/components/ViewerProvider";
import { Maybe } from "@/generated/graphql";
import { useCallback } from "react";

const useRequireOwner = (ownerId: Maybe<ID>) => {
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

export default useRequireOwner;
