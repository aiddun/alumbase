import React, { ChangeEvent, useState } from "react";

export const TextInput = ({
  value,
  setValue,
  title,
  name,
  htmlFor,
  autoComplete,
  disabled = false,
  onChange,
  onBlur,
  defaultValue,
  error,
  required,
}: {
  value: string;
  setValue?: (text: string) => void;
  title: string;
  name?: string;
  htmlFor?: string;
  autoComplete?: string;
  disabled?: boolean;
  onChange?: (...event: any[]) => void;
  onBlur?: () => void;
  defaultValue?: string;
  error?: any;
  required?: boolean;
}) => {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700"
      >
        {title}
        {required && <sup className="text-red-900">*</sup>}
      </label>

      {/* class="form-input block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red sm:text-sm sm:leading-5"
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"> */}

      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="text"
          name={name}
          id={name}
          autoComplete={autoComplete}
          className={`form-input block w-full sm:text-sm rounded-md disabled:opacity-50 ${
            error
              ? "pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red sm:text-sm sm:leading-5"
              : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          }`}
          value={value}
          onChange={(e) => {
            onChange && onChange(e.target.value);
            setValue && setValue(e.target.value);
          }}
          disabled={disabled}
          onBlur={onBlur}
          placeholder={defaultValue}
          aria-invalid={error ? "true" : "false"}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
      {/* <p className="mt-2 text-sm text-red-600" id="email-error">
        Your password must be less than 4 characters.
      </p> */}
    </>
  );
};

export const TextAreaInput = ({
  value,
  setValue,
  title,
  name,
  htmlFor,
  autoComplete,
  disabled = false,
  onChange,
  onBlur,
  defaultValue,
  error,
  description = "",
  rows = 3,
}: {
  value: string;
  setValue?: (text: string) => void;
  title: string;
  name?: string;
  htmlFor?: string;
  autoComplete?: string;
  disabled?: boolean;
  onChange?: (...event: any[]) => void;
  onBlur?: () => void;
  defaultValue?: string;
  error?: any;
  description?: string;
  rows?: number;
}) => {
  return (
    <div>
      <label
        htmlFor="about"
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>
      <div className="mt-1">
        <textarea
          id={name}
          name={name}
          rows={3}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder={defaultValue}
          defaultValue={defaultValue}
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => {
            onChange && onChange(e.target.value);
            setValue && setValue(e.target.value);
          }}
          disabled={disabled}
          onBlur={onBlur}
        />
      </div>
      <p className="mt-2 text-sm text-gray-500">{description} </p>
    </div>
  );
};

export const SelectInput = ({
  options,
  value,
  setValue,
  title,
  name,
  htmlFor,
  autoComplete,
  disabled = false,
  onChange,
  onBlur,
  defaultValue,
  error,
  optionKey,
}: {
  options: string[];
  value: string;
  setValue?: (text?: string) => void;
  title: string;
  name?: string;
  htmlFor?: string;
  autoComplete?: string;
  disabled?: boolean;
  onChange?: (...event: any[]) => void;
  onBlur?: () => void;
  defaultValue?: string;
  error?: any;
  optionKey?: string;
}) => {
  // problem:
  // when I have a select state and select other, i want to be able to input a custom value
  // however, when i do this, i null the "other" selection
  // i need some sort of additional state to remember when I'm on other
  const [onOtherValue, setOnOtherValue] = useState(false);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 items-end">
        <div>
          <label
            htmlFor={htmlFor}
            className="block text-sm font-medium text-gray-700 "
          >
            {title}
          </label>
          <select
            id={name}
            name={name}
            autoComplete={autoComplete}
            className={`flex-grow mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm sm:text-sm ${
              error && !onOtherValue
                ? "border-red-300 focus:border-red-300 focus:shadow-outline-red"
                : "focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
            }`}
            disabled={disabled}
            // maintain select position if in "other mode" by keeping the matching "use other" key
            value={onOtherValue ? optionKey : value}
            onChange={(e) => {
              onChange && onChange(e.target.value);
              setValue && setValue(e.target.value);
              const isOther = optionKey != null && e.target.value === optionKey;
              setOnOtherValue(isOther);
              if (isOther) {
                onChange && onChange("");
                setValue && setValue("");
              }
            }}
            onBlur={onBlur}
          >
            {defaultValue == null && (
              <option disabled selected value="">
                Select
              </option>
            )}

            {options.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>

        {onOtherValue && (
          <div className="">
            <TextInput
              {...{
                value,
                onChange,
                title: "",
                error: onOtherValue ? error : undefined,
                defaultValue: "Location",
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};
