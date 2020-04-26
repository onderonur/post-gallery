import React from "react";
import gql from "graphql-tag";
import { useGetUserWithSessionsQuery } from "@/generated/graphql";
import Loading from "@/components/Loading";
import { List, ListItem, ListItemText } from "@material-ui/core";
import dayjs from "dayjs";
import { DATE_TIME_FORMAT } from "@/utils";
import { BoldText } from "@/components/Text";
import { useRouter } from "next/router";
import { ID } from "@/types";

const GET_USER_WITH_SESSIONS = gql`
  query GetUserWithSessions($id: ID!) {
    user(id: $id) {
      # This "id" is required.
      # Without this, even if the data is present
      # in the network tab of devtools, it can't be
      # grabbed from the cache.
      id
      sessions {
        totalCount
        pageInfo {
          hasNextPage
        }
        edges {
          node {
            id
            browser
            os
            platform
            createdAt
            isCurrent
          }
        }
      }
    }
  }
`;

const UserSessions = React.memo(() => {
  const router = useRouter();
  const { userId } = router.query;
  const { data, loading } = useGetUserWithSessionsQuery({
    query: GET_USER_WITH_SESSIONS,
    variables: { id: userId as ID },
    fetchPolicy: "network-only",
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <List>
      {data?.user?.sessions?.edges.map((session) => {
        const { node } = session;
        return (
          <ListItem key={node.id} divider>
            <ListItemText
              primary={`${node.platform} • ${node.os}`}
              secondary={
                <>
                  <span>{`${node.browser} • ${dayjs(node.createdAt).format(
                    DATE_TIME_FORMAT,
                  )}`}</span>
                  {node.isCurrent ? (
                    <span>
                      {" • "}
                      <BoldText component="span" color="primary">
                        Current Session
                      </BoldText>
                    </span>
                  ) : null}
                </>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
});

export default UserSessions;
