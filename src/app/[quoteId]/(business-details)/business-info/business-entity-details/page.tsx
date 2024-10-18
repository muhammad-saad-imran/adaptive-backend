'use client';
import React from 'react';
import { useMask } from '@react-input/mask';
import { FormikHelpers, FormikValues } from 'formik';
import { BusinessStates } from '@/hooks/types';
import { useBusinessInfoForm } from '@/hooks/useBusinessInfoForm';
import { setBusinessDetails } from '@/store/feature/business-info';
import { IBusinessDetails } from '@/store/feature/business-info/types';
import { businessDetailsSchema } from '@/validations/quoteValidations';
import { businessDetailsConfig } from '@/config/businessDetailsConfig';
import BusinessInfoFormsContainer from '@/components/business-info/BusinessInfoFormsContainer';
import BottomNavBar from '@/components/common/BottomNavBar';
import FormikInputField from '@/components/common/FormikInputField';

/**
 * BusinessEntityPage component for business details.
 *
 * This component renders a form where business details needs to be entered.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered component.
 */
const BusinessEntityPage = () => {
  const {
    router,
    formik: { handleSubmit, isSubmitting },
    quoteQueryResult: { isFetching },
    getFieldAttrs,
    dispatch,
  } = useBusinessInfoForm({
    config: businessDetailsConfig.inputs,
    initialValueField: BusinessStates.detailsState,
    validationSchema: businessDetailsSchema,
    onSubmit: async (
      values: FormikValues,
      { setSubmitting }: FormikHelpers<FormikValues>
    ) => {
      dispatch(setBusinessDetails(values as IBusinessDetails));
      setSubmitting(false);
      router.push(`business-mailing-address`);
    },
  });

  const phoneMaskRef = useMask({
    mask: '+___________',
    replacement: { _: /\d/ },
  });

  return (
    <BusinessInfoFormsContainer
      title="Enter your business details"
      handleSubmit={handleSubmit}
    >
      <FormikInputField {...getFieldAttrs('businessType')} />
      <FormikInputField {...getFieldAttrs('businessName')} />
      <FormikInputField {...getFieldAttrs('firstName')} />
      <FormikInputField {...getFieldAttrs('lastName')} />
      <FormikInputField {...getFieldAttrs('email')} />
      <FormikInputField {...getFieldAttrs('alternativeEmail')} />
      <FormikInputField
        {...getFieldAttrs('phone', {
          ref: phoneMaskRef,
        })}
      />
      <BottomNavBar
        buttonLabel="Next: Business Mailing Address"
        disabled={isSubmitting || isFetching}
      />
    </BusinessInfoFormsContainer>
  );
};

export default BusinessEntityPage;
