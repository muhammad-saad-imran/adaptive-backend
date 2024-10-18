import React, { FormEvent } from 'react';
import { Container, Title } from './style';

type Props = {
  children: React.ReactNode;
  title: string;
  handleSubmit: (e?: FormEvent<HTMLFormElement>) => void;
};

/**
 * BusinessInfoFormsContainer component provides a container for displaying business information forms.
 *
 * This component wraps its children with a container element, displays a title,
 * and includes a note indicating required fields. It is used to organize and style
 * business information forms within a consistent layout.
 *
 * @component
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The content to be rendered within the container, typically form fields.
 * @param {string} props.title - The title to be displayed above the form content.
 *
 * @returns {JSX.Element} The rendered BusinessInfoFormsContainer component.
 */
const BusinessInfoFormsContainer = (props: Props) => {
  return (
    <Container>
      <Title>{props.title}</Title>
      <p>* Required </p>
      <form className="flex flex-col gap-5" onSubmit={props.handleSubmit}>
        {props.children}
      </form>
    </Container>
  );
};

export default BusinessInfoFormsContainer;
