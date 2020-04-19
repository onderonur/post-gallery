import React from "react";
import { TextField, TextFieldProps } from "@material-ui/core";
import { useField, FieldHookConfig } from "formik";

type BaseTextFieldProps = TextFieldProps &
  FieldHookConfig<TextFieldProps["value"]>;

const BaseTextField: React.FC<BaseTextFieldProps> = (props) => {
  const [field, meta] = useField(props);
  const { error, touched } = meta;

  const showError = Boolean(error && touched);
  const helperText = showError ? error : undefined;

  return (
    <TextField
      {...field}
      {...props}
      error={Boolean(error && touched)}
      helperText={helperText}
    />
  );
};

export default BaseTextField;
