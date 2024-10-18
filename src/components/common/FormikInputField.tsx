import React from "react";
import map from "lodash/map";
import Input from "@/elements/inputs/Input";
import SelectInput from "@/elements/inputs/SelectInput";
import { ErrorMessageText, InputFieldContainer } from "@/components/common/style";

type Props = {
  label?: string;
  type?: string;
  name: string;
  handleChange: any;
  handleBlur: any;
  value: string;
  placeholder?: string;
  error?: string | any;
  touched?: boolean | any;
  as?: string;
  options?: Array<{ value: string; label: string }>;
  pattern?: string;
};

/**
 * `FormikInputField` component renders an input field or a select input based 
 * on the `as` prop. It integrates with Formik for handling form state and 
 * validation. The component also supports displaying error messages if 
 * validation errors are present.
 *
 * @param {Props} props - The props for the component.
 * @param {string} [props.label] - Optional label to display above the input field.
 * @param {string} [props.type] - The type of the input field (e.g., "text", "password").
 * @param {string} props.name - The name attribute for the input field or select input.
 * @param {function} props.handleChange - The function to call when the input value changes.
 * @param {function} props.handleBlur - The function to call when the input loses focus.
 * @param {string} props.value - The value to display in the input field or select input.
 * @param {string} [props.placeholder] - Optional placeholder text for the input field.
 * @param {string} [props.error] - Optional error message to display if validation fails.
 * @param {boolean} [props.touched] - Boolean indicating whether the input has been touched.
 * @param {string} [props.as] - Determines whether to render an input field or a select input. 
 *                              If "select", a select input is rendered.
 * @param {Array<{ value: string; label: string }>} [props.options] - Options for the select input if `as` is "select".
 * @param {string} [props.pattern] - Optional regex pattern for validating the input value.
 *
 * @returns JSX.Element - The rendered input field or select input with optional label and error message.
 */
const FormikInputField = (props: Props, ref: any) => {
  return (
    <InputFieldContainer>
      {props.label && <p>{props.label}</p>}

      {props.as === "select" && props.options ? (
        <SelectInput
          id={props.name}
          name={props.name}
          onChange={props.handleChange}
          value={props.value}
        >
          <option disabled value="">
            Select
          </option>
          {map(props.options, (item: any, index: number) => (
            <option value={item.value} key={index}>
              {item.label}
            </option>
          ))}
        </SelectInput>
      ) : (
        <Input
          ref={ref}
          id={props.name}
          placeholder={props.placeholder}
          type={props.type}
          name={props.name}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.value}
        />
      )}

      {props.error && props.touched && (
        <ErrorMessageText>{props.error}</ErrorMessageText>
      )}
    </InputFieldContainer>
  );
};

export default React.forwardRef(FormikInputField);
