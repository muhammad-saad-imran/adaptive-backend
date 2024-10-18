import React from 'react';
import { FormikValues } from 'formik';
import { IAddress, IQuoteEstimate } from '@/store/api/types';
import { policyCoverageConfig } from '@/config/policyCoverageConfig';
import { getDateUtc } from '@/utils/datetimeUtil';
import {
  PageWrapper,
  HorizontalLine,
  QuoteCardWrapper,
} from '@/components/policy-coverage/style';
import QuoteCard from './QuoteCard';
import HourCoverage from '@/components/policy-coverage/HourCoverage';
import CoverageLimit from '@/components/policy-coverage/CoverageLimit';
import FormikInputField from '@/components/common/FormikInputField';

type Props = {
  onShowModal: () => void;
  address: IAddress;
  values: FormikValues;
  setFieldValue: any;
  getFieldAttrs: (fieldName: string | number, extraAttrs?: any) => any;
  selectedEstimate: IQuoteEstimate;
  quoteEstimates: IQuoteEstimate[];
};

/**
 * `PolicyCoverageUI` component renders the user interface for managing policy coverage
 * details. It includes sections for selecting coverage quotes, coverage limits, and
 * effective dates, as well as displaying a quote card and handling user interactions.
 *
 * @param {Props} props - The props for the component.
 * @param {function} props.onShowModal - Callback function to handle showing a modal with more information.
 * @param {IAddress} props.address - The address of the user, used for location-specific coverage information.
 * @param {FormikValues} props.values - Formik values for managing form state.
 * @param {function} props.setFieldValue - Function to set the value of a specific form field.
 * @param {function} props.getFieldAttrs - Function to get attributes for a specific form field.
 * @param {IQuoteEstimate} props.selectedEstimate - The currently selected quote estimate, used for displaying coverage details.
 * @param {IQuoteEstimate[]} props.quoteEstimates - Array of available quote estimates for coverage options.
 *
 * @returns JSX.Element - The rendered policy coverage user interface, including quote cards, coverage options, and form fields.
 */
const PolicyCoverageUI = ({
  onShowModal,
  address,
  values,
  setFieldValue,
  getFieldAttrs,
  selectedEstimate,
  quoteEstimates,
}: Props) => {
  return (
    <div className="pb-24">
      <PageWrapper>
        <div className="mr-auto w-full md:pr-10 lg:px-32">
          <div className="md:hidden">
            <QuoteCard
              selectedEstimate={selectedEstimate}
              effectiveDateUtc={getDateUtc({
                date: values.effectiveDate,
                inputFormat: 'YYYY-MM-DD',
              })}
            />
            <HorizontalLine className="my-16" />
          </div>
          <HourCoverage
            address={address}
            coverageQuotes={quoteEstimates}
            selectedQuoteId={values.estimateId}
            onPolicyQuoteChange={(value: string) =>
              setFieldValue('estimateId', value)
            }
          />
          <CoverageLimit
            selectedDuration={selectedEstimate?.duration || 16}
            selectedLimit={values.coverageAmount}
            coverageLimitOpts={policyCoverageConfig.coverageLimitOpts}
            onPolicyLimitChange={(value: number) =>
              setFieldValue('coverageAmount', value)
            }
          />
          <FormikInputField
            {...getFieldAttrs('effectiveDate', {
              type: 'date',
              name: 'effectiveDate',
              label: 'Effective Date',
            })}
          />
          <p
            className="mt-6 cursor-pointer font-bold underline"
            onClick={onShowModal}
          >
            See what this means
          </p>
        </div>
        <QuoteCardWrapper>
          <div className="fixed right-10">
            <QuoteCard
              selectedEstimate={selectedEstimate}
              effectiveDateUtc={getDateUtc({
                date: values.effectiveDate,
                inputFormat: 'YYYY-MM-DD',
              })}
            />
          </div>
        </QuoteCardWrapper>
      </PageWrapper>
    </div>
  );
};

export default PolicyCoverageUI;
