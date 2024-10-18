import { useEffect } from 'react';
import { isEqual } from 'lodash';
import { FormikHelpers, FormikValues } from 'formik';
import { ObjectSchema } from 'yup';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { BusinessStates } from '@/hooks/types';
import { useQuoteForms } from '@/hooks/useQuoteForms';
import {
  initAddressState,
  initBusinessInfoState,
  selectBusinessBillingAddress,
  selectBusinessDetails,
  selectBusinessInformation,
  selectBusinessMailingAddress,
  selectBusinessRevenue,
  setBusinessBillingAddress,
  setBusinessInformation,
  setBusinessMailingAddress,
} from '@/store/feature/business-info';

type Props = {
  initialValueField: BusinessStates;
  validationSchema: ObjectSchema<FormikValues>;
  onSubmit: (
    values: FormikValues,
    { setSubmitting }: FormikHelpers<FormikValues>
  ) => void | Promise<any>;
  config?: any;
  queryOptions?: any;
};

/**
 * Custom hook for managing business information form with Formik and Redux.
 * Integrates with the `useQuoteForms` hook for form state management and quote data.
 * Handles initialization and updates of business-related state in Redux based on the form data.
 *
 * @param {Object} props - Configuration for the business information form.
 * @param {BusinessStates} props.initialValueField - Specifies which part of the business state to use as initial values.
 * @param {ObjectSchema<FormikValues>} props.validationSchema - Yup schema for form validation.
 * @param {Function} props.onSubmit - Callback function for form submission. Receives form values and FormikHelpers.
 * @param {Object} [props.config={}] - Optional configuration for form fields.
 * @param {Object} [props.queryOptions={}] - Options for fetching quote data.
 * 
 * @returns {Object} - An object containing form state, dispatch actions, and quote-related data:
 * 
 * - `dispatch`: `AppDispatch` - Redux dispatch function.
 * - `businessInfoState`: `BusinessInfoState` - State of the business information.
 * - `detailsState`: `BusinessDetailsState` - State of the business details.
 * - `mailingAddressState`: `AddressState` - State of the mailing address.
 * - `billingAddressState`: `AddressState` - State of the billing address.
 * - `revenueState`: `RevenueState` - State of the revenue.
 * - `...quoteFormsData`: data from `useQuoteForms` hook.
 */
export const useBusinessInfoForm = ({
  config,
  initialValueField,
  validationSchema,
  onSubmit,
  queryOptions = {},
}: Props) => {
  const dispatch = useAppDispatch();
  const businessStates: Record<BusinessStates, any> = {
    businessInfoState: useAppSelector(selectBusinessInformation),
    detailsState: useSelector(selectBusinessDetails),
    mailingAddressState: useAppSelector(selectBusinessMailingAddress),
    billingAddressState: useAppSelector(selectBusinessBillingAddress),
    revenueState: useAppSelector(selectBusinessRevenue),
  };

  const quoteFormsData = useQuoteForms({
    queryOptions,
    config,
    validationSchema,
    onSubmit,
    // Select a value from businessStates as initialValue, 
    // by passing BusinessStates enum as `initialValueField` parameter
    initialValues: businessStates[initialValueField],
    enableReinitialize: true,
  });

  const { businessInfoState, mailingAddressState, billingAddressState } =
    businessStates;

  const { quote, businessInformation, address } = quoteFormsData;

  useEffect(() => {
    // Set businessInformation from quote in redux, if it has initial state
    if (quote?.insured && isEqual(businessInfoState, initBusinessInfoState)) {
      dispatch(setBusinessInformation(businessInformation));
    }
    
    // Set as business address if no billing address exists
    if (quote && isEqual(billingAddressState, initAddressState)) {
      dispatch(setBusinessBillingAddress(address));
    // Set as business address if no mailing address exists
    } else if (quote && isEqual(mailingAddressState, initAddressState)) {
      dispatch(setBusinessMailingAddress(address));
    }
  }, [
    quote,
    businessInfoState,
    mailingAddressState,
    billingAddressState,
    address,
    businessInformation,
    dispatch,
  ]);

  return {
    dispatch,
    ...businessStates,
    ...quoteFormsData,
  };
};
