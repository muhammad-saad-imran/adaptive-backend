'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormikHelpers, FormikValues } from 'formik';
import { find, isEqual } from 'lodash';
import { useQuote } from '@/hooks/useQuote';
import { useQuoteForms } from '@/hooks/useQuoteForms';
import { ICoverage, IQuoteEstimate, Step } from '@/store/api/types';
import { policySelectionSchema } from '@/validations/quoteValidations';
import { formatDate } from '@/utils/datetimeUtil';
import BottomNavBar from '@/components/common/BottomNavBar';
import InstructionModal from '@/components/policy-coverage/InstructionModal';
import PolicyCoverageUI from '@/components/policy-coverage/PolicyCoverageUI';

/**
 * PolicySelectionPage component for selecting coverage policy.
 *
 * This component renders a page where users can select Coverage amount, duration and effective date.
 * Also includes a quotes card, which includes details about the selected coverage policy.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered component.
 */
const PolicySelectionPage = () => {
  const [isModelHidden, setIsModelHidden] = useState(true);

  const {
    quote,
    address,
    coverage,
    quoteQueryResult,
    handleSubmitQuote,
    router,
  } = useQuote();

  const initialCoverage: ICoverage = useMemo(() => {
    return {
      ...coverage,
      applyTransaction: true,
      // covert date to format required by input date component
      effectiveDate: formatDate(
        coverage.effectiveDate,
        'YYYY-MM-DD',
        'MM/DD/YY'
      ),
    };
  }, [coverage]);

  const { formik, getFieldAttrs } = useQuoteForms({
    skipQuery: true,
    enableReinitialize: true,
    initialValues: initialCoverage,
    validationSchema: policySelectionSchema,
    onSubmit: async (
      values: FormikValues,
      { setSubmitting }: FormikHelpers<FormikValues>
    ) => {
      await handleSubmitQuote(Step.coverage, {
        ...values,
        // convert date to format required by api
        effectiveDate: formatDate(values.effectiveDate),
      });
      router.push(`business-info/business-entity-details`);
      setSubmitting(false);
    },
  });

  const selectedEstimate = useMemo(
    () =>
      find(quote?.data?.quoteEstimates, {
        productId: formik.values.estimateId,
      }),
    [quote?.data?.quoteEstimates, formik.values.estimateId]
  );

  const updatePolicy = useCallback(
    async (values: FormikValues) => {
      await handleSubmitQuote(Step.coverage, {
        ...values,
        applyTransaction: true,
        // convert date to format required by api
        effectiveDate: formatDate(values.effectiveDate),
      });
    },
    [handleSubmitQuote]
  );

  useEffect(() => {
    // Initialize coverage when no quoteEstimates exist in quote
    // check effectiveDate is non-empty otherwise API fails
    // wait for updated quote
    if (
      quote?.data &&
      !quoteQueryResult.isFetching &&
      !quote?.data?.quoteEstimates &&
      coverage.effectiveDate !== ''
    ) {
      updatePolicy(coverage);
    }
  }, [quoteQueryResult.isFetching, quote?.data, coverage, updatePolicy]);

  useEffect(() => {
    // update quoteEstimates if formik correctly initialized & different coverage amount selected
    if (
      isEqual(formik.initialValues, initialCoverage) &&
      !isEqual(formik.values.coverageAmount, initialCoverage.coverageAmount)
    ) {
      updatePolicy(formik.values);
    }
  }, [formik.initialValues, formik.values, initialCoverage, updatePolicy]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <PolicyCoverageUI
        address={address}
        values={formik.values}
        setFieldValue={formik.setFieldValue}
        getFieldAttrs={getFieldAttrs}
        onShowModal={() => setIsModelHidden(false)}
        quoteEstimates={quote?.data.quoteEstimates as IQuoteEstimate[]}
        selectedEstimate={selectedEstimate as IQuoteEstimate}
      />
      <BottomNavBar
        selectedId={formik.values.estimateId}
        buttonLabel="Next: Business Information"
        disabled={quoteQueryResult.isFetching || formik.isSubmitting}
      />
      <InstructionModal
        hide={isModelHidden}
        onCloseModal={() => setIsModelHidden(true)}
      />
    </form>
  );
};

export default PolicySelectionPage;
