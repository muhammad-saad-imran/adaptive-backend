'use client';
import React from 'react';
import { useMask } from '@react-input/mask';
import { FormikHelpers, FormikValues } from 'formik';
import { useBusinessInfoForm } from '@/hooks/useBusinessInfoForm';
import { BusinessStates } from '@/hooks/types';
import { IAddress } from '@/store/api/types';
import { setBusinessMailingAddress } from '@/store/feature/business-info';
import { businessAddressConfig } from '@/config/businessAddressConfig';
import { businessAddressSchema } from '@/validations/quoteValidations';
import BusinessInfoFormsContainer from '@/components/business-info/BusinessInfoFormsContainer';
import FormikInputField from '@/components/common/FormikInputField';
import BottomNavBar from '@/components/common/BottomNavBar';

/**
 * BusinessMailingPage component for business mailing address.
 *
 * This component renders a form for business mailing address, uses mailing address in quote `insured` field
 * if `insured` does not exist use previous business address entered
 *
 * @component
 *
 * @returns {JSX.Element} The rendered component.
 */
const BusinessMailingPage = () => {
  const {
    router,
    formik: { handleSubmit, isSubmitting },
    quoteQueryResult: { isLoading },
    getFieldAttrs,
    dispatch,
  } = useBusinessInfoForm({
    config: businessAddressConfig.inputs,
    initialValueField: BusinessStates.mailingAddressState,
    validationSchema: businessAddressSchema,
    onSubmit: async (
      values: FormikValues,
      { setSubmitting }: FormikHelpers<FormikValues>
    ) => {
      dispatch(setBusinessMailingAddress(values as IAddress));
      setSubmitting(false);
      router.push(`business-billing-address`);
    },
  });

  const zipMaskRef = useMask({ mask: '_____', replacement: { _: /\d/ } });

  return (
    <BusinessInfoFormsContainer
      title="Enter your business mailing address"
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

export default BusinessMailingPage;
