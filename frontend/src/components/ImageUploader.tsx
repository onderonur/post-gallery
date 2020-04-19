import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import BaseImage from "./BaseImage";
import { ID } from "@/types";
import {
  Box,
  IconButton,
  emphasize,
  FormControl,
  FormHelperText,
  FormControlProps,
  RootRef,
  Typography,
  makeStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useField } from "formik";
import PublishIcon from "@material-ui/icons/Publish";
import { FlexCol } from "./FlexCol";
import { nanoid } from "nanoid";

const useStyles = makeStyles((theme) => ({
  removeFileButton: {
    opacity: 0.7,
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: emphasize(theme.palette.text.primary, 0.2),
    },
  },
  uploadButton: {
    marginBottom: theme.spacing(2),
    "& svg": {
      fontSize: theme.typography.h1.fontSize,
    },
  },
}));

type DropzoneFile = File & {
  id: ID;
  preview: string;
};

interface ImageUploaderProps {
  name: string;
  required?: FormControlProps["required"];
}

const ImageUploader: React.FC<ImageUploaderProps> = (props) => {
  const classes = useStyles();
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
            id: nanoid(),
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
              <IconButton className={classes.uploadButton}>
                <PublishIcon />
              </IconButton>
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
              <IconButton
                className={classes.removeFileButton}
                size="small"
                color="default"
                onClick={() => {
                  setValue(null);
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>
    </FormControl>
  );
};

export default ImageUploader;
