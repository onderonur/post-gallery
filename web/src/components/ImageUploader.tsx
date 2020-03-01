import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import BaseImage from "./BaseImage";
import { ID } from "types";
import {
  Box,
  IconButton,
  emphasize,
  FormControl,
  FormHelperText,
  FormControlProps,
  RootRef,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import { useField } from "formik";
import PublishIcon from "@material-ui/icons/Publish";
import { FlexCol } from "./FlexCol";

const RemoveFileButton = styled(IconButton)`
  opacity: 0.7;
  position: absolute;
  top: ${({ theme }) => theme.spacing(1)}px;
  right: ${({ theme }) => theme.spacing(1)}px;
  /* TODO: Will fix coloring of the icon button */
  background-color: ${({ theme }) => theme.palette.text.primary};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  &:hover {
    background-color: ${({ theme }) =>
      emphasize(theme.palette.text.primary, 0.2)};
  }
`;

const StyledIconButton = styled(IconButton)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  svg {
    font-size: ${({ theme }) => theme.typography.h1.fontSize};
  }
`;

type DropzoneFile = File & {
  id: ID;
  preview: string;
};

interface ImageUploaderProps {
  name: string;
  required?: FormControlProps["required"];
}

const ImageUploader: React.FC<ImageUploaderProps> = props => {
  const [field, meta, helpers] = useField<DropzoneFile | null>(props);
  const { value } = field;
  const { touched, error } = meta;
  const { setValue } = helpers;
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length) {
        const file = acceptedFiles[0];
        // To create file previews;
        // https://github.com/react-dropzone/react-dropzone/tree/master/examples/previews
        setValue(
          Object.assign(file, {
            // TODO: May use nanoid
            id: Date.now().toString(),
            preview: URL.createObjectURL(file),
          }),
        );
      }
    },
    [setValue],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const { ref, ...rootProps } = getRootProps();

  const hasError = Boolean(touched && error);

  return (
    <FormControl fullWidth error={hasError}>
      <Box marginY={2}>
        {!value && (
          <RootRef rootRef={ref}>
            <FlexCol alignItems="center" {...rootProps} paddingY={2}>
              <input {...getInputProps()} />
              <StyledIconButton>
                <PublishIcon />
              </StyledIconButton>
              <Typography color="textSecondary">
                {isDragActive
                  ? "Drop the files here ..."
                  : "Drag 'n' drop some files here, or click to select files"}
              </Typography>
            </FlexCol>
          </RootRef>
        )}
        {hasError && <FormHelperText>{error}</FormHelperText>}
        {value && (
          <Box marginY={1}>
            <Box position="relative">
              <BaseImage
                src={value.preview}
                alt={value.name}
                lazyLoad={false}
                objectFit="contain"
              />
              <RemoveFileButton
                size="small"
                color="default"
                onClick={() => {
                  setValue(null);
                }}
              >
                <CloseIcon />
              </RemoveFileButton>
            </Box>
          </Box>
        )}
      </Box>
    </FormControl>
  );
};

export default ImageUploader;
