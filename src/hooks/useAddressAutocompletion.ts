import { useCallback, useEffect, useMemo, useState } from 'react';
import { notFound } from 'next/navigation';
import { debounce, get, map } from 'lodash';
import toast from 'react-hot-toast';
import { useAutocompleteQuery } from '@/store/api/baseApi';

export const useAddressAutocompletion = (address: string) => {
  const { currentData: autocompleteData, ...autocompleteQueryData } =
    useAutocompleteQuery(address, { skip: address === '' });

  const { isError, error } = autocompleteQueryData;

  const options = useMemo(
    () =>
      map(
        autocompleteData?.suggestions,
        (item: any) =>
          `${item.street_line}, ${item.secondary === '' ? '' : `${item.secondary}, `}${item.city}, ${item.state}, ${item.zipcode}`
      ),
    [autocompleteData]
  );

  useEffect(() => {
    if (isError) {
      if (get(error, 'status') === 404) notFound();
      else toast.error('Something went wrong');
    }
  }, [isError, error]);

  return {
    options,
    autocompleteData,
    ...autocompleteQueryData,
  };
};
