import React from "react";
import gql from "graphql-tag";
import { useGetViewerWithSessionsQuery } from "@/generated/graphql";
import Loading from "@/components/Loading";
import { List, ListItem, ListItemText } from "@material-ui/core";
import dayjs from "dayjs";
import { DATE_TIME_FORMAT } from "@/utils";

const GET_VIEWER_WITH_SESSIONS = gql`
  query GetViewerWithSessions {
    viewer {
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
          }
        }
      }
    }
  }
`;

const UserSessions = React.memo(() => {
  const { data, loading } = useGetViewerWithSessionsQuery({
    query: GET_VIEWER_WITH_SESSIONS,
    fetchPolicy: "network-only",
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <List>
      {data?.viewer?.sessions?.edges.map((session) => {
        const { node } = session;
        return (
          <ListItem key={node.id} divider>
            <ListItemText
              primary={`${node.platform} • ${node.os}`}
              secondary={`${node.browser} • ${dayjs(node.createdAt).format(
                DATE_TIME_FORMAT,
              )}`}
            />
          </ListItem>
        );
      })}
    </List>
  );
});

export default UserSessions;
