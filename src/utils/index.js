import Web3 from 'web3';
import BigNumber from 'bignumber.js';

export const CurrentAddress = (str, start, end) => {
  if (!str) return '';
  return `${str.slice(0, start)}...${str.slice(str.length - end, str.length)} LACE`;
};

export const toBN = (value) => new BigNumber(value);

export const convertFrom = (value) => Web3.utils.fromWei(value);

export const convertTo = (value) => Web3.utils.toWei(value);

export const isDatePass = (date) => {
  const now = new Date();

  return new Date(date * 1000) < now;
};

export function valueToBigNumber(amount) {
  BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_DOWN });

  return new BigNumber(amount);
}

const bn10PowLookupMap = new Map([]);

export function pow10(decimals) {
  if (!bn10PowLookupMap.has(decimals)) {
    bn10PowLookupMap.set(decimals, new BigNumber(10).pow(decimals));
  }

  return bn10PowLookupMap.get(decimals);
}

export function normalizeBN(value, decimals = 18) {
  return valueToBigNumber(value).dividedBy(pow10(decimals));
}

export function normalizeValue(value, decimals = 18) {
  return normalizeBN(value, decimals).toString(10);
}

export function convertToDecimals(value, decimals = 18) {
  return valueToBigNumber(value || 0).multipliedBy(valueToBigNumber(10).pow(decimals)).dp(0).toString();
}
