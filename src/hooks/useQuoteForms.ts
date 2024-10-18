import { FormikHelpers, FormikValues, useFormik } from 'formik';
import { ObjectSchema } from 'yup';
import { useQuote } from '@/hooks/useQuote';

type Props = {
  enableReinitialize?: boolean;
  initialValues: FormikValues;
  validationSchema: ObjectSchema<FormikValues>;
  onSubmit: (
    values: FormikValues,
    { setSubmitting }: FormikHelpers<FormikValues>
  ) => void | Promise<any>;
  config?: any;
  skipQuery?: boolean;
  queryOptions?: any;
};

/**
 * A custom hook for managing form state and validation with Formik, integrated with quote data handling.
 * It utilizes Formik for form management and integrates with the `useQuote` hook for quote-related data.
 *
 * @param {Object} props - Configuration for the form handling.
 * @param {boolean} [props.enableReinitialize=false] - Determines whether to reinitialize the form with new initial values.
 * @param {FormikValues} props.initialValues - The initial values for the form fields.
 * @param {ObjectSchema<FormikValues>} props.validationSchema - The Yup schema used for form validation.
 * @param {Function} props.onSubmit - Callback function to handle form submission. Receives the form values and FormikHelpers.
 * @param {Object} [props.config={}] - Optional configuration for form fields.
 * @param {boolean} [props.skipQuery=false] - Determines whether to skip fetching quote data.
 * @param {Object} [props.queryOptions={}] - Additional options to pass to the `useGetQuoteQuery` hook.
 *
 * @returns {Object} - An object containing form management and quote-related data:
 *
 * - `formik`: `Formik` - The Formik instance used for managing form state and handling submission.
 * - `getFieldAttrs`: `(fieldName: keyof FormikValues, extraAttrs?: any) => Object` - Function to get attributes for form fields.
 * - `...quoteData`: data from `useQuote` hook.
 */
export const useQuoteForms = ({
  config,
  initialValues,
  validationSchema,
  onSubmit,
  enableReinitialize = false,
  skipQuery = false,
  queryOptions = {},
}: Props) => {
  const quoteData = useQuote({ skipQuery, queryOptions });

  const formik = useFormik({
    enableReinitialize,
    initialValues,
    validationSchema,
    onSubmit,
  });

  // Generic function to avoid code-rewriting in input elements
  const getFieldAttrs = (
    fieldName: keyof typeof initialValues,
    extraAttrs: any = {}
  ) => ({
    ...extraAttrs,
    ...(config?.[fieldName] || {}),
    value: formik.values[fieldName],
    error: formik.errors[fieldName],
    touched: formik.touched[fieldName],
    handleChange: formik.handleChange,
    handleBlur: formik.handleBlur,
  });

  return {
    formik,
    getFieldAttrs,
    ...quoteData,
  };
};
