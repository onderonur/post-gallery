import React, { useCallback } from "react";
import { Container, Tabs, Tab, Paper } from "@material-ui/core";
import gql from "graphql-tag";
import { useGetUserQuery } from "@/generated/graphql";
import { ID, Cursor } from "@/types";
import Loading from "@/components/Loading";
import PostList, { PostListFragments } from "@/components/PostList";
import produce from "immer";
import { updateConnectionAfterFetchMore } from "@/utils";
import useRequireOwner from "@/hooks/useRequireOwner";
import { useRouter } from "next/router";
import queryString from "query-string";
import UserHeader, { UserHeaderFragments } from "./components/UserHeader";
import UserSeo, { UserSeoFragments } from "./components/UserSeo";
import TabPanel from "@/components/TabPanel";
import UserSettings, { UserSettingsFragments } from "./components/UserSettings";
import UserSessions from "./components/UserSessions";

const USER_TAB_VALUES = {
  posts: "posts",
  settings: "settings",
  sessions: "sessions",
};

const DEFAULT_SELECTED_TAB_VALUE = USER_TAB_VALUES.posts;

const GET_USER = gql`
  query GetUser($id: ID!, $after: Cursor) {
    user(id: $id) {
      ...UserSeo_user
      ...UserHeader_user
      ...UserSettings_user
      posts(first: 10, after: $after) {
        totalCount
        ...PostList_postConnection
      }
    }
  }
  ${UserSeoFragments.user}
  ${UserHeaderFragments.user}
  ${UserSettingsFragments.user}
  ${PostListFragments.postConnection}
`;

const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data, loading, fetchMore } = useGetUserQuery({
    query: GET_USER,
    variables: { id: userId as ID },
    fetchPolicy: "network-only",
  });

  const handleFetchMorePosts = useCallback(
    (after: Cursor) => {
      fetchMore({
        variables: { after },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          const newResult = produce(prevResult, (draft) => {
            if (!draft.user) {
              return prevResult;
            }
            draft.user.posts = updateConnectionAfterFetchMore(
              draft.user?.posts,
              fetchMoreResult?.user?.posts,
            );
          });
          return newResult;
        },
      });
    },
    [fetchMore],
  );

  const user = data?.user;
  const requireOwner = useRequireOwner(user?.id);

  if (!user) {
    if (loading) {
      return <Loading />;
    }
    // TODO: Redirect to 404
    return null;
  }

  const { tabs = DEFAULT_SELECTED_TAB_VALUE } = router.query;
  const selectedTab = typeof tabs === "string" ? tabs : null;

  return (
    <>
      <UserSeo user={user} />
      <UserHeader user={user} />
      <Paper>
        <Tabs
          value={tabs as string}
          indicatorColor="primary"
          textColor="primary"
          onChange={(e, value) => {
            const query = { tabs: value };
            const stringified = queryString.stringify(query);
            // https://github.com/zeit/next.js/issues/9574#issuecomment-560082865
            router.push(
              `${router.pathname}?${stringified}`,
              `${router.asPath.split("?")[0]}?${stringified}`,
            );
          }}
          aria-label="user profile tabs"
        >
          <Tab
            label={`Posts (${user.posts?.totalCount})`}
            value={USER_TAB_VALUES.posts}
          />
          {requireOwner(
            <Tab label="Settings" value={USER_TAB_VALUES.settings} />,
          )}
          {requireOwner(
            <Tab label="Sessions" value={USER_TAB_VALUES.sessions} />,
          )}
        </Tabs>
      </Paper>
      <TabPanel currentValue={selectedTab} value={USER_TAB_VALUES.posts}>
        <Container maxWidth="sm">
          <PostList
            loading={loading}
            postConnection={user.posts}
            onFetchMore={handleFetchMorePosts}
          />
        </Container>
      </TabPanel>
      {requireOwner(
        <TabPanel currentValue={selectedTab} value={USER_TAB_VALUES.settings}>
          <UserSettings user={user} />
        </TabPanel>,
      )}
      {requireOwner(
        <TabPanel currentValue={selectedTab} value={USER_TAB_VALUES.sessions}>
          <UserSessions />
        </TabPanel>,
      )}
    </>
  );
};

export default UserView;
