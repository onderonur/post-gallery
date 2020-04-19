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
  makeStyles,
  Theme,
} from "@material-ui/core";
import { BoldText } from "@/components/Text";
import { FlexCol } from "@/components/FlexCol";
import gql from "graphql-tag";
import { useGetUserQuery } from "@/generated/graphql";
import { ID, Cursor } from "@/types";
import Loading from "@/components/Loading";
import PostList, { PostListFragments } from "@/components/PostList";
import produce from "immer";
import { updateConnectionAfterFetchMore } from "@/utils";
import { gradientBackground } from "@/styles";
import useIsMobile from "@/hooks/useIsMobile";
import useRequireOwner from "@/hooks/useRequireOwner";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import queryString from "query-string";

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

const useStyles = makeStyles<Theme, UserAvatarStyleProps>((theme) => ({
  avatar: {
    height: ({ size }) => theme.spacing(size),
    width: ({ size }) => theme.spacing(size),
    border: `0.2rem solid ${theme.palette.background.paper}`,
  },
  header: {
    ...gradientBackground(
      theme.palette.primary.main,
      theme.palette.secondary.main,
    ),
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.contrastText,
  },
}));

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

  const { tabs = DEFAULT_SELECTED_TAB_VALUE } = router.query;

  const selectedTab = typeof tabs === "string" ? tabs : null;

  const isMobile = useIsMobile();
  const classes = useStyles({
    size: isMobile ? SMALL_AVATAR_SIZE : LARGE_AVATAR_SIZE,
  });

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
      <NextSeo
        title={user.displayName}
        description={`${user.displayName} - Profile Page of Post Gallery`}
      />
      <Box paddingY={2} clone>
        <FlexCol className={classes.header} alignItems="center">
          <Avatar
            className={classes.avatar}
            src={user.thumbnailUrl || ""}
            alt={user.displayName}
          />
          <BoldText variant="h6" component="h1" noWrap>
            {user.displayName}
          </BoldText>
        </FlexCol>
      </Box>
      <Paper>
        <Tabs
          value={tabs as string}
          indicatorColor="primary"
          textColor="primary"
          onChange={(e, value) => {
            const query = { tabs: value };
            const stringified = queryString.stringify(query);
            // https://github.com/zeit/next.js/issues/9574#issuecomment-560082865
            router.push(`${router.pathname}?${stringified}`, router.asPath);
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
