import { ContractAddresses } from './variables';

// eslint-disable-next-line import/prefer-default-export
export const StakingPools = [
  {
    title: 'Guaranteed APY Staking',
    description: 'Stake LACE token for guaranteed APY',
    img: 'star',
    type: 'lace',
    tokenName: 'LACE',
    stakeText: 'Tokens will be locked until Jan 3, 2022.',
    limit: true,
    tokenAddress: ContractAddresses.laceToken,
    stakingAddress: ContractAddresses.guaranteedApyStaking,
  },
  {
    title: 'Unlimited Staking',
    description: 'Stake LACE for variable APY',
    img: 'vip',
    type: 'lace',
    tokenName: 'LACE',
    stakeText: 'Rewards are earned immediately. Tokens can be unstaked at any time but can be claimed 10% per day.',
    limit: false,
    tokenAddress: ContractAddresses.laceToken,
    stakingAddress: ContractAddresses.unlimitedStaking,
  },
  {
    title: 'LP Staking',
    description: 'Stake LP Tokens for LACE at High variable APY',
    img: 'lp-stacking',
    type: 'lp',
    tokenName: 'LACE-BNB',
    stakeText: 'Rewards are immediate. Tokens can be unstaked at any time but can be claimed 10% per day',
    limit: false,
    tokenAddress: ContractAddresses.lpToken,
    stakingAddress: ContractAddresses.lpStaking,
  },
];
