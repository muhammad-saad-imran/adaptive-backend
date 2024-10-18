import { InputFieldContainer } from "@/components/common/style";
import Input from "@/elements/inputs/Input";
import React from "react";

type Props = {
  label?: string;
  type?: string;
  value: string | number;
};

/**
 * `DisabledInputField` component renders an input field that is disabled and 
 * optionally displays a label above it. The input field's type, value, and 
 * disabled state are controlled via props.
 *
 * @param {Props} props - The props for the component.
 * @param {string} [props.label] - Optional label to display above the input field.
 * @param {string} props.type - The type of the input field (e.g., "text", "email").
 * @param {string} props.value - The value to display in the input field.
 *
 * @returns JSX.Element - The rendered disabled input field with an optional label.
 */
const DisabledInputField = (props: Props) => {
  return (
    <InputFieldContainer>
      {props.label && <p>{props.label}</p>}
      <Input className="bg-white" type={props.type} value={props.value} disabled />
    </InputFieldContainer>
  );
};

export default DisabledInputField;
