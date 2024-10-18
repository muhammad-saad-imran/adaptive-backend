'use client';
import React from 'react';
import { FormikHelpers, FormikValues } from 'formik';
import { useMask } from '@react-input/mask';
import { BusinessStates } from '@/hooks/types';
import { useBusinessInfoForm } from '@/hooks/useBusinessInfoForm';
import { setBusinessBillingAddress } from '@/store/feature/business-info';
import { IAddress } from '@/store/api/types';
import { businessAddressConfig } from '@/config/businessAddressConfig';
import { businessAddressSchema } from '@/validations/quoteValidations';
import BusinessInfoFormsContainer from '@/components/business-info/BusinessInfoFormsContainer';
import FormikInputField from '@/components/common/FormikInputField';
import BottomNavBar from '@/components/common/BottomNavBar';

/**
 * BusinessBillingPage component for business billing address.
 *
 * This component renders a form for business billing address, uses billing address in quote `insured` field
 * if `insured` does not exist use previous business address entered
 *
 * @component
 *
 * @returns {JSX.Element} The rendered component.
 */
const BusinessBillingPage = () => {
  const {
    router,
    formik: { handleSubmit, isSubmitting },
    quoteQueryResult: { isLoading },
    dispatch,
    getFieldAttrs,
  } = useBusinessInfoForm({
    config: businessAddressConfig.inputs,
    initialValueField: BusinessStates.billingAddressState,
    validationSchema: businessAddressSchema,
    onSubmit: async (
      values: FormikValues,
      { setSubmitting }: FormikHelpers<FormikValues>
    ) => {
      dispatch(setBusinessBillingAddress(values as IAddress));
      setSubmitting(false);
      router.push(`business-revenue`);
    },
  });

  const zipMaskRef = useMask({ mask: '_____', replacement: { _: /\d/ } });

  return (
    <BusinessInfoFormsContainer
      title="Enter your business billing address"
      handleSubmit={handleSubmit}
    >
      <FormikInputField {...getFieldAttrs('street')} />
      <FormikInputField {...getFieldAttrs('street2')} />
      <FormikInputField {...getFieldAttrs('city')} />
      <FormikInputField {...getFieldAttrs('state')} />
      <FormikInputField
        {...getFieldAttrs('zipCode', {
          ref: zipMaskRef,
        })}
      />
      <BottomNavBar
        buttonLabel="Next: Business Revenue Range"
        disabled={isSubmitting || isLoading}
      />
    </BusinessInfoFormsContainer>
  );
};

export default BusinessBillingPage;
