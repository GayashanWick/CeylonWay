import { EXCHANGE_RATE_USD_LKR } from '../config/constants';

export const accommodationOptions = [
  { id: 'shared', label: 'Shared / Standard', priceUSD: 0, priceLKR: 0 },
  { id: 'private', label: 'Private Room', priceUSD: 30, priceLKR: 30 * EXCHANGE_RATE_USD_LKR },
  { id: 'luxury', label: 'Luxury Tent', priceUSD: 60, priceLKR: 60 * EXCHANGE_RATE_USD_LKR }
];

export const calculateTotal = ({ basePriceLKR, groupSize, accommodationId, selectedAddOnsTotalLKR }) => {
  const accommodationUpgradeLKR = accommodationOptions.find(opt => opt.id === accommodationId)?.priceLKR || 0;
  
  const perPersonTotal = basePriceLKR + accommodationUpgradeLKR + selectedAddOnsTotalLKR;
  const subtotal = perPersonTotal * groupSize;
  
  return {
    perPersonTotal,
    subtotal
  };
};

export const formatCurrency = (amountLKR, currencyCode) => {
  if (currencyCode === 'USD') {
    const amountUSD = Math.round(amountLKR / EXCHANGE_RATE_USD_LKR);
    return `$${amountUSD.toLocaleString()}`;
  }
  return `LKR ${amountLKR.toLocaleString()}`;
};
