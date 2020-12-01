import React, { useCallback } from 'react';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import BaseDialog from '../../BaseDialog';
import BaseDialogTitle from '../../BaseDialog/components/BaseDialogTitle';
import BaseDialogContent from '../../BaseDialog/components/BaseDialogContent';
import BaseIconButton from '../../BaseIconButton';
import { Formik, Form } from 'formik';
import BaseTextField from '../../BaseTextField';
import { DialogActions } from '@material-ui/core';
import BaseFormActions from '../../BaseFormActions';
import * as Yup from 'yup';
import ImageUploader from '../../ImageUploader';
import { gql } from '@apollo/client';
import { useCreatePostMutation, PostInput } from '@src/generated/graphql';
import useOverlayState from '@src/hooks/useOverlayState';
import useRequireAuth from '@src/hooks/useRequireAuth';
import { useRouter } from 'next/router';
import urls from '@src/utils/urls';
import CategorySelect from './CategorySelect';
import Stack from '@src/components/Stack';
import { OnSubmitFn } from '@src/types';
import { goTry } from 'go-try';

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $categoryId: ID!, $mediaId: ID!) {
    createPost(
      input: { title: $title, categoryId: $categoryId, mediaId: $mediaId }
    ) {
      id
    }
  }
`;

const initialValues: PostInput = { title: '', categoryId: '', mediaId: '' };

const validationSchema = Yup.object().shape<PostInput>({
  title: Yup.string().label('Title').trim().required().min(5).max(200),
  categoryId: Yup.string().label('Category').required(),
  mediaId: Yup.string().label('Media').required(),
});

const CreatePostDialog = React.memo(function CreatePostDialog() {
  const router = useRouter();
  const requireAuth = useRequireAuth();
  const { isOpen, open, close } = useOverlayState();
  const [createPost] = useCreatePostMutation({
    mutation: CREATE_POST,
    onCompleted: (data) => {
      const { createPost } = data;
      const id = createPost?.id;
      if (!id) {
        return;
      }
      close();
      router.push(urls.post.href, urls.post.as(id));
    },
  });

  const handleSubmit = useCallback<OnSubmitFn<PostInput>>(
    async (values, formikHelpers) => {
      await goTry(() => createPost({ variables: values }));
      formikHelpers.setSubmitting(false);
    },
    [createPost],
  );

  return requireAuth(
    <>
      <BaseIconButton color="primary" onClick={open}>
        <AddAPhotoOutlinedIcon />
      </BaseIconButton>
      <BaseDialog open={isOpen} maxWidth="sm" onClose={close}>
        <Formik<PostInput>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          onReset={close}
        >
          {() => {
            return (
              <Form noValidate autoComplete="off">
                <BaseDialogTitle>Upload</BaseDialogTitle>
                <BaseDialogContent>
                  <Stack flexDirection="column" spacing={2}>
                    <BaseTextField
                      label="Title"
                      name="title"
                      required
                      autoFocus
                    />
                    <CategorySelect name="categoryId" required />
                    <ImageUploader name="mediaId" />
                  </Stack>
                </BaseDialogContent>
                <DialogActions>
                  <BaseFormActions marginY={0} />
                </DialogActions>
              </Form>
            );
          }}
        </Formik>
      </BaseDialog>
    </>,
  );
});

export default CreatePostDialog;
