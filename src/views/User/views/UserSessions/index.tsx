import React, { useCallback, useMemo } from 'react';
import { gql } from '@apollo/client';
import {
  GetUserWithSessionsQueryVariables,
  useGetUserWithSessionsQuery,
  useDeleteViewerSessionsMutation,
} from '@src/generated/graphql';
import Loading from '@src/components/Loading';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import { dateTimeFormat } from '@src/utils/dataTimeFormat';
import { Bold, FlexRow } from '@src/components/Utils';
import { useRouter } from 'next/router';
import { ID } from '@src/types';
import UserLayout, { UserLayoutFragments } from '../../components/UserLayout';
import BaseButton from '@src/components/BaseButton';
import { useConfirmDialog } from '@src/contexts/ConfirmDialogContext';
import AlertInfo from '@src/components/AlertInfo';

const GET_USER_WITH_SESSIONS = gql`
  query GetUserWithSessions($id: ID!, $after: Cursor) {
    user(id: $id) {
      ...UserLayout_user
      sessions(first: 10, after: $after) @connection(key: "userSessions") {
        pageInfo {
          hasNextPage
          endCursor
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
`;

const DELETE_VIEWER_SESSIONS = gql`
  mutation DeleteViewerSessions {
    deleteViewerSessions
  }
`;

function UserSessionsView() {
  const router = useRouter();
  const { userId } = router.query;
  const queryVariables: GetUserWithSessionsQueryVariables = useMemo(
    () => ({ id: userId as ID }),
    [userId],
  );
  const { data, loading, fetchMore } = useGetUserWithSessionsQuery({
    query: GET_USER_WITH_SESSIONS,
    variables: queryVariables,
    fetchPolicy: 'cache-and-network',
    returnPartialData: true,
  });

  const user = data?.user;

  // Because of we use "returnPartialData", "sessions" can be undefined,
  // even if the typings not say it.
  // So we use optional chaining for "sessions" here.
  const endCursor = user?.sessions?.pageInfo.endCursor;
  const hasNextPage = user?.sessions?.pageInfo.hasNextPage;
  const edges = user?.sessions?.edges;

  const handleFetchMoreSessions = useCallback(() => {
    fetchMore({
      variables: {
        ...queryVariables,
        after: endCursor,
      },
    });
  }, [endCursor, fetchMore, queryVariables]);

  let content = <Loading />;

  if (!loading && !edges?.length && !hasNextPage) {
    content = <AlertInfo message="There are no sessions to display." />;
  }

  const [
    deleteViewerSesssions,
    { loading: isDeletingViewerSessions },
  ] = useDeleteViewerSessionsMutation({
    mutation: DELETE_VIEWER_SESSIONS,
    refetchQueries: [
      { query: GET_USER_WITH_SESSIONS, variables: queryVariables },
    ],
  });

  const confirm = useConfirmDialog();

  const handleLogoutFromAllDevices = useCallback(() => {
    confirm({
      title: 'Log Out From All Devices?',
      description:
        'Are you sure to log out from all the other devices that you are logged in?',
      confirmText: 'Log Out',
      onConfirm: deleteViewerSesssions,
    });
  }, [confirm, deleteViewerSesssions]);

  if (edges?.length) {
    content = (
      <>
        <FlexRow justifyContent="flex-end">
          <BaseButton
            variant="text"
            color="secondary"
            loading={isDeletingViewerSessions}
            onClick={handleLogoutFromAllDevices}
          >
            Log Out From All Devices
          </BaseButton>
        </FlexRow>
        <List>
          {edges?.map((session) => {
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
                          {' • '}
                          <Typography component="span" color="textSecondary">
                            <Bold>Current Session</Bold>
                          </Typography>
                        </span>
                      ) : null}
                    </>
                  }
                />
              </ListItem>
            );
          })}
          {hasNextPage &&
            (loading ? (
              <Loading />
            ) : (
              <ListItem button onClick={handleFetchMoreSessions}>
                <ListItemText
                  primary="Load More..."
                  primaryTypographyProps={{ color: 'primary' }}
                />
              </ListItem>
            ))}
        </List>
      </>
    );
  }

  return <UserLayout user={user}>{content}</UserLayout>;
}

export default UserSessionsView;
