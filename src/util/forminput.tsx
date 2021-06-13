import React from "react";
import { Control, Controller } from "react-hook-form";
import { SelectInput, TextAreaInput, TextInput } from "./input";

// TODO: Fix to "unmanaged input"
export const FormTextInput = (props: {
  title: string;
  control: any;
  name?: string;
  htmlFor?: string;
  autoComplete?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  rules?: any;
  error?: any;
}) => {
  const { name, title, control, defaultValue, required = false, rules } = props;
  return (
    <Controller
      name={name || title}
      control={control}
      defaultValue={defaultValue}
      rules={{ required, ...rules }}
      render={({ field: { onChange, onBlur, value, name } }) => (
        <TextInput {...props} {...{ onChange, onBlur, value, name }} />
      )}
    />
  );
};

export const FormTextAreaInput = (props: {
  title: string;
  control: any;
  name?: string;
  htmlFor?: string;
  autoComplete?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  rules?: any;
  error?: any;
  description?: string;
  rows?: number;
}) => {
  const { name, title, control, defaultValue, required = false, rules } = props;
  return (
    <Controller
      name={name || title}
      control={control}
      defaultValue={defaultValue}
      rules={{ required, ...rules }}
      render={({ field: { onChange, onBlur, value, name } }) => (
        <TextAreaInput {...props} {...{ onChange, onBlur, value, name }} />
      )}
    />
  );
};

export const FormSelectInput = (props: {
  options: string[];
  title: string;
  control: any;
  name?: string;
  htmlFor?: string;
  autoComplete?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  rules?: any;
  error?: any;
  // if you want to open up a separate input for custom stuff
  optionKey?: string;
}) => {
  const { name, title, control, defaultValue, options, required, rules } =
    props;
  return (
    <Controller
      name={name || title}
      control={control}
      defaultValue={defaultValue}
      rules={{ required, ...rules }}
      render={({ field: { onChange, onBlur, value, name } }) => (
        <SelectInput {...props} {...{ onChange, onBlur, value, name }} />
      )}
    />
  );
};
