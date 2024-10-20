import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import {
  IBusinessDetails,
  IBusinessRevenue,
} from '@/store/feature/business-info/types';
import { IAddress, IBusinessInformation } from '@/store/api/types';

export const initAddressState = {
  street: '',
  street2: '',
  state: '',
  city: '',
  zipCode: '',
};

export const initBusinessInfoState = {
  businessType: '',
  businessName: '',
  lastName: '',
  firstName: '',
  email: '',
  alternativeEmail: '',
  phone: '+12133734253',
  revenueRangeFrom: 0,
  revenueRangeTo: 0,
  mailingAddress: initAddressState,
  billingAddress: initAddressState,
} satisfies IBusinessInformation as IBusinessInformation;

const businessInfoSlice = createSlice({
  name: 'business-info',
  initialState: initBusinessInfoState,
  reducers: {
    setBusinessInformation(state, action: PayloadAction<IBusinessInformation>) {
      return { ...state, ...action.payload };
    },
    setBusinessDetails(state, action: PayloadAction<IBusinessDetails>) {
      state.businessType = action.payload.businessType;
      state.businessName = action.payload.businessName;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.alternativeEmail = action.payload.alternativeEmail;
      state.phone = action.payload.phone;
    },
    setBusinessMailingAddress(state, action: PayloadAction<IAddress>) {
      state.mailingAddress = action.payload;
    },
    setBusinessBillingAddress(state, action: PayloadAction<IAddress>) {
      state.billingAddress = action.payload;
    },
    setBusinessRevenue(state, action: PayloadAction<IBusinessRevenue>) {
      state.revenueRangeFrom = action.payload.revenueRangeFrom;
      state.revenueRangeTo = action.payload.revenueRangeTo;
    },
  },
});

export const {
  setBusinessDetails,
  setBusinessMailingAddress,
  setBusinessBillingAddress,
  setBusinessRevenue,
  setBusinessInformation,
} = businessInfoSlice.actions;

export default businessInfoSlice;

export const selectBusinessInformation = (state: RootState) =>
  state.businessInfo;

export const selectBusinessDetails = (state: RootState) => ({
  businessType: state.businessInfo.businessType,
  businessName: state.businessInfo.businessName,
  firstName: state.businessInfo.firstName,
  lastName: state.businessInfo.lastName,
  email: state.businessInfo.email,
  alternativeEmail: state.businessInfo.alternativeEmail,
  phone: state.businessInfo.phone,
});

export const selectBusinessMailingAddress = (state: RootState) =>
  state.businessInfo.mailingAddress;

export const selectBusinessBillingAddress = (state: RootState) =>
  state.businessInfo.billingAddress;

export const selectBusinessRevenue = (state: RootState) => ({
  revenueRangeFrom: state.businessInfo.revenueRangeFrom,
  revenueRangeTo: state.businessInfo.revenueRangeTo,
});
