import config from './config';

export const BLOCKCHAIN_WORKSPACES = {
  ETHEREUM: 'ethereum',
  MATIC: 'matic',
  BINANCE: 'bsc',
  OTHER: 'other',
};

export const BLOCKCHAIN_NETWORK_ICONS = {
  ETHEREUM: 'ethereum',
  POLYGON: 'polygon-icon',
  BINANCE: 'bsc',
};

export const ChainsConfig = {
  [BLOCKCHAIN_WORKSPACES.ETHEREUM]: {
    fullName: BLOCKCHAIN_WORKSPACES.ETHEREUM,
    name: BLOCKCHAIN_WORKSPACES.ETHEREUM,
    icon: BLOCKCHAIN_NETWORK_ICONS.ETHEREUM,
    type: BLOCKCHAIN_WORKSPACES.ETHEREUM,
  },
  [BLOCKCHAIN_WORKSPACES.MATIC]: {
    fullName: 'Polygon',
    name: 'Polygon',
    icon: BLOCKCHAIN_NETWORK_ICONS.POLYGON,
    type: BLOCKCHAIN_WORKSPACES.MATIC,
  },
  [BLOCKCHAIN_WORKSPACES.BINANCE]: {
    fullName: 'Binance smart chain',
    name: BLOCKCHAIN_WORKSPACES.BINANCE,
    icon: BLOCKCHAIN_NETWORK_ICONS.BINANCE,
    type: BLOCKCHAIN_WORKSPACES.BINANCE,
  },
};

export const NETWORKS_CHAINS = {
  MATIC_CHAIN_ID: 137,
  MATIC_TEST_CHAIN_ID: 80001,
  ETHER_CHAIN_ID: 1,
  ETHER_TEST_CHAIN_ID: 4,
  BSC_CHAIN_ID: 56,
  BSC_TEST_CHAIN_ID: 97,
};

export const NETWORKS_CHAINS_HEX = {
  MATIC_CHAIN_ID: '0x89',
  MATIC_TEST_CHAIN_ID: '0x13881',
  ETHER_CHAIN_ID: '0x89',
  ETHER_TEST_CHAIN_ID: '0x4',
  BSC_CHAIN_ID: '0x38',
  BSC_TEST_CHAIN_ID: '0x61',
};

// Address LACE Token:  0xAaF760Fa545c98Af3ff4ED7cc9AB5675B74fb755 //////
// Address LP Token:  0x3DB62180ACEdFcd3B130b558A9be1aA5C00F2C43 ///////
// Address LP Staking contract:  0x8E7eB99106b6E8c1F883c7872f5d060014A93330 ///////
// Address Lovelace Staking contract:  0x591458bB6950771682037277fBEa8916c7f9Ed4E
// Address Premium Staking contract:  0x94d9A1f3511dd2440ac4d78fF44fA8F0616DCb39
export const CotractAddressesTestnet = {
  laceToken: '0xAaF760Fa545c98Af3ff4ED7cc9AB5675B74fb755',
  guaranteedApyStaking: '0x94d9A1f3511dd2440ac4d78fF44fA8F0616DCb39',
  unlimitedStaking: '0x591458bB6950771682037277fBEa8916c7f9Ed4E',
  lpToken: '0x3db62180acedfcd3b130b558a9be1aa5c00f2c43',
  lpStaking: '0x8E7eB99106b6E8c1F883c7872f5d060014A93330',
};

export const CotractAddressesMainnet = {
  laceToken: '0xAaF760Fa545c98Af3ff4ED7cc9AB5675B74fb755',
  guaranteedApyStaking: '0x850f1D6fAbA720948420A8fbaA36a27451dA6273',
  unlimitedStaking: '0xb227DcCB2FC5A67514b37584f47418d1861Ee92C',
  lpToken: '0x3db62180acedfcd3b130b558a9be1aa5c00f2c43',
  lpStaking: '0x4b38096983cABA027D3F5074Bf9343f3e49eFB44',
};

export const AVERAGE_BLOCK_AMOUNT_PER_YEAR = 2365323;

export const ContractAddresses = config.isMainnet ? CotractAddressesMainnet : CotractAddressesTestnet;
