'use client';
import React from 'react';
import { find } from 'lodash';
import { useQuote } from '@/hooks/useQuote';
import { currencyFormat } from '@/utils/quoteUtils';
import {
  BackIconContainer,
  QuoteContainer,
  BottomNavbarContainer,
} from './style';
import Button from '@/elements/buttons/Button';
import LeftArrowIcon from '@/elements/icons/LeftArrowIcon';

type Props = {
  buttonLabel: string;
  selectedId?: any;
  onButtonClick?: () => void;
  disabled?: boolean;
};

/**
 * `BottomNavBar` component displays a bottom navigation bar with a back button,
 * a quote display section, and a customizable action button. It retrieves the
 * necessary data (`router` and `policy`) from the `useQuote` hook and uses props
 * to customize the button's label, click handler, and disabled state.
 *
 * @param {Props} props - The props for the component.
 * @param {number} [props.selectedId] - The ID of the selected product. Defaults to `policy.selectedEstimateId` if not provided.
 * @param {function} props.onButtonClick - The function to call when the action button is clicked.
 * @param {boolean} props.disabled - Whether the action button is disabled.
 * @param {string} props.buttonLabel - The label to display on the action button.
 *
 * @returns JSX.Element - The rendered bottom navigation bar.
 */
const BottomNavBar = (props: Props) => {
  const { router, coveragePolicy } = useQuote();
  let productId = props.selectedId ?? coveragePolicy.selectedEstimateId;
  const selectedEstimate = find(coveragePolicy.quoteEstimates, {
    productId: productId,
  });
  const premium = selectedEstimate?.premiumAmount ?? 0;
  return (
    <BottomNavbarContainer>
      <BackIconContainer onClick={() => router.back()}>
        <LeftArrowIcon />
        <p className="font-bold">Back</p>
      </BackIconContainer>

      <QuoteContainer>
        <p className="text-sm font-bold uppercase">Your quote</p>
        <p className="text-lg">{currencyFormat(premium)}/mo</p>
      </QuoteContainer>

      <Button
        type="submit"
        onClick={props.onButtonClick}
        disabled={props.disabled}
      >
        {props.buttonLabel}
      </Button>
    </BottomNavbarContainer>
  );
};

export default BottomNavBar;
