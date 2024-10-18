'use client';
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { notFound } from 'next/navigation';
import { debounce, get, map } from 'lodash';
import toast from 'react-hot-toast';
import { FormikHelpers, FormikValues } from 'formik';
import { useAppDispatch } from '@/store/hooks';
import { useAutocompleteQuery } from '@/store/api/baseApi';
import { IAddress, Step } from '@/store/api/types';
import { useQuoteForms } from '@/hooks/useQuoteForms';
import {
  initAddressState,
  initBusinessInfoState,
  setBusinessInformation,
} from '@/store/feature/business-info';
import { getQuoteConfig } from '@/config/getQuoteConfig';
import { getQuoteSchema } from '@/validations/quoteValidations';
import {
  AutocompleteContainer,
  AutocompleteItems,
  AutocompleteOptions,
  InputFormContainer,
  LogoContainer,
  PageWrapper,
  Wrapper,
} from '@/components/get-quote/style';
import { ErrorMessageText } from '@/components/common/style';
import Button from '@/elements/buttons/Button';
import FormikInputField from '@/components/common/FormikInputField';
import { useAddressAutocompletion } from '@/hooks/useAddressAutocompletion';

/**
 * Home component for the "Get a Quote" page.
 *
 * This component renders a form where users can enter their business address to create a quote.
 * First page in the flow for creating quote.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered component.
 */
export default function Home() {
  const dispatch = useAppDispatch();
  const [address, setAddress] = useState<IAddress>(initAddressState);
  const [debounceAddress, setDebounceAddress] = useState<string>('');

  const {
    router,
    formik,
    handleSubmitQuote,
    createQuoteResult,
    getFieldAttrs,
  } = useQuoteForms({
    skipQuery: true,
    initialValues: getQuoteConfig.initialValues,
    validationSchema: getQuoteSchema,
    onSubmit: async (
      values: FormikValues,
      { setSubmitting, setFieldError }: FormikHelpers<FormikValues>
    ) => {
      try {
        const res = await handleSubmitQuote(Step.address, address);
        // reset previous quote's businessInformation state in redux
        dispatch(setBusinessInformation(initBusinessInfoState));
        router.push(`${res.id}/policy-selection`);
      } catch (error: any) {
        if (error?.status === 400) {
          // set address formik error on failed api call
          setFieldError('address', 'Please provide a valid address');
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  // use debounced address to improve performance
  const handleDebouncedAddressChange = useCallback(
    debounce(setDebounceAddress, 1000),
    [setDebounceAddress]
  );

  const { autocompleteData, options, isFetching } =
    useAddressAutocompletion(debounceAddress);

  useEffect(() => {
    handleDebouncedAddressChange(formik.values.address);
  }, [handleDebouncedAddressChange, formik.values.address]);

  useEffect(() => {
    // select & set address when there is only 1 suggestion
    // otherwise reset address & disable submit
    if (autocompleteData?.suggestions.length === 1) {
      let addr = autocompleteData?.suggestions[0];
      setAddress({
        street: addr.street_line,
        street2: addr.secondary,
        zipCode: addr.zipcode,
        city: addr.city,
        state: addr.state,
      });
    } else {
      setAddress(initAddressState);
    }
  }, [autocompleteData]);

  return (
    <PageWrapper>
      <Wrapper>
        <LogoContainer>
          <p className="text-5xl md:text-5xl">Get a quote in seconds</p>
        </LogoContainer>

        <InputFormContainer onSubmit={formik.handleSubmit} autoComplete="off">
          <AutocompleteContainer>
            <FormikInputField
              {...getFieldAttrs('address', {
                name: 'address',
                placeholder: 'Enter Address',
              })}
            />
            {formik.errors.address && options.length === 0 && (
              <ErrorMessageText className="p-1">
                {formik.errors.address as string}
              </ErrorMessageText>
            )}
            {options.length > 0 &&
              options[0] !== formik.values.address &&
              formik.values.address !== '' && (
                <AutocompleteItems>
                  {map(options, (item: string, index: number) => (
                    <AutocompleteOptions
                      key={index}
                      onClick={() => formik.setFieldValue('address', item)}
                    >
                      {item}
                    </AutocompleteOptions>
                  ))}
                </AutocompleteItems>
              )}
          </AutocompleteContainer>
          <Button
            className="w-full text-sm md:w-2/5"
            type="submit"
            disabled={
              isFetching ||
              formik.isSubmitting ||
              createQuoteResult.isLoading ||
              address === initAddressState
            }
          >
            Get Your Quote
          </Button>
        </InputFormContainer>

        <p className="text-center md:w-2/4">
          If you have more than one location, reach out to us directly at
          123-456-7890.
        </p>
      </Wrapper>
    </PageWrapper>
  );
}
