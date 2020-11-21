import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { ID } from '@src/types';
import {
  Box,
  emphasize,
  FormControl,
  FormHelperText,
  FormControlProps,
  RootRef,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useField } from 'formik';
import PublishIcon from '@material-ui/icons/Publish';
import Loading from './Loading';
import { GraphMedia, Maybe } from '@src/generated/graphql';
import apiClient from '@src/utils/restClient';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import BaseIconButton from './BaseIconButton';
import { to } from '@shared/to';
import { FlexCol } from './Utils';
import Image from 'next/image';

const RemoveFileButton = styled(BaseIconButton)`
  ${({ theme }) => css`
    opacity: 0.5;
    position: absolute;
    top: ${theme.spacing(1)}px;
    right: ${theme.spacing(1)}px;
    background-color: ${theme.palette.text.primary};
    color: ${theme.palette.primary.contrastText};
    &:hover {
      background-color: ${emphasize(theme.palette.text.primary, 0.2)};
    }
  `}
`;

const UploadButton = styled(BaseIconButton)`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacing(2)}px;
    & svg {
      font-size: ${theme.typography.h1.fontSize};
    }
  `}
`;

interface ImageUploaderProps {
  name: string;
  required?: FormControlProps['required'];
}

const ImageUploader: React.FC<ImageUploaderProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, helpers] = useField<Maybe<ID>>(props);
  const { value } = field;

  const { touched, error } = meta;
  const { setValue } = helpers;

  const [lastUploadedImage, setLastUploadedImage] = useState<Maybe<GraphMedia>>(
    null,
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!value) {
      setLastUploadedImage(null);
    }
  }, [value]);

  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length) {
        const file = acceptedFiles[0];
        setLoading(true);
        const { error, data: media } = await to(
          apiClient.upload.uploadImage(file, {
            onUploadProgress: setUploadProgress,
          }),
        );
        setLoading(false);
        if (!error && media) {
          setLastUploadedImage(media);
          setValue(media.id);
        }
      }
    },
    [setValue],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
  });

  const { ref, css, ...rootProps } = getRootProps();

  const hasError = Boolean(touched && error);

  const handleRemoveFile = useCallback(() => {
    setValue(null);
  }, [setValue]);

  if (loading) {
    return <Loading percent={uploadProgress} />;
  }

  return (
    <FormControl fullWidth error={hasError}>
      <Box marginY={2}>
        {!lastUploadedImage && (
          <RootRef rootRef={ref}>
            <FlexCol alignItems="center" {...rootProps} paddingY={2}>
              <input {...getInputProps()} />
              <UploadButton>
                <PublishIcon />
              </UploadButton>
              <Typography color="textSecondary">
                {isDragActive
                  ? 'Drop the files here ...'
                  : "Drag 'n' drop some files here, or click to select files"}
              </Typography>
            </FlexCol>
          </RootRef>
        )}
        {hasError && <FormHelperText>{error}</FormHelperText>}
        {lastUploadedImage && (
          <Box marginY={1}>
            <Box position="relative">
              <Image
                src={lastUploadedImage.standardImage.url}
                alt="Uploaded image for post"
                objectFit="contain"
                height={lastUploadedImage.standardImage.height}
                width={lastUploadedImage.standardImage.width}
                layout="responsive"
              />
              <RemoveFileButton
                size="small"
                color="default"
                onClick={handleRemoveFile}
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
