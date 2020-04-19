import React, { useCallback } from "react";
import {
  Avatar,
  Container,
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  TabsProps,
} from "@material-ui/core";
import { useParams, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { BoldText } from "components/Text";
import { FlexCol } from "components/FlexCol";
import gql from "graphql-tag";
import { useGetUserQuery } from "generated/graphql";
import { ID, Cursor } from "types";
import Loading from "components/Loading";
import PostList, { PostListFragments } from "components/PostList";
import produce from "immer";
import { updateConnectionAfterFetchMore } from "utils";
import { gradientBackground } from "styles";
import useIsMobile from "hooks/useIsMobile";
import useQueryString from "hooks/useQueryString";
import queryString from "query-string";
import useRequireOwner from "hooks/useRequireOwner";

const LARGE_AVATAR_SIZE = 12;
const SMALL_AVATAR_SIZE = 6;

const USER_TAB_VALUES = {
  posts: "posts",
  settings: "settings",
};

const DEFAULT_SELECTED_TAB_VALUE = USER_TAB_VALUES.posts;

interface UserAvatarStyleProps {
  size: number;
}

const UserAvatar = styled(Avatar)<UserAvatarStyleProps>`
  height: ${({ theme, size }) => theme.spacing(size)}px;
  width: ${({ theme, size }) => theme.spacing(size)}px;
  border: 0.2rem solid ${({ theme }) => theme.palette.background.paper};
`;

const UserHeader = styled(FlexCol)`
  ${({ theme }) =>
    gradientBackground(
      theme.palette.primary.main,
      theme.palette.secondary.main,
    )};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;

const GET_USER = gql`
  query GetUser($id: ID!, $after: Cursor) {
    user(id: $id) {
      id
      displayName
      thumbnailUrl
      posts(first: 10, after: $after) {
        totalCount
        ...PostList_postConnection
      }
    }
  }
  ${PostListFragments.postConnection}
`;

interface RouteParams {
  userId: ID;
}

type TabValue = TabsProps["value"];

interface TabPanelProps {
  children: React.ReactNode;
  currentValue: TabValue;
  value: TabValue;
}

const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  currentValue,
}) => {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== currentValue}
      // TODO:
      // id={`scrollable-auto-tabpanel-${index}`}
      // aria-labelledby={`scrollable-auto-tab-${index}`}
    >
      {value === currentValue && <Box padding={2}>{children}</Box>}
    </Typography>
  );
};

const UserView = () => {
  const { userId } = useParams<RouteParams>();
  const { data, loading, fetchMore } = useGetUserQuery({
    query: GET_USER,
    variables: { id: userId },
    fetchPolicy: "network-only",
  });

  const handleFetchMorePosts = useCallback(
    (after: Cursor) => {
      fetchMore({
        variables: { after },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          const newResult = produce(prevResult, draft => {
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

  const history = useHistory();
  const location = useLocation();
  const { tabs = DEFAULT_SELECTED_TAB_VALUE } = useQueryString();
  const selectedTab = typeof tabs === "string" ? tabs : null;

  const isMobile = useIsMobile();

  const user = data?.user;
  const requireOwner = useRequireOwner(user?.id);

  if (!user) {
    if (loading) {
      return <Loading />;
    }
    // TODO: Redirect to 404
    return null;
  }

  return (
    <>
      <Box paddingY={2} clone>
        <UserHeader alignItems="center">
          <UserAvatar
            src={user.thumbnailUrl || ""}
            alt={user.displayName}
            size={isMobile ? SMALL_AVATAR_SIZE : LARGE_AVATAR_SIZE}
          />
          <BoldText variant="h6" component="h1" noWrap>
            {user.displayName}
          </BoldText>
        </UserHeader>
      </Box>
      <Paper>
        <Tabs
          value={tabs}
          indicatorColor="primary"
          textColor="primary"
          onChange={(e, value) =>
            history.push({
              pathname: location.pathname,
              search: queryString.stringify({ tabs: value }),
            })
          }
          aria-label="user profile tabs"
        >
          <Tab
            label={`Posts (${user.posts?.totalCount})`}
            value={USER_TAB_VALUES.posts}
          />
          {requireOwner(
            <Tab label="Settings" value={USER_TAB_VALUES.settings} />,
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
          Settings
        </TabPanel>,
      )}
    </>
  );
};

export default UserView;
