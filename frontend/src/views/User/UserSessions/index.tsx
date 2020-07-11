import React from "react";
import gql from "graphql-tag";
import { useGetUserWithSessionsQuery } from "@/generated/graphql";
import Loading from "@/components/Loading";
import { List, ListItem, ListItemText } from "@material-ui/core";
import dayjs from "dayjs";
import { dateTimeFormat } from "@/utils";
import { BoldText } from "@/components/Text";
import { useRouter } from "next/router";
import { ID } from "@/types";
import UserLayout, { UserLayoutFragments } from "../components/UserLayout";

const GET_USER_WITH_SESSIONS = gql`
  query GetUserWithSessions($id: ID!) {
    user(id: $id) {
      ...UserLayout_user
      posts(first: 0) @connection(key: "userPosts") {
        ...UserLayout_userPosts
      }
      sessions @connection(key: "userSessions") {
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
  ${UserLayoutFragments.user}
  ${UserLayoutFragments.userPosts}
`;

const UserSessionsView = React.memo(() => {
  const router = useRouter();
  const { userId } = router.query;
  const { data, loading } = useGetUserWithSessionsQuery({
    query: GET_USER_WITH_SESSIONS,
    variables: { id: userId as ID },
    fetchPolicy: "cache-and-network",
    returnPartialData: true,
  });

  const user = data?.user;

  // TODO: Will add "fethMore"

  return (
    <UserLayout user={user} userPosts={user?.posts}>
      {loading ? (
        <Loading />
      ) : (
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
                        dateTimeFormat,
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
      )}
    </UserLayout>
  );
});

export default UserSessionsView;
