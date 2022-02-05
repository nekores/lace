import { BLOCKCHAIN_WORKSPACES, NETWORKS_CHAINS } from '../constants/variables';

// eslint-disable-next-line import/prefer-default-export
export function getNetworkByChainId(chainId) {
  if (chainId === NETWORKS_CHAINS.MATIC_CHAIN_ID || chainId === NETWORKS_CHAINS.MATIC_TEST_CHAIN_ID) {
    return BLOCKCHAIN_WORKSPACES.MATIC;
  }

  if (chainId === NETWORKS_CHAINS.ETHER_CHAIN_ID || chainId === NETWORKS_CHAINS.ETHER_TEST_CHAIN_ID) {
    return BLOCKCHAIN_WORKSPACES.ETHEREUM;
  }

  if (chainId === NETWORKS_CHAINS.BSC_CHAIN_ID || chainId === NETWORKS_CHAINS.BSC_TEST_CHAIN_ID) {
    return BLOCKCHAIN_WORKSPACES.BINANCE;
  }

  return BLOCKCHAIN_WORKSPACES.OTHER;
}
