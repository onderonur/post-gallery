import React from "react";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import BaseDialog from "./BaseDialog";
import BaseDialogTitle from "./BaseDialog/components/BaseDialogTitle";
import BaseDialogContent from "./BaseDialog/components/BaseDialogContent";
import BaseIconButton from "./BaseIconButton";
import { Formik, Form } from "formik";
import BaseTextField from "./BaseTextField";
import { DialogActions } from "@material-ui/core";
import BaseFormActions from "./BaseFormActions";
import * as Yup from "yup";
import ImageUploader from "./ImageUploader";
import gql from "graphql-tag";
import { useCreatePostMutation, CreatePostInput } from "@/generated/graphql";
import { trimString } from "@/utils";
import useDialogState from "@/components/BaseDialog/hooks/useDialogState";
import useRequireAuth from "@/hooks/useRequireAuth";
import { useRouter } from "next/router";

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $media: Upload!) {
    createPost(input: { title: $title, media: $media }) {
      id
    }
  }
`;

type CreatePostFormValues = {
  title: CreatePostInput["title"];
  media: CreatePostInput["media"] | null;
};

const validationSchema = Yup.object().shape<CreatePostFormValues>({
  title: Yup.string().label("Title").transform(trimString).required(),
  media: Yup.mixed().label("Media").required(),
});

const initialValues = { title: "", media: null };

const CreatePostDialog = () => {
  const router = useRouter();
  const requireAuth = useRequireAuth();
  const { isOpen, open, close } = useDialogState();
  const [createPost] = useCreatePostMutation({
    mutation: CREATE_POST,
    onCompleted: (data) => {
      const { createPost } = data;
      const id = createPost?.id;
      if (!id) {
        return;
      }
      close();
      router.push("/[postId]", `/${id}`);
    },
  });

  return requireAuth(
    <>
      <BaseIconButton color="primary" onClick={open}>
        <AddAPhotoOutlinedIcon />
      </BaseIconButton>
      <BaseDialog open={isOpen} maxWidth="sm" onClose={close}>
        <Formik<CreatePostFormValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={(values) => createPost({ variables: values })}
          onReset={close}
        >
          {() => {
            return (
              <Form noValidate autoComplete="off">
                <BaseDialogTitle>Upload</BaseDialogTitle>
                <BaseDialogContent>
                  <BaseTextField
                    label="Title"
                    name="title"
                    required
                    fullWidth
                    autoFocus
                  />
                  <ImageUploader name="media" />
                </BaseDialogContent>
                <DialogActions>
                  <BaseFormActions />
                </DialogActions>
              </Form>
            );
          }}
        </Formik>
      </BaseDialog>
    </>,
  );
};

export default CreatePostDialog;
