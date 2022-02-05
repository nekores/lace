import { BLOCKCHAIN_WORKSPACES, NETWORKS_CHAINS_HEX } from './variables';

// MATIC, POLYGON network params
export const ADD_MATIC_MAINNET_PARAMS = {
  chainId: NETWORKS_CHAINS_HEX.MATIC_CHAIN_ID,
  chainName: 'Polygon Mainnet',
  rpcUrls: ['https://polygon-rpc.com'],
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  blockExplorerUrls: ['https://polygonscan.com'],
};

export const ADD_MATIC_TESTNET_PARAMS = {
  ...ADD_MATIC_MAINNET_PARAMS,
  chainId: NETWORKS_CHAINS_HEX.MATIC_TEST_CHAIN_ID,
  chainName: 'Mumbai Testnet',
  rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
  blockExplorerUrls: ['https://mumbai.polygonscan.com'],
};
// End MATIC, POLYGON network params

// Ethereum network params
export const ADD_ETHEREUM_MAINNET_PARAMS = {
  chainId: NETWORKS_CHAINS_HEX.ETHER_CHAIN_ID,
  chainName: 'Ethereum Mainnet',
  rpcUrls: ['https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrls: ['https://etherscan.io'],
};

export const ADD_ETHEREUM_TESTNET_PARAMS = {
  ...ADD_ETHEREUM_MAINNET_PARAMS,
  chainId: NETWORKS_CHAINS_HEX.ETHER_TEST_CHAIN_ID,
  chainName: 'Rinkeby',
  rpcUrls: ['https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
  blockExplorerUrls: ['https://rinkeby.etherscan.io'],
};
// End Ethereum network params

// BINANCE SMART CHAIN network params
export const ADD_BSC_MAINNET_PARAMS = {
  chainId: NETWORKS_CHAINS_HEX.BSC_CHAIN_ID,
  chainName: 'Binance Smart Chain Mainnet',
  rpcUrls: ['https://bsc-dataseed.binance.org/'],
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  blockExplorerUrls: ['www.bscscan.com'],
};

export const ADD_BSC_TESTNET_PARAMS = {
  ...ADD_BSC_MAINNET_PARAMS,
  chainId: NETWORKS_CHAINS_HEX.BSC_TEST_CHAIN_ID,
  chainName: 'Binance Smart Chain Testnet',
  rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
  blockExplorerUrls: ['https://testnet.bscscan.com'],
};
// End BINANCE SMART CHAIN network params

export const BC_NETWORK_PARAMS = {
  [BLOCKCHAIN_WORKSPACES.MATIC]: ADD_MATIC_MAINNET_PARAMS,
  [BLOCKCHAIN_WORKSPACES.ETHEREUM]: ADD_ETHEREUM_MAINNET_PARAMS,
  [BLOCKCHAIN_WORKSPACES.BINANCE]: ADD_BSC_MAINNET_PARAMS,
};

export const BC_TESTNET_NETWORK_PARAMS = {
  [BLOCKCHAIN_WORKSPACES.MATIC]: ADD_MATIC_TESTNET_PARAMS,
  [BLOCKCHAIN_WORKSPACES.ETHEREUM]: ADD_ETHEREUM_TESTNET_PARAMS,
  [BLOCKCHAIN_WORKSPACES.BINANCE]: ADD_BSC_TESTNET_PARAMS,
};
