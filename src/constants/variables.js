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

export const CotractAddressesTestnet = {
  laceToken: '0xAaF760Fa545c98Af3ff4ED7cc9AB5675B74fb755',
  guaranteedApyStaking: '0xD5C207688523120a2b027f5BA4d1633232ab2376',
  unlimitedStaking: '0x51092214f8ceE2287aAD8B960AD4bAAbafAEA0Fe',
  lpToken: '0x3db62180acedfcd3b130b558a9be1aa5c00f2c43',
  lpStaking: '0x9818f351B015E03EC00BC955142626B6fd9D88ca',
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
