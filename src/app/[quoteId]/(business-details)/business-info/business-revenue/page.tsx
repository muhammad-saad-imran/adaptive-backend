'use client';
import React from 'react';
import { FormikHelpers, FormikValues } from 'formik';
import { isEqual } from 'lodash';
import { useBusinessInfoForm } from '@/hooks/useBusinessInfoForm';
import { BusinessStates } from '@/hooks/types';
import { Step } from '@/store/api/types';
import { IBusinessRevenue } from '@/store/feature/business-info/types';
import { setBusinessRevenue } from '@/store/feature/business-info';
import { businessRevenueConfig } from '@/config/businessRevenueConfig';
import { businessRevenueSchema } from '@/validations/quoteValidations';
import BusinessInfoFormsContainer from '@/components/business-info/BusinessInfoFormsContainer';
import FormikInputField from '@/components/common/FormikInputField';
import BottomNavBar from '@/components/common/BottomNavBar';

/**
 * BusinessRevenuePage component for business revenue.
 *
 * This component renders a form for business revenue & submits the entered businessInformation from redux storage
 * redux used to share `businessInformation` data between business-info form pages
 *
 * @component
 *
 * @returns {JSX.Element} The rendered component.
 */
const BusinessRevenuePage = () => {
  const {
    router,
    formik: { handleSubmit, isSubmitting },
    quoteId,
    businessInfoState,
    businessInformation,
    quoteQueryResult,
    createQuoteResult,
    handleSubmitQuote,
    getFieldAttrs,
    dispatch,
  } = useBusinessInfoForm({
    config: businessRevenueConfig.inputs,
    initialValueField: BusinessStates.revenueState,
    validationSchema: businessRevenueSchema,
    onSubmit: async (
      values: FormikValues,
      { setSubmitting }: FormikHelpers<FormikValues>
    ) => {
      dispatch(setBusinessRevenue(values as IBusinessRevenue));
      const payload = { ...businessInfoState, ...values };
      // make a create quote request only when businessInformation from quote has been changed
      if (!isEqual(businessInformation, payload))
        await handleSubmitQuote(Step.businessInformation, payload);
      router.push(`/${quoteId}/review-quote`);
      setSubmitting(false);
    },
  });

  return (
    <BusinessInfoFormsContainer
      title="Business Revenue Range"
      handleSubmit={handleSubmit}
    >
      <FormikInputField {...getFieldAttrs('revenueRangeFrom')} />
      <FormikInputField {...getFieldAttrs('revenueRangeTo')} />
      <BottomNavBar
        buttonLabel="Next: Review and Pay"
        disabled={
          createQuoteResult.isLoading ||
          quoteQueryResult.isLoading ||
          isSubmitting
        }
      />
    </BusinessInfoFormsContainer>
  );
};

export default BusinessRevenuePage;
